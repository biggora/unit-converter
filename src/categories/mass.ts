/**
 * Mass conversions (anchor: kilogram).
 *
 * Imperial / avoirdupois values are NIST SP 811 §B.8 boldface (exact).
 *
 * @module
 */

import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

/** @internal */
export const massCategory: CategoryDef<'mass'> = {
  name: 'mass',
  anchor: 'kg',
  units: {
    kg: {
      ratio: 1,
      name: 'kilogram',
      plural: 'kilograms',
      symbol: 'kg',
      system: 'metric',
      aliases: ['kilo', 'kilos', 'kilogram', 'kilograms'],
    },
    g: {
      ratio: 0.001,
      name: 'gram',
      plural: 'grams',
      symbol: 'g',
      system: 'metric',
      aliases: ['gram', 'grams'],
    },
    mg: {
      ratio: 1e-6,
      name: 'milligram',
      plural: 'milligrams',
      symbol: 'mg',
      system: 'metric',
      aliases: ['milligram', 'milligrams'],
    },
    μg: {
      ratio: 1e-9,
      name: 'microgram',
      plural: 'micrograms',
      symbol: 'μg',
      system: 'metric',
      aliases: ['ug', 'microgram', 'micrograms'],
    },
    t: {
      ratio: 1_000,
      name: 'tonne',
      plural: 'tonnes',
      symbol: 't',
      system: 'metric',
      aliases: ['tonne', 'tonnes', 'mt', 'metricton'],
    },
    lb: {
      ratio: 0.45359237, // NIST SP 811 §B.8 exact
      name: 'pound',
      plural: 'pounds',
      symbol: 'lb',
      system: 'imperial',
      aliases: ['pound', 'pounds', 'lbs'],
    },
    oz: {
      ratio: 0.028349523125, // = lb / 16, exact
      name: 'ounce',
      plural: 'ounces',
      symbol: 'oz',
      system: 'imperial',
      aliases: ['ounce', 'ounces'],
    },
    st: {
      ratio: 6.35029318, // = 14 * lb, exact
      name: 'stone',
      plural: 'stones',
      symbol: 'st',
      system: 'imperial',
      aliases: ['stone', 'stones'],
    },
    ton: {
      ratio: 907.18474, // US short ton = 2000 lb, exact
      name: 'short ton',
      plural: 'short tons',
      symbol: 'ton',
      system: 'us',
      aliases: ['shortton', 'ston', 'uston'],
    },
    'long-ton': {
      ratio: 1016.0469088, // UK long ton = 2240 lb, exact
      name: 'long ton',
      plural: 'long tons',
      symbol: 'long ton',
      system: 'imperial',
      aliases: ['longton', 'lton', 'ukton'],
    },
    gr: {
      ratio: 0.00006479891, // NIST: grain = 64.79891 mg, exact
      name: 'grain',
      plural: 'grains',
      symbol: 'gr',
      system: 'imperial',
      aliases: ['grain', 'grains'],
    },
    ct: {
      ratio: 0.0002, // metric carat = 200 mg, exact
      name: 'carat',
      plural: 'carats',
      symbol: 'ct',
      system: 'metric',
      aliases: ['carat', 'carats'],
    },
  },
};

/**
 * Convert a mass value between any registered mass units.
 *
 * @example
 *   import { mass } from 'unit-converter/mass';
 *
 *   mass(1, 'kg').to('lb');      // 2.20462...
 *   mass(150, 'g').to('best');   // { value: 150, unit: 'g', ... }
 *
 * @see https://physics.nist.gov/cuu/pdf/sp811.pdf  NIST SP 811 §B.8
 * @since 0.1.0
 */
export const mass = makeCategory(massCategory);

declare module '../core/types.js' {
  interface UnitRegistry {
    mass: keyof typeof massCategory.units;
  }
}
