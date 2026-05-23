/**
 * `unit-converter` — zero-dependency, cross-runtime TypeScript micro-library
 * for unit conversion.
 *
 * Three import patterns are supported, all tree-shake-friendly:
 *
 * ```ts
 * // 1. Root convert — auto-routes by unit name.
 * import { convert } from '@biggora/unit-converter';
 * convert(5, 'm').to('ft');
 *
 * // 2. Per-category subpath — smallest bundle.
 * import { length } from '@biggora/unit-converter/length';
 * length(5, 'm').to('ft');
 *
 * // 3. Named per-category exports from the root.
 * import { mass, time } from '@biggora/unit-converter';
 * ```
 *
 * @module
 */

export { convert, type ConvertOptions } from './core/convert.js';

export {
  type ExportedCategory,
  type ExportedRegistry,
  type ExportedUnit,
  type ExportFormat,
  type ExportOptions,
  exportRegistry,
} from './core/exporter.js';

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

export * from './categories/angle.js';
export * from './categories/area.js';
export * from './categories/data-storage.js';
export * from './categories/length.js';
export * from './categories/mass.js';
export * from './categories/pressure.js';
export * from './categories/speed.js';
export * from './categories/temperature.js';
export * from './categories/time.js';
export * from './categories/volume.js';
export * from './constants/categories.js';
