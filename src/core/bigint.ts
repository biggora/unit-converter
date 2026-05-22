/**
 * Exact BigInt conversions for integer-safe units (time, dataStorage, …).
 *
 * Math is performed in the category anchor: `anchor = value * from.bigintRatio`,
 * `result = anchor / to.bigintRatio`. If the division is not exact the call
 * throws {@link BigIntPrecisionError} — no silent truncation.
 *
 * @module
 */

import { BigIntPrecisionError, InvalidValueError, UnitNotBigIntSafeError } from './errors.js';
import type { UnitDef } from './types.js';

/**
 * Validate a BigInt input. Throws {@link InvalidValueError} for non-bigints.
 *
 * @internal
 */
export function assertBigInt(value: unknown): asserts value is bigint {
  if (typeof value !== 'bigint') throw new InvalidValueError(value, 'type');
}

/**
 * Convert {@link value} between two unit definitions using BigInt arithmetic.
 *
 * @throws {UnitNotBigIntSafeError} when either unit lacks `bigintRatio`.
 * @throws {BigIntPrecisionError}  when the result is not an exact integer.
 *
 * @internal
 */
export function bigintConvert(
  value: bigint,
  from: UnitDef,
  to: UnitDef,
  fromName: string,
  toName: string,
): bigint {
  if (from.bigintRatio === undefined) throw new UnitNotBigIntSafeError(fromName);
  if (to.bigintRatio === undefined) throw new UnitNotBigIntSafeError(toName);
  if (from === to) return value;

  const anchor = value * from.bigintRatio;
  if (anchor % to.bigintRatio !== 0n) {
    throw new BigIntPrecisionError(fromName, toName, value);
  }
  return anchor / to.bigintRatio;
}
