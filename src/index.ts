/**
 * `unit-converter` — zero-dependency, cross-runtime TypeScript micro-library
 * for unit conversion.
 *
 * Three import patterns are supported, all tree-shake-friendly:
 *
 * ```ts
 * // 1. Root convert — auto-routes by unit name.
 * import { convert } from 'unit-converter';
 * convert(5, 'm').to('ft');
 *
 * // 2. Per-category subpath — smallest bundle.
 * import { length } from 'unit-converter/length';
 * length(5, 'm').to('ft');
 *
 * // 3. Named per-category exports from the root.
 * import { mass, time } from 'unit-converter';
 * ```
 *
 * @module
 */

export { convert, type ConvertOptions } from './core/convert.js';

export type {
  BestOptions,
  BestResult,
  BigIntConverter,
  BigIntUnit,
  Category,
  CategoryDef,
  CategoryOf,
  Converter,
  System,
  Unit,
  UnitDef,
  UnitRegistry,
  UnitsOf,
  UnitTransform,
} from './core/types.js';

export {
  AmbiguousUnitError,
  BigIntPrecisionError,
  ErrorCode,
  IncompatibleUnitsError,
  InvalidValueError,
  UnitConverterError,
  UnitNotBigIntSafeError,
  UnknownUnitError,
} from './core/errors.js';

export { angle } from './categories/angle.js';
export { area } from './categories/area.js';
export { dataStorage } from './categories/data-storage.js';
export { length } from './categories/length.js';
export { mass } from './categories/mass.js';
export { pressure } from './categories/pressure.js';
export { speed } from './categories/speed.js';
export { temperature } from './categories/temperature.js';
export { time } from './categories/time.js';
export { volume } from './categories/volume.js';
