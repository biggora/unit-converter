/**
 * Area conversions (anchor: square metre).
 *
 * Imperial squared values are derived from the exact NIST §B.8 length values
 * (so `ft2 = 0.3048²`, etc).
 *
 * @module
 */

import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

/** @internal */
export const areaCategory: CategoryDef<'area'> = {
  name: 'area',
  anchor: 'm2',
  units: {
    m2: {
      ratio: 1,
      name: 'square meter',
      plural: 'square meters',
      symbol: 'm²',
      system: 'metric',
      aliases: ['sqm', 'squaremeter', 'm^2', 'm²'],
    },
    cm2: {
      ratio: 1e-4,
      name: 'square centimeter',
      plural: 'square centimeters',
      symbol: 'cm²',
      system: 'metric',
      aliases: ['sqcm', 'cm^2', 'cm²'],
    },
    mm2: {
      ratio: 1e-6,
      name: 'square millimeter',
      plural: 'square millimeters',
      symbol: 'mm²',
      system: 'metric',
      aliases: ['sqmm', 'mm^2', 'mm²'],
    },
    km2: {
      ratio: 1e6,
      name: 'square kilometer',
      plural: 'square kilometers',
      symbol: 'km²',
      system: 'metric',
      aliases: ['sqkm', 'km^2', 'km²'],
    },
    ha: {
      ratio: 10_000,
      name: 'hectare',
      plural: 'hectares',
      symbol: 'ha',
      system: 'metric',
      aliases: ['hectare', 'hectares'],
    },
    a: {
      ratio: 100,
      name: 'are',
      plural: 'ares',
      symbol: 'a',
      system: 'metric',
      aliases: ['are', 'ares'],
    },
    in2: {
      ratio: 0.00064516, // = 0.0254^2 exact
      name: 'square inch',
      plural: 'square inches',
      symbol: 'in²',
      system: 'imperial',
      aliases: ['sqin', 'in^2', 'in²'],
    },
    ft2: {
      ratio: 0.09290304, // = 0.3048^2 exact
      name: 'square foot',
      plural: 'square feet',
      symbol: 'ft²',
      system: 'imperial',
      aliases: ['sqft', 'ft^2', 'ft²'],
    },
    yd2: {
      ratio: 0.83612736, // = 0.9144^2 exact
      name: 'square yard',
      plural: 'square yards',
      symbol: 'yd²',
      system: 'imperial',
      aliases: ['sqyd', 'yd^2', 'yd²'],
    },
    mi2: {
      ratio: 2_589_988.110336, // = 1609.344^2 exact
      name: 'square mile',
      plural: 'square miles',
      symbol: 'mi²',
      system: 'imperial',
      aliases: ['sqmi', 'mi^2', 'mi²'],
    },
    acre: {
      ratio: 4_046.8564224, // = 4840 * yd2 exact
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
 *   import { area } from 'unit-converter/area';
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
