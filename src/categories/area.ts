/**
 * Area conversions (anchor: square metre).
 *
 * Numeric factors are exported as named constants in
 * {@link ../constants/area | src/constants/area.ts} and re-exported below.
 *
 * @module
 */

import {
  ACRE_TO_SQUARE_METER,
  ARE_TO_SQUARE_METER,
  HECTARE_TO_SQUARE_METER,
  SQUARE_CENTIMETER_TO_SQUARE_METER,
  SQUARE_FOOT_TO_SQUARE_METER,
  SQUARE_INCH_TO_SQUARE_METER,
  SQUARE_KILOMETER_TO_SQUARE_METER,
  SQUARE_METER_TO_SQUARE_METER,
  SQUARE_MILE_TO_SQUARE_METER,
  SQUARE_MILLIMETER_TO_SQUARE_METER,
  SQUARE_YARD_TO_SQUARE_METER,
} from '../constants';
import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

export * from '../constants/area.js';

/** @internal */
export const areaCategory: CategoryDef<'area'> = {
  name: 'area',
  anchor: 'm2',
  units: {
    m2: {
      ratio: SQUARE_METER_TO_SQUARE_METER,
      name: 'square meter',
      plural: 'square meters',
      symbol: 'm²',
      system: 'metric',
      aliases: ['sqm', 'squaremeter', 'm^2', 'm²'],
    },
    cm2: {
      ratio: SQUARE_CENTIMETER_TO_SQUARE_METER,
      name: 'square centimeter',
      plural: 'square centimeters',
      symbol: 'cm²',
      system: 'metric',
      aliases: ['sqcm', 'cm^2', 'cm²'],
    },
    mm2: {
      ratio: SQUARE_MILLIMETER_TO_SQUARE_METER,
      name: 'square millimeter',
      plural: 'square millimeters',
      symbol: 'mm²',
      system: 'metric',
      aliases: ['sqmm', 'mm^2', 'mm²'],
    },
    km2: {
      ratio: SQUARE_KILOMETER_TO_SQUARE_METER,
      name: 'square kilometer',
      plural: 'square kilometers',
      symbol: 'km²',
      system: 'metric',
      aliases: ['sqkm', 'km^2', 'km²'],
    },
    ha: {
      ratio: HECTARE_TO_SQUARE_METER,
      name: 'hectare',
      plural: 'hectares',
      symbol: 'ha',
      system: 'metric',
      aliases: ['hectare', 'hectares'],
    },
    a: {
      ratio: ARE_TO_SQUARE_METER,
      name: 'are',
      plural: 'ares',
      symbol: 'a',
      system: 'metric',
      aliases: ['are', 'ares'],
    },
    in2: {
      ratio: SQUARE_INCH_TO_SQUARE_METER,
      name: 'square inch',
      plural: 'square inches',
      symbol: 'in²',
      system: 'imperial',
      aliases: ['sqin', 'in^2', 'in²'],
    },
    ft2: {
      ratio: SQUARE_FOOT_TO_SQUARE_METER,
      name: 'square foot',
      plural: 'square feet',
      symbol: 'ft²',
      system: 'imperial',
      aliases: ['sqft', 'ft^2', 'ft²'],
    },
    yd2: {
      ratio: SQUARE_YARD_TO_SQUARE_METER,
      name: 'square yard',
      plural: 'square yards',
      symbol: 'yd²',
      system: 'imperial',
      aliases: ['sqyd', 'yd^2', 'yd²'],
    },
    mi2: {
      ratio: SQUARE_MILE_TO_SQUARE_METER,
      name: 'square mile',
      plural: 'square miles',
      symbol: 'mi²',
      system: 'imperial',
      aliases: ['sqmi', 'mi^2', 'mi²'],
    },
    acre: {
      ratio: ACRE_TO_SQUARE_METER,
      name: 'acre',
      plural: 'acres',
      symbol: 'ac',
      system: 'imperial',
      aliases: ['ac', 'acres'],
    },
  },
};

/**
 * Convert an area value between any registered area units.
 *
 * @example
 *   import { area } from '@biggora/unit-converter/area';
 *
 *   area(1, 'ha').to('acre');   // 2.4710538...
 *   area(1, 'mi2').to('km2');   // 2.589988...
 *
 * @since 0.1.0
 */
export const area = makeCategory(areaCategory);

declare module '../core/types.js' {
  interface UnitRegistry {
    area: keyof typeof areaCategory.units;
  }
}
