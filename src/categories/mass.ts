/**
 * Mass conversions (anchor: kilogram).
 *
 * Numeric factors are exported as named constants in
 * {@link ../constants/mass | src/constants/mass.ts} and re-exported below.
 *
 * @module
 */

import {
  MASS,
  CARAT,
  CARAT_TO_KILOGRAM,
  GRAIN,
  GRAIN_TO_KILOGRAM,
  GRAM,
  GRAM_TO_KILOGRAM,
  KILOGRAM,
  KILOGRAM_TO_KILOGRAM,
  LONG_TON,
  LONG_TON_TO_KILOGRAM,
  MICROGRAM,
  MICROGRAM_TO_KILOGRAM,
  MILLIGRAM,
  MILLIGRAM_TO_KILOGRAM,
  OUNCE,
  OUNCE_TO_KILOGRAM,
  POUND,
  POUND_TO_KILOGRAM,
  SHORT_TON,
  SHORT_TON_TO_KILOGRAM,
  STONE,
  STONE_TO_KILOGRAM,
  TONNE,
  TONNE_TO_KILOGRAM,
} from '../constants';
import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

export * from '../constants/mass.js';

/** @internal */
export const massCategory: CategoryDef<typeof MASS> = {
  name: MASS,
  anchor: KILOGRAM,
  units: {
    [KILOGRAM]: {
      ratio: KILOGRAM_TO_KILOGRAM,
      name: 'kilogram',
      plural: 'kilograms',
      symbol: 'kg',
      system: 'metric',
      aliases: ['kilo', 'kilos', 'kilogram', 'kilograms'],
    },
    [GRAM]: {
      ratio: GRAM_TO_KILOGRAM,
      name: 'gram',
      plural: 'grams',
      symbol: 'g',
      system: 'metric',
      aliases: ['gram', 'grams'],
    },
    [MILLIGRAM]: {
      ratio: MILLIGRAM_TO_KILOGRAM,
      name: 'milligram',
      plural: 'milligrams',
      symbol: 'mg',
      system: 'metric',
      aliases: ['milligram', 'milligrams'],
    },
    [MICROGRAM]: {
      ratio: MICROGRAM_TO_KILOGRAM,
      name: 'microgram',
      plural: 'micrograms',
      symbol: 'μg',
      system: 'metric',
      aliases: ['ug', 'microgram', 'micrograms'],
    },
    [TONNE]: {
      ratio: TONNE_TO_KILOGRAM,
      name: 'tonne',
      plural: 'tonnes',
      symbol: 't',
      system: 'metric',
      aliases: ['tonne', 'tonnes', 'mt', 'metricton'],
    },
    [POUND]: {
      ratio: POUND_TO_KILOGRAM,
      name: 'pound',
      plural: 'pounds',
      symbol: 'lb',
      system: 'imperial',
      aliases: ['pound', 'pounds', 'lbs'],
    },
    [OUNCE]: {
      ratio: OUNCE_TO_KILOGRAM,
      name: 'ounce',
      plural: 'ounces',
      symbol: 'oz',
      system: 'imperial',
      aliases: ['ounce', 'ounces'],
    },
    [STONE]: {
      ratio: STONE_TO_KILOGRAM,
      name: 'stone',
      plural: 'stones',
      symbol: 'st',
      system: 'imperial',
      aliases: ['stone', 'stones'],
    },
    [SHORT_TON]: {
      ratio: SHORT_TON_TO_KILOGRAM,
      name: 'short ton',
      plural: 'short tons',
      symbol: 'ton',
      system: 'us',
      aliases: ['shortton', 'ston', 'uston'],
    },
    [LONG_TON]: {
      ratio: LONG_TON_TO_KILOGRAM,
      name: 'long ton',
      plural: 'long tons',
      symbol: 'long ton',
      system: 'imperial',
      aliases: ['longton', 'lton', 'ukton'],
    },
    [GRAIN]: {
      ratio: GRAIN_TO_KILOGRAM,
      name: 'grain',
      plural: 'grains',
      symbol: 'gr',
      system: 'imperial',
      aliases: ['grain', 'grains'],
    },
    [CARAT]: {
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
