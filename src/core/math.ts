/**
 * Core conversion math: a single affine hot-path plus a transform fallback for
 * non-linear units. Both functions assume the inputs have already been
 * validated.
 *
 * @module
 */

import { InvalidValueError } from './errors.js';
import type { UnitDef } from './types.js';

/**
 * Validate that {@link value} is a finite number. Throws {@link InvalidValueError}
 * otherwise.
 *
 * @internal
 */
export function assertFiniteNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number') throw new InvalidValueError(value, 'type');
  if (Number.isNaN(value)) throw new InvalidValueError(value, 'nan');
  if (!Number.isFinite(value)) throw new InvalidValueError(value, 'infinity');
}

/**
 * Affine conversion `from → to` through the category anchor.
 *
 * Formula: `result = (value * from.ratio + (from.offset ?? 0) - (to.offset ?? 0)) / to.ratio`
 *
 * Single-pass: minimises FP-operations and rounding error. Falls back to
 * {@link transformConvert} when either side declares a `transform`.
 *
 * @internal
 */
export function affineConvert(value: number, from: UnitDef, to: UnitDef): number {
  if (from === to) return value;
  if (from.transform || to.transform) return transformConvert(value, from, to);

  const fromOffset = from.offset ?? 0;
  const toOffset = to.offset ?? 0;
  const result = (value * from.ratio + fromOffset - toOffset) / to.ratio;

  if (!Number.isFinite(result)) {
    throw new InvalidValueError(result, 'overflow');
  }
  return result;
}

/**
 * Non-linear conversion routing through the category anchor via the unit's
 * `transform` pair. When only one of the two units is non-linear, the other
 * side uses its affine `ratio`/`offset` as the anchor mapping.
 *
 * @internal
 */
export function transformConvert(value: number, from: UnitDef, to: UnitDef): number {
  const anchor = from.transform
    ? from.transform.toAnchor(value)
    : value * from.ratio + (from.offset ?? 0);

  const result = to.transform
    ? to.transform.fromAnchor(anchor)
    : (anchor - (to.offset ?? 0)) / to.ratio;

  if (!Number.isFinite(result)) {
    throw new InvalidValueError(result, 'overflow');
  }
  return result;
}
