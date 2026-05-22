/**
 * Core type definitions for unit-converter.
 *
 * Public helper types (Unit, Category, UnitsOf, CategoryOf, …) are re-exported
 * from {@link ./../index | the package root}. Internal interfaces (UnitDef,
 * CategoryDef) describe the static shape every category file conforms to.
 *
 * @module
 */

/**
 * Measurement system tag used for the `to('best')` filter and category metadata.
 */
export type System = 'metric' | 'imperial' | 'us';

/**
 * Pair of pure functions that map a magnitude to/from the category anchor unit.
 *
 * Use only when a unit is not affine (logarithmic dB, reciprocal L/100km,
 * frequency↔wavelength). Linear units MUST rely on `ratio` + `offset` instead —
 * the affine hot-path is faster and more numerically stable.
 */
export interface UnitTransform {
  /** Convert `value` (in this unit) to the category's anchor unit. */
  readonly toAnchor: (value: number) => number;
  /** Convert `value` (in the category's anchor unit) to this unit. */
  readonly fromAnchor: (value: number) => number;
}

/**
 * Static description of a single unit of measurement.
 *
 * - `ratio` and `offset` describe an affine map to the category anchor:
 *   `anchor = value * ratio + offset`.
 * - `transform`, when present, overrides the affine map (used for
 *   non-linear units like decibels or fuel consumption).
 * - `bigintRatio` enables {@link ./bigint | BigInt} conversions on integer-safe
 *   units. Units without it cannot participate in a `bigint` `to()` call.
 */
export interface UnitDef {
  readonly ratio: number;
  readonly offset?: number;
  readonly aliases?: readonly string[];
  readonly name: string;
  readonly plural?: string;
  readonly symbol?: string;
  readonly system?: System;
  readonly bigintRatio?: bigint;
  readonly transform?: UnitTransform;
}

/**
 * Static description of a measurement category (length, mass, …).
 *
 * - `anchor` MUST be a key of `units`.
 * - Every unit's `ratio`/`offset`/`transform` is defined relative to the anchor.
 */
export interface CategoryDef<Name extends string = string> {
  readonly name: Name;
  readonly anchor: string;
  readonly units: Readonly<Record<string, UnitDef>>;
  readonly aliasOf?: string;
}

// -----------------------------------------------------------------------------
// Public helper types
//
// Each category file augments {@link UnitRegistry} via declaration merging so
// `Unit`, `Category`, `UnitsOf<C>` and `CategoryOf<U>` resolve to precise
// literal unions.
// -----------------------------------------------------------------------------

/**
 * Module-augmentable registry mapping category names → unit literal unions.
 *
 * @example
 *   declare module 'unit-converter' {
 *     interface UnitRegistry {
 *       length: 'm' | 'km' | 'ft';
 *     }
 *   }
 */
// biome-ignore lint/suspicious/noEmptyInterface: augmented by category modules
export interface UnitRegistry {}

/** Union of all registered category names. */
export type Category = keyof UnitRegistry & string;

/** Unit literals known to belong to category `C`. */
export type UnitsOf<C extends Category> = UnitRegistry[C] & string;

/** Union of every registered unit literal across all categories. */
export type Unit = { [K in Category]: UnitsOf<K> }[Category];

/** Category that owns unit `U`. */
export type CategoryOf<U extends Unit> = {
  [K in Category]: U extends UnitsOf<K> ? K : never;
}[Category];

/**
 * Subset of {@link Unit} for which a BigInt-safe ratio is declared.
 *
 * Augmented by category modules whose unit definitions carry `bigintRatio`.
 */
// biome-ignore lint/suspicious/noEmptyInterface: augmented by category modules
export interface BigIntUnitRegistry {}

/** Union of every unit that supports BigInt conversions. */
export type BigIntUnit = {
  [K in keyof BigIntUnitRegistry]: BigIntUnitRegistry[K];
}[keyof BigIntUnitRegistry] &
  string;

// -----------------------------------------------------------------------------
// best()
// -----------------------------------------------------------------------------

/**
 * Filter options for {@link Converter.to | converter.to('best')}.
 */
export interface BestOptions {
  /** Restrict the candidate units to a single measurement system. */
  readonly system?: System;
  /** Custom predicate; if provided, only units that pass are considered. */
  readonly predicate?: (candidate: { unit: string; value: number }) => boolean;
}

/**
 * Result of `to('best')`: the most human-readable unit + its magnitude.
 */
export interface BestResult {
  readonly value: number;
  readonly unit: string;
  readonly category: string;
  /** Renders `"{value} {unit-symbol}"` with a 4-digit default precision. */
  toString(): string;
}

// -----------------------------------------------------------------------------
// Converter
// -----------------------------------------------------------------------------

/**
 * Intermediate object returned by {@link convert}. Frozen literal — zero overhead.
 */
export interface Converter<From extends Unit> {
  /** Convert into a sibling unit. */
  to<To extends UnitsOf<CategoryOf<From>>>(to: To): number;
  /** Pick the most human-readable sibling unit. */
  to(target: 'best', opts?: BestOptions): BestResult;
  /** All unit names that share the category with `from`. */
  possibilities(): readonly UnitsOf<CategoryOf<From>>[];
  /** Category name of the source unit. */
  readonly category: CategoryOf<From>;
}

/**
 * BigInt sibling of {@link Converter}: exact integer arithmetic, no rounding.
 */
export interface BigIntConverter<From extends BigIntUnit> {
  to<To extends BigIntUnit>(to: To): bigint;
  readonly category: string;
}
