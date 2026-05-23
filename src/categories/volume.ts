/**
 * Volume conversions (anchor: cubic metre).
 *
 * Numeric factors are exported as named constants in
 * {@link ../constants/volume | src/constants/volume.ts} and re-exported below.
 *
 * @module
 */

import {
  CUBIC_CENTIMETER,
  CUBIC_CENTIMETER_TO_CUBIC_METER,
  CUBIC_FOOT,
  CUBIC_FOOT_TO_CUBIC_METER,
  CUBIC_INCH,
  CUBIC_INCH_TO_CUBIC_METER,
  CUBIC_KILOMETER,
  CUBIC_KILOMETER_TO_CUBIC_METER,
  CUBIC_METER,
  CUBIC_METER_TO_CUBIC_METER,
  CUBIC_MILLIMETER,
  CUBIC_MILLIMETER_TO_CUBIC_METER,
  CUBIC_YARD,
  CUBIC_YARD_TO_CUBIC_METER,
  IMPERIAL_FLUID_OUNCE,
  IMPERIAL_FLUID_OUNCE_TO_CUBIC_METER,
  IMPERIAL_GALLON,
  IMPERIAL_GALLON_TO_CUBIC_METER,
  IMPERIAL_PINT,
  IMPERIAL_PINT_TO_CUBIC_METER,
  LITER,
  LITER_TO_CUBIC_METER,
  MILLILITER,
  MILLILITER_TO_CUBIC_METER,
  US_CUP,
  US_CUP_TO_CUBIC_METER,
  US_FLUID_OUNCE,
  US_FLUID_OUNCE_TO_CUBIC_METER,
  US_GALLON,
  US_GALLON_TO_CUBIC_METER,
  US_PINT,
  US_PINT_TO_CUBIC_METER,
  US_QUART,
  US_QUART_TO_CUBIC_METER,
  US_TABLESPOON,
  US_TABLESPOON_TO_CUBIC_METER,
  US_TEASPOON,
  US_TEASPOON_TO_CUBIC_METER,
  VOLUME,
} from '../constants';
import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

export * from '../constants/volume.js';

/** @internal */
export const volumeCategory: CategoryDef<typeof VOLUME> = {
  name: VOLUME,
  anchor: CUBIC_METER,
  units: {
    [CUBIC_METER]: {
      ratio: CUBIC_METER_TO_CUBIC_METER,
      name: 'cubic meter',
      plural: 'cubic meters',
      symbol: 'm³',
      system: 'metric',
      aliases: ['cubicmeter', 'cubicmetre', 'm^3', 'm³'],
    },
    [LITER]: {
      ratio: LITER_TO_CUBIC_METER,
      name: 'liter',
      plural: 'liters',
      symbol: 'L',
      system: 'metric',
      aliases: ['l', 'litre', 'litres', 'liter', 'liters'],
    },
    [MILLILITER]: {
      ratio: MILLILITER_TO_CUBIC_METER,
      name: 'milliliter',
      plural: 'milliliters',
      symbol: 'mL',
      system: 'metric',
      aliases: ['ml', 'millilitre', 'millilitres'],
    },
    [CUBIC_CENTIMETER]: {
      ratio: CUBIC_CENTIMETER_TO_CUBIC_METER,
      name: 'cubic centimeter',
      plural: 'cubic centimeters',
      symbol: 'cm³',
      system: 'metric',
      aliases: ['cc', 'cubiccentimeter', 'cm^3', 'cm³'],
    },
    [CUBIC_MILLIMETER]: {
      ratio: CUBIC_MILLIMETER_TO_CUBIC_METER,
      name: 'cubic millimeter',
      plural: 'cubic millimeters',
      symbol: 'mm³',
      system: 'metric',
      aliases: ['cubicmillimeter', 'mm^3', 'mm³'],
    },
    [CUBIC_KILOMETER]: {
      ratio: CUBIC_KILOMETER_TO_CUBIC_METER,
      name: 'cubic kilometer',
      plural: 'cubic kilometers',
      symbol: 'km³',
      system: 'metric',
      aliases: ['cubickilometer', 'km^3', 'km³'],
    },
    [US_GALLON]: {
      ratio: US_GALLON_TO_CUBIC_METER,
      name: 'US gallon',
      plural: 'US gallons',
      symbol: 'gal',
      system: 'us',
      aliases: ['gal', 'gallon', 'gallons', 'usgal'],
    },
    [US_QUART]: {
      ratio: US_QUART_TO_CUBIC_METER,
      name: 'US quart',
      plural: 'US quarts',
      symbol: 'qt',
      system: 'us',
      aliases: ['qt', 'quart', 'quarts', 'usqt'],
    },
    [US_PINT]: {
      ratio: US_PINT_TO_CUBIC_METER,
      name: 'US pint',
      plural: 'US pints',
      symbol: 'pt',
      system: 'us',
      aliases: ['pt', 'pint', 'pints', 'uspt'],
    },
    [US_CUP]: {
      ratio: US_CUP_TO_CUBIC_METER,
      name: 'US cup',
      plural: 'US cups',
      symbol: 'cup',
      system: 'us',
      aliases: ['cup', 'cups', 'uscup'],
    },
    [US_FLUID_OUNCE]: {
      ratio: US_FLUID_OUNCE_TO_CUBIC_METER,
      name: 'US fluid ounce',
      plural: 'US fluid ounces',
      symbol: 'fl oz',
      system: 'us',
      aliases: ['floz', 'fluidounce', 'fluidounces', 'usfloz'],
    },
    [US_TABLESPOON]: {
      ratio: US_TABLESPOON_TO_CUBIC_METER,
      name: 'US tablespoon',
      plural: 'US tablespoons',
      symbol: 'tbsp',
      system: 'us',
      aliases: ['tbsp', 'tablespoon', 'tablespoons'],
    },
    [US_TEASPOON]: {
      ratio: US_TEASPOON_TO_CUBIC_METER,
      name: 'US teaspoon',
      plural: 'US teaspoons',
      symbol: 'tsp',
      system: 'us',
      aliases: ['tsp', 'teaspoon', 'teaspoons'],
    },
    [IMPERIAL_GALLON]: {
      ratio: IMPERIAL_GALLON_TO_CUBIC_METER,
      name: 'imperial gallon',
      plural: 'imperial gallons',
      symbol: 'imp gal',
      system: 'imperial',
      aliases: ['impgal', 'ukgal'],
    },
    [IMPERIAL_PINT]: {
      ratio: IMPERIAL_PINT_TO_CUBIC_METER,
      name: 'imperial pint',
      plural: 'imperial pints',
      symbol: 'imp pt',
      system: 'imperial',
      aliases: ['imppt', 'ukpt'],
    },
    [IMPERIAL_FLUID_OUNCE]: {
      ratio: IMPERIAL_FLUID_OUNCE_TO_CUBIC_METER,
      name: 'imperial fluid ounce',
      plural: 'imperial fluid ounces',
      symbol: 'imp fl oz',
      system: 'imperial',
      aliases: ['impfloz', 'ukfloz'],
    },
    [CUBIC_INCH]: {
      ratio: CUBIC_INCH_TO_CUBIC_METER,
      name: 'cubic inch',
      plural: 'cubic inches',
      symbol: 'in³',
      system: 'imperial',
      aliases: ['cubicinch', 'in^3', 'in³'],
    },
    [CUBIC_FOOT]: {
      ratio: CUBIC_FOOT_TO_CUBIC_METER,
      name: 'cubic foot',
      plural: 'cubic feet',
      symbol: 'ft³',
      system: 'imperial',
      aliases: ['cubicfoot', 'cubicfeet', 'ft^3', 'ft³'],
    },
    [CUBIC_YARD]: {
      ratio: CUBIC_YARD_TO_CUBIC_METER,
      name: 'cubic yard',
      plural: 'cubic yards',
      symbol: 'yd³',
      system: 'imperial',
      aliases: ['cubicyard', 'cubicyards', 'yd^3', 'yd³'],
    },
  },
};

/**
 * Convert a volume value between any registered volume units.
 *
 * @example
 *   import { volume } from '@biggora/unit-converter/volume';
 *
 *   volume(1, 'L').to('us-floz');    // 33.814...
 *   volume(1, 'us-gal').to('L');     // 3.7854...
 *
 * @see https://physics.nist.gov/cuu/pdf/sp811.pdf  NIST SP 811 §B.8
 * @since 0.1.0
 */
export const volume = makeCategory(volumeCategory);

declare module '../core/types.js' {
  interface UnitRegistry {
    volume: keyof typeof volumeCategory.units;
  }
}
