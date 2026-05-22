/**
 * Per-category factory: turns a {@link CategoryDef} into a callable
 * `convert`-style function with attached metadata (`units`, `systems`,
 * `describe`).
 *
 * Used by every per-category subpath export to keep them self-contained — the
 * factory only depends on the core modules and the single CategoryDef passed
 * in.
 *
 * @module
 */

import { pickBest } from '../core/best.js';
import { assertBigInt, bigintConvert } from '../core/bigint.js';
import { UnknownUnitError } from '../core/errors.js';
import { affineConvert, assertFiniteNumber } from '../core/math.js';
import { normalizeUnit, suggest } from '../core/normalize.js';
import type { BestOptions, BestResult, CategoryDef, System, UnitDef } from '../core/types.js';

/**
 * Map every alias/normalized name → canonical key of a category.
 *
 * @internal
 */
function buildAliasIndex(def: CategoryDef): ReadonlyMap<string, string> {
  const map = new Map<string, string>();
  for (const [key, unit] of Object.entries(def.units)) {
    map.set(normalizeUnit(key), key);
    if (unit.aliases) {
      for (const alias of unit.aliases) {
        const lc = normalizeUnit(alias);
        if (!map.has(lc)) map.set(lc, key);
      }
    }
  }
  return map;
}

function resolveUnit(
  def: CategoryDef,
  index: ReadonlyMap<string, string>,
  name: string,
): {
  key: string;
  unit: UnitDef;
} {
  const lc = normalizeUnit(name);
  const key = index.get(lc);
  const unit = key ? def.units[key] : undefined;
  if (!key || !unit) {
    throw new UnknownUnitError(name, suggest(name, Object.keys(def.units)));
  }
  return { key, unit };
}

/**
 * Result of {@link makeCategory}: callable converter with attached metadata.
 *
 * `category(value, from)` produces a chainable {@link CategoryConverter}.
 * `category.bigint(value, from)` opts into BigInt arithmetic.
 */
export interface CategoryFunction<Name extends string> {
  (value: number, from: string): CategoryConverter<Name>;
  bigint(value: bigint, from: string): BigIntCategoryConverter;
  readonly units: readonly string[];
  readonly systems: readonly System[];
  readonly category: Name;
  describe(unit: string): Readonly<UnitDef & { key: string }>;
}

/** Chainable converter scoped to a single category. */
export interface CategoryConverter<Name extends string> {
  to(target: string): number;
  to(target: 'best', opts?: BestOptions): BestResult;
  possibilities(): readonly string[];
  readonly category: Name;
}

/** BigInt sibling of {@link CategoryConverter}. */
export interface BigIntCategoryConverter {
  to(target: string): bigint;
  readonly category: string;
}

/**
 * Create the curried per-category convert function used by both root-`convert`
 * and the per-category subpath exports.
 *
 * @internal
 */
export function makeCategory<Name extends string>(def: CategoryDef<Name>): CategoryFunction<Name> {
  const aliasIndex = buildAliasIndex(def);
  const unitKeys = Object.freeze(Object.keys(def.units));
  const systems = Object.freeze(
    Array.from(
      new Set<System>(
        Object.values(def.units)
          .map((u) => u.system)
          .filter((s): s is System => Boolean(s)),
      ),
    ),
  );

  function call(value: number, from: string): CategoryConverter<Name> {
    assertFiniteNumber(value);
    const { unit: fromUnit, key: fromKey } = resolveUnit(def, aliasIndex, from);

    return Object.freeze({
      category: def.name,
      possibilities: () => unitKeys,
      to(target: string | 'best', opts?: BestOptions): number | BestResult {
        if (target === 'best') return pickBest(value, fromUnit, def, opts);
        const { unit: toUnit, key: toKey } = resolveUnit(def, aliasIndex, target);
        // Self-conversion fast-path
        if (fromKey === toKey) return value;
        return affineConvert(value, fromUnit, toUnit);
      },
    }) as CategoryConverter<Name>;
  }

  call.bigint = (value: bigint, from: string): BigIntCategoryConverter => {
    assertBigInt(value);
    const { unit: fromUnit, key: fromKey } = resolveUnit(def, aliasIndex, from);
    return Object.freeze({
      category: def.name,
      to(target: string): bigint {
        const { unit: toUnit, key: toKey } = resolveUnit(def, aliasIndex, target);
        return bigintConvert(value, fromUnit, toUnit, fromKey, toKey);
      },
    });
  };

  call.units = unitKeys;
  call.systems = systems;
  call.category = def.name;
  call.describe = (unit: string): Readonly<UnitDef & { key: string }> => {
    const { key, unit: def_ } = resolveUnit(def, aliasIndex, unit);
    return Object.freeze({ key, ...def_ });
  };

  return call as CategoryFunction<Name>;
}
