/**
 * Error hierarchy thrown by unit-converter. Every error extends
 * {@link UnitConverterError} and carries a stable `.code` discriminator usable
 * in `switch` and `instanceof` checks alike.
 *
 * @module
 */

/**
 * Stable error codes. Treat as a frozen contract — adding a new code is a
 * non-breaking change, removing/renaming is breaking.
 */
export const ErrorCode = {
  UNKNOWN_UNIT: 'E_UNKNOWN_UNIT',
  INCOMPATIBLE_UNITS: 'E_INCOMPATIBLE_UNITS',
  INVALID_VALUE: 'E_INVALID_VALUE',
  BIGINT_PRECISION: 'E_BIGINT_PRECISION',
  BIGINT_UNSAFE: 'E_BIGINT_UNSAFE',
  AMBIGUOUS_UNIT: 'E_AMBIGUOUS_UNIT',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

/**
 * Common base of every error thrown by the library.
 *
 * Use `err instanceof UnitConverterError` to catch all library errors at once.
 */
export class UnitConverterError extends Error {
  readonly code: ErrorCode;

  constructor(code: ErrorCode, message: string) {
    super(message);
    this.name = 'UnitConverterError';
    this.code = code;
    // V8-only API; guarded for Deno/Bun/browsers.
    const cap = (
      Error as unknown as {
        captureStackTrace?: (target: object, ctor?: new (...args: never[]) => unknown) => void;
      }
    ).captureStackTrace;
    if (typeof cap === 'function') cap(this, new.target);
  }
}

/**
 * Thrown when a unit name (or alias) is not registered.
 *
 * `.suggestions` contains the top-3 closest known names by
 * Damerau-Levenshtein distance (may be empty).
 */
export class UnknownUnitError extends UnitConverterError {
  readonly unit: string;
  readonly suggestions: readonly string[];

  constructor(unit: string, suggestions: readonly string[] = []) {
    const hint = suggestions.length ? ` Did you mean: ${suggestions.join(', ')}?` : '';
    super(ErrorCode.UNKNOWN_UNIT, `Unknown unit: "${unit}".${hint}`);
    this.name = 'UnknownUnitError';
    this.unit = unit;
    this.suggestions = suggestions;
  }
}

/**
 * Thrown when `to()` is called with a unit from a different category.
 */
export class IncompatibleUnitsError extends UnitConverterError {
  readonly from: string;
  readonly to: string;
  readonly fromCategory: string;
  readonly toCategory: string;

  constructor(from: string, to: string, fromCategory: string, toCategory: string) {
    super(
      ErrorCode.INCOMPATIBLE_UNITS,
      `Cannot convert "${from}" (${fromCategory}) to "${to}" (${toCategory}): different categories.`,
    );
    this.name = 'IncompatibleUnitsError';
    this.from = from;
    this.to = to;
    this.fromCategory = fromCategory;
    this.toCategory = toCategory;
  }
}

/**
 * Thrown for NaN, ±Infinity, wrong runtime type, or result overflow.
 *
 * `.cause` distinguishes the failure mode: `'nan'`, `'infinity'`, `'type'`, `'overflow'`.
 */
export class InvalidValueError extends UnitConverterError {
  readonly value: unknown;
  override readonly cause: 'nan' | 'infinity' | 'type' | 'overflow';

  constructor(value: unknown, cause: 'nan' | 'infinity' | 'type' | 'overflow') {
    super(ErrorCode.INVALID_VALUE, InvalidValueError.formatMessage(value, cause));
    this.name = 'InvalidValueError';
    this.value = value;
    this.cause = cause;
  }

  private static formatMessage(value: unknown, cause: string): string {
    switch (cause) {
      case 'nan':
        return 'Value must be a finite number, got NaN.';
      case 'infinity':
        return 'Value must be a finite number, got Infinity.';
      case 'overflow':
        return 'Conversion overflowed to Infinity; result is unrepresentable as a finite number.';
      default:
        return `Value must be a finite number, got ${typeof value}.`;
    }
  }
}

/**
 * Thrown by BigInt conversions when the source/target unit lacks a `bigintRatio`.
 */
export class UnitNotBigIntSafeError extends UnitConverterError {
  readonly unit: string;

  constructor(unit: string) {
    super(
      ErrorCode.BIGINT_UNSAFE,
      `Unit "${unit}" cannot participate in BigInt conversions (no integer ratio).`,
    );
    this.name = 'UnitNotBigIntSafeError';
    this.unit = unit;
  }
}

/**
 * Thrown when a BigInt conversion would lose precision (non-integer result).
 *
 * Carries both ratios so the caller can debug what division failed.
 */
export class BigIntPrecisionError extends UnitConverterError {
  readonly from: string;
  readonly to: string;
  readonly value: bigint;

  constructor(from: string, to: string, value: bigint) {
    super(
      ErrorCode.BIGINT_PRECISION,
      `BigInt conversion ${value}${from} → ${to} is not exact; use number conversion or accept truncation explicitly.`,
    );
    this.name = 'BigIntPrecisionError';
    this.from = from;
    this.to = to;
    this.value = value;
  }
}

/**
 * Thrown by the root `convert()` when the unit name resolves to more than one
 * category (e.g., `'min'` could be `time` or `length:miniminch` in some
 * registries). Use a per-category function or the disambiguation overload
 * instead.
 */
export class AmbiguousUnitError extends UnitConverterError {
  readonly unit: string;
  readonly categories: readonly string[];

  constructor(unit: string, categories: readonly string[]) {
    super(
      ErrorCode.AMBIGUOUS_UNIT,
      `Unit "${unit}" is ambiguous: matches ${categories.join(', ')}. Use a per-category import.`,
    );
    this.name = 'AmbiguousUnitError';
    this.unit = unit;
    this.categories = categories;
  }
}
