/**
 * Volume conversions (anchor: cubic metre).
 *
 * US customary volumes are NIST SP 811 §B.8 boldface (exact).
 *
 * @module
 */

import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

/** @internal */
export const volumeCategory: CategoryDef<'volume'> = {
  name: 'volume',
  anchor: 'm3',
  units: {
    m3: {
      ratio: 1,
      name: 'cubic meter',
      plural: 'cubic meters',
      symbol: 'm³',
      system: 'metric',
      aliases: ['cubicmeter', 'cubicmetre', 'm^3', 'm³'],
    },
    L: {
      ratio: 1e-3,
      name: 'liter',
      plural: 'liters',
      symbol: 'L',
      system: 'metric',
      aliases: ['l', 'litre', 'litres', 'liter', 'liters'],
    },
    mL: {
      ratio: 1e-6,
      name: 'milliliter',
      plural: 'milliliters',
      symbol: 'mL',
      system: 'metric',
      aliases: ['ml', 'millilitre', 'millilitres'],
    },
    cm3: {
      ratio: 1e-6,
      name: 'cubic centimeter',
      plural: 'cubic centimeters',
      symbol: 'cm³',
      system: 'metric',
      aliases: ['cc', 'cubiccentimeter', 'cm^3', 'cm³'],
    },
    mm3: {
      ratio: 1e-9,
      name: 'cubic millimeter',
      plural: 'cubic millimeters',
      symbol: 'mm³',
      system: 'metric',
      aliases: ['cubicmillimeter', 'mm^3', 'mm³'],
    },
    km3: {
      ratio: 1e9,
      name: 'cubic kilometer',
      plural: 'cubic kilometers',
      symbol: 'km³',
      system: 'metric',
      aliases: ['cubickilometer', 'km^3', 'km³'],
    },
    'us-gal': {
      ratio: 0.003785411784, // NIST B.8 exact
      name: 'US gallon',
      plural: 'US gallons',
      symbol: 'gal',
      system: 'us',
      aliases: ['gal', 'gallon', 'gallons', 'usgal'],
    },
    'us-qt': {
      ratio: 0.000946352946,
      name: 'US quart',
      plural: 'US quarts',
      symbol: 'qt',
      system: 'us',
      aliases: ['qt', 'quart', 'quarts', 'usqt'],
    },
    'us-pt': {
      ratio: 0.000473176473,
      name: 'US pint',
      plural: 'US pints',
      symbol: 'pt',
      system: 'us',
      aliases: ['pt', 'pint', 'pints', 'uspt'],
    },
    'us-cup': {
      ratio: 0.0002365882365,
      name: 'US cup',
      plural: 'US cups',
      symbol: 'cup',
      system: 'us',
      aliases: ['cup', 'cups', 'uscup'],
    },
    'us-floz': {
      ratio: 0.0000295735295625,
      name: 'US fluid ounce',
      plural: 'US fluid ounces',
      symbol: 'fl oz',
      system: 'us',
      aliases: ['floz', 'fluidounce', 'fluidounces', 'usfloz'],
    },
    'us-tbsp': {
      ratio: 0.00001478676478125,
      name: 'US tablespoon',
      plural: 'US tablespoons',
      symbol: 'tbsp',
      system: 'us',
      aliases: ['tbsp', 'tablespoon', 'tablespoons'],
    },
    'us-tsp': {
      ratio: 0.000004928921593749999,
      name: 'US teaspoon',
      plural: 'US teaspoons',
      symbol: 'tsp',
      system: 'us',
      aliases: ['tsp', 'teaspoon', 'teaspoons'],
    },
    'imp-gal': {
      ratio: 0.00454609, // exact
      name: 'imperial gallon',
      plural: 'imperial gallons',
      symbol: 'imp gal',
      system: 'imperial',
      aliases: ['impgal', 'ukgal'],
    },
    'imp-pt': {
      ratio: 0.00056826125,
      name: 'imperial pint',
      plural: 'imperial pints',
      symbol: 'imp pt',
      system: 'imperial',
      aliases: ['imppt', 'ukpt'],
    },
    'imp-floz': {
      ratio: 0.0000284130625,
      name: 'imperial fluid ounce',
      plural: 'imperial fluid ounces',
      symbol: 'imp fl oz',
      system: 'imperial',
      aliases: ['impfloz', 'ukfloz'],
    },
    in3: {
      ratio: 0.000016387064, // = 0.0254^3 exact
      name: 'cubic inch',
      plural: 'cubic inches',
      symbol: 'in³',
      system: 'imperial',
      aliases: ['cubicinch', 'in^3', 'in³'],
    },
    ft3: {
      ratio: 0.028316846592, // = 0.3048^3 exact
      name: 'cubic foot',
      plural: 'cubic feet',
      symbol: 'ft³',
      system: 'imperial',
      aliases: ['cubicfoot', 'cubicfeet', 'ft^3', 'ft³'],
    },
    yd3: {
      ratio: 0.764554857984, // = 0.9144^3 exact
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
