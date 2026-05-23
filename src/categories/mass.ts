/**
 * Mass conversions (anchor: kilogram).
 *
 * Numeric factors are exported as named constants in
 * {@link ../constants/mass | src/constants/mass.ts} and re-exported below.
 *
 * @module
 */

import {
  CARAT_TO_KILOGRAM,
  GRAIN_TO_KILOGRAM,
  GRAM_TO_KILOGRAM,
  KILOGRAM_TO_KILOGRAM,
  LONG_TON_TO_KILOGRAM,
  MICROGRAM_TO_KILOGRAM,
  MILLIGRAM_TO_KILOGRAM,
  OUNCE_TO_KILOGRAM,
  POUND_TO_KILOGRAM,
  SHORT_TON_TO_KILOGRAM,
  STONE_TO_KILOGRAM,
  TONNE_TO_KILOGRAM,
} from '../constants';
import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

export * from '../constants/mass.js';

/** @internal */
export const massCategory: CategoryDef<'mass'> = {
  name: 'mass',
  anchor: 'kg',
  units: {
    kg: {
      ratio: KILOGRAM_TO_KILOGRAM,
      name: 'kilogram',
      plural: 'kilograms',
      symbol: 'kg',
      system: 'metric',
      aliases: ['kilo', 'kilos', 'kilogram', 'kilograms'],
    },
    g: {
      ratio: GRAM_TO_KILOGRAM,
      name: 'gram',
      plural: 'grams',
      symbol: 'g',
      system: 'metric',
      aliases: ['gram', 'grams'],
    },
    mg: {
      ratio: MILLIGRAM_TO_KILOGRAM,
      name: 'milligram',
      plural: 'milligrams',
      symbol: 'mg',
      system: 'metric',
      aliases: ['milligram', 'milligrams'],
    },
    μg: {
      ratio: MICROGRAM_TO_KILOGRAM,
      name: 'microgram',
      plural: 'micrograms',
      symbol: 'μg',
      system: 'metric',
      aliases: ['ug', 'microgram', 'micrograms'],
    },
    t: {
      ratio: TONNE_TO_KILOGRAM,
      name: 'tonne',
      plural: 'tonnes',
      symbol: 't',
      system: 'metric',
      aliases: ['tonne', 'tonnes', 'mt', 'metricton'],
    },
    lb: {
      ratio: POUND_TO_KILOGRAM,
      name: 'pound',
      plural: 'pounds',
      symbol: 'lb',
      system: 'imperial',
      aliases: ['pound', 'pounds', 'lbs'],
    },
    oz: {
      ratio: OUNCE_TO_KILOGRAM,
      name: 'ounce',
      plural: 'ounces',
      symbol: 'oz',
      system: 'imperial',
      aliases: ['ounce', 'ounces'],
    },
    st: {
      ratio: STONE_TO_KILOGRAM,
      name: 'stone',
      plural: 'stones',
      symbol: 'st',
      system: 'imperial',
      aliases: ['stone', 'stones'],
    },
    ton: {
      ratio: SHORT_TON_TO_KILOGRAM,
      name: 'short ton',
      plural: 'short tons',
      symbol: 'ton',
      system: 'us',
      aliases: ['shortton', 'ston', 'uston'],
    },
    'long-ton': {
      ratio: LONG_TON_TO_KILOGRAM,
      name: 'long ton',
      plural: 'long tons',
      symbol: 'long ton',
      system: 'imperial',
      aliases: ['longton', 'lton', 'ukton'],
    },
    gr: {
      ratio: GRAIN_TO_KILOGRAM,
      name: 'grain',
      plural: 'grains',
      symbol: 'gr',
      system: 'imperial',
      aliases: ['grain', 'grains'],
    },
    ct: {
      ratio: CARAT_TO_KILOGRAM,
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
 *   import { mass } from '@biggora/unit-converter/mass';
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
