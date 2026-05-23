/**
 * Volume conversions (anchor: cubic metre).
 *
 * Numeric factors are exported as named constants in
 * {@link ../constants/volume | src/constants/volume.ts} and re-exported below.
 *
 * @module
 */

import {
  CUBIC_CENTIMETER_TO_CUBIC_METER,
  CUBIC_FOOT_TO_CUBIC_METER,
  CUBIC_INCH_TO_CUBIC_METER,
  CUBIC_KILOMETER_TO_CUBIC_METER,
  CUBIC_METER_TO_CUBIC_METER,
  CUBIC_MILLIMETER_TO_CUBIC_METER,
  CUBIC_YARD_TO_CUBIC_METER,
  IMPERIAL_FLUID_OUNCE_TO_CUBIC_METER,
  IMPERIAL_GALLON_TO_CUBIC_METER,
  IMPERIAL_PINT_TO_CUBIC_METER,
  LITER_TO_CUBIC_METER,
  MILLILITER_TO_CUBIC_METER,
  US_CUP_TO_CUBIC_METER,
  US_FLUID_OUNCE_TO_CUBIC_METER,
  US_GALLON_TO_CUBIC_METER,
  US_PINT_TO_CUBIC_METER,
  US_QUART_TO_CUBIC_METER,
  US_TABLESPOON_TO_CUBIC_METER,
  US_TEASPOON_TO_CUBIC_METER,
} from '../constants';
import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

export * from '../constants/volume.js';

/** @internal */
export const volumeCategory: CategoryDef<'volume'> = {
  name: 'volume',
  anchor: 'm3',
  units: {
    m3: {
      ratio: CUBIC_METER_TO_CUBIC_METER,
      name: 'cubic meter',
      plural: 'cubic meters',
      symbol: 'm³',
      system: 'metric',
      aliases: ['cubicmeter', 'cubicmetre', 'm^3', 'm³'],
    },
    L: {
      ratio: LITER_TO_CUBIC_METER,
      name: 'liter',
      plural: 'liters',
      symbol: 'L',
      system: 'metric',
      aliases: ['l', 'litre', 'litres', 'liter', 'liters'],
    },
    mL: {
      ratio: MILLILITER_TO_CUBIC_METER,
      name: 'milliliter',
      plural: 'milliliters',
      symbol: 'mL',
      system: 'metric',
      aliases: ['ml', 'millilitre', 'millilitres'],
    },
    cm3: {
      ratio: CUBIC_CENTIMETER_TO_CUBIC_METER,
      name: 'cubic centimeter',
      plural: 'cubic centimeters',
      symbol: 'cm³',
      system: 'metric',
      aliases: ['cc', 'cubiccentimeter', 'cm^3', 'cm³'],
    },
    mm3: {
      ratio: CUBIC_MILLIMETER_TO_CUBIC_METER,
      name: 'cubic millimeter',
      plural: 'cubic millimeters',
      symbol: 'mm³',
      system: 'metric',
      aliases: ['cubicmillimeter', 'mm^3', 'mm³'],
    },
    km3: {
      ratio: CUBIC_KILOMETER_TO_CUBIC_METER,
      name: 'cubic kilometer',
      plural: 'cubic kilometers',
      symbol: 'km³',
      system: 'metric',
      aliases: ['cubickilometer', 'km^3', 'km³'],
    },
    'us-gal': {
      ratio: US_GALLON_TO_CUBIC_METER,
      name: 'US gallon',
      plural: 'US gallons',
      symbol: 'gal',
      system: 'us',
      aliases: ['gal', 'gallon', 'gallons', 'usgal'],
    },
    'us-qt': {
      ratio: US_QUART_TO_CUBIC_METER,
      name: 'US quart',
      plural: 'US quarts',
      symbol: 'qt',
      system: 'us',
      aliases: ['qt', 'quart', 'quarts', 'usqt'],
    },
    'us-pt': {
      ratio: US_PINT_TO_CUBIC_METER,
      name: 'US pint',
      plural: 'US pints',
      symbol: 'pt',
      system: 'us',
      aliases: ['pt', 'pint', 'pints', 'uspt'],
    },
    'us-cup': {
      ratio: US_CUP_TO_CUBIC_METER,
      name: 'US cup',
      plural: 'US cups',
      symbol: 'cup',
      system: 'us',
      aliases: ['cup', 'cups', 'uscup'],
    },
    'us-floz': {
      ratio: US_FLUID_OUNCE_TO_CUBIC_METER,
      name: 'US fluid ounce',
      plural: 'US fluid ounces',
      symbol: 'fl oz',
      system: 'us',
      aliases: ['floz', 'fluidounce', 'fluidounces', 'usfloz'],
    },
    'us-tbsp': {
      ratio: US_TABLESPOON_TO_CUBIC_METER,
      name: 'US tablespoon',
      plural: 'US tablespoons',
      symbol: 'tbsp',
      system: 'us',
      aliases: ['tbsp', 'tablespoon', 'tablespoons'],
    },
    'us-tsp': {
      ratio: US_TEASPOON_TO_CUBIC_METER,
      name: 'US teaspoon',
      plural: 'US teaspoons',
      symbol: 'tsp',
      system: 'us',
      aliases: ['tsp', 'teaspoon', 'teaspoons'],
    },
    'imp-gal': {
      ratio: IMPERIAL_GALLON_TO_CUBIC_METER,
      name: 'imperial gallon',
      plural: 'imperial gallons',
      symbol: 'imp gal',
      system: 'imperial',
      aliases: ['impgal', 'ukgal'],
    },
    'imp-pt': {
      ratio: IMPERIAL_PINT_TO_CUBIC_METER,
      name: 'imperial pint',
      plural: 'imperial pints',
      symbol: 'imp pt',
      system: 'imperial',
      aliases: ['imppt', 'ukpt'],
    },
    'imp-floz': {
      ratio: IMPERIAL_FLUID_OUNCE_TO_CUBIC_METER,
      name: 'imperial fluid ounce',
      plural: 'imperial fluid ounces',
      symbol: 'imp fl oz',
      system: 'imperial',
      aliases: ['impfloz', 'ukfloz'],
    },
    in3: {
      ratio: CUBIC_INCH_TO_CUBIC_METER,
      name: 'cubic inch',
      plural: 'cubic inches',
      symbol: 'in³',
      system: 'imperial',
      aliases: ['cubicinch', 'in^3', 'in³'],
    },
    ft3: {
      ratio: CUBIC_FOOT_TO_CUBIC_METER,
      name: 'cubic foot',
      plural: 'cubic feet',
      symbol: 'ft³',
      system: 'imperial',
      aliases: ['cubicfoot', 'cubicfeet', 'ft^3', 'ft³'],
    },
    yd3: {
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
