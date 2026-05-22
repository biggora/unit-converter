/**
 * Public entry point: the root `convert()` that auto-routes to the correct
 * category via the lazy registry.
 *
 * @module
 */

import { angle } from '../categories/angle.js';
import { area } from '../categories/area.js';
import { dataStorage } from '../categories/data-storage.js';
import { length } from '../categories/length.js';
import { mass } from '../categories/mass.js';
import { pressure } from '../categories/pressure.js';
import { speed } from '../categories/speed.js';
import { temperature } from '../categories/temperature.js';
import { time } from '../categories/time.js';
import { volume } from '../categories/volume.js';
import type { CategoryFunction } from '../factories/make-category.js';
import { AmbiguousUnitError, IncompatibleUnitsError, UnknownUnitError } from './errors.js';
import { assertFiniteNumber } from './math.js';
import { normalizeUnit, suggest } from './normalize.js';
import { getIndex } from './registry.js';
import type {
  BestOptions,
  BestResult,
  BigIntConverter,
  BigIntUnit,
  CategoryOf,
  Converter,
  Unit,
  UnitsOf,
} from './types.js';

type AnyCategoryFn = CategoryFunction<string>;

/**
 * Map from CategoryDef.name → callable per-category function. Built once at
 * module load (cheap: ten property lookups).
 *
 * @internal
 */
const CATEGORY_FNS: Readonly<Record<string, AnyCategoryFn>> = Object.freeze({
  length: length as unknown as AnyCategoryFn,
  mass: mass as unknown as AnyCategoryFn,
  time: time as unknown as AnyCategoryFn,
  temperature: temperature as unknown as AnyCategoryFn,
  volume: volume as unknown as AnyCategoryFn,
  area: area as unknown as AnyCategoryFn,
  speed: speed as unknown as AnyCategoryFn,
  dataStorage: dataStorage as unknown as AnyCategoryFn,
  angle: angle as unknown as AnyCategoryFn,
  pressure: pressure as unknown as AnyCategoryFn,
});

interface Resolved {
  readonly fn: AnyCategoryFn;
  readonly categoryName: string;
}

function resolveCategory(unitName: string, override?: string): Resolved {
  const { entries, collisions } = getIndex();
  const lc = normalizeUnit(unitName);

  if (override) {
    const fn = CATEGORY_FNS[override];
    if (!fn) {
      throw new UnknownUnitError(override, Object.keys(CATEGORY_FNS));
    }
    return { fn, categoryName: override };
  }

  const collided = collisions.get(lc);
  if (collided) {
    throw new AmbiguousUnitError(unitName, collided);
  }

  const entry = entries.get(lc);
  if (!entry) {
    const allKnown: string[] = [];
    for (const k of entries.keys()) allKnown.push(k);
    throw new UnknownUnitError(unitName, suggest(unitName, allKnown));
  }

  const fn = CATEGORY_FNS[entry.category.name];
  if (!fn) {
    throw new UnknownUnitError(unitName);
  }
  return { fn, categoryName: entry.category.name };
}

/**
 * Disambiguation hint for collision-prone unit names.
 *
 * @example
 *   convert(5, 'min', { category: 'time' });
 */
export interface ConvertOptions {
  readonly category?: string;
}

/**
 * Convert a numeric value out of unit {@link from}. Auto-resolves the
 * appropriate measurement category from the unit name.
 *
 * For unit names registered in more than one category use
 * `{ category: '<category>' }` or import the per-category function directly.
 *
 * @param value - Finite numeric magnitude.
 * @param from  - Source unit (canonical name, alias, or symbol; case-insensitive).
 * @param opts  - Optional category override.
 * @returns A {@link Converter} chained to `value`.
 * @throws {UnknownUnitError}     when `from` is not registered.
 * @throws {AmbiguousUnitError}   when `from` matches multiple categories and no override is given.
 * @throws {InvalidValueError}    when `value` is NaN/Infinity/non-number.
 * @throws {IncompatibleUnitsError} when the subsequent `to()` targets a foreign category.
 *
 * @example
 *   import { convert } from '@biggora/unit-converter';
 *
 *   convert(5, 'm').to('ft');           // 16.4042
 *   convert(0, 'C').to('F');            // 32
 *   convert(5500, 'm').to('best');      // { value: 5.5, unit: 'km', ... }
 *
 * @since 0.1.0
 */
export function convert<From extends Unit>(value: number, from: From): Converter<From>;
export function convert<From extends BigIntUnit>(value: bigint, from: From): BigIntConverter<From>;
export function convert(
  value: number | bigint,
  from: string,
  opts?: ConvertOptions,
): Converter<Unit> | BigIntConverter<BigIntUnit>;
export function convert(
  value: number | bigint,
  from: string,
  opts?: ConvertOptions,
): Converter<Unit> | BigIntConverter<BigIntUnit> {
  const { fn, categoryName } = resolveCategory(from, opts?.category);

  if (typeof value === 'bigint') {
    const inner = fn.bigint(value, from);
    return Object.freeze({
      category: categoryName,
      to(target: string): bigint {
        return inner.to(target);
      },
    }) as BigIntConverter<BigIntUnit>;
  }

  assertFiniteNumber(value);
  const inner = fn(value, from);

  return Object.freeze({
    category: categoryName as CategoryOf<Unit>,
    possibilities(): readonly UnitsOf<CategoryOf<Unit>>[] {
      return inner.possibilities() as readonly UnitsOf<CategoryOf<Unit>>[];
    },
    to(target: string | 'best', conversionOpts?: BestOptions): number | BestResult {
      if (target === 'best') return inner.to('best', conversionOpts);
      // Verify cross-category compatibility for nicer errors before delegation.
      const targetResolved = resolveCategory(target, opts?.category);
      if (targetResolved.categoryName !== categoryName) {
        throw new IncompatibleUnitsError(from, target, categoryName, targetResolved.categoryName);
      }
      return inner.to(target);
    },
  }) as Converter<Unit>;
}
