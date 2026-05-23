/**
 * Length conversions (anchor: metre).
 *
 * Numeric factors are exported as named constants in
 * {@link ../constants/length | src/constants/length.ts} and re-exported below.
 *
 * @module
 */

import {
  LENGTH,
  ANGSTROM,
  ANGSTROM_TO_METER,
  ASTRONOMICAL_UNIT,
  ASTRONOMICAL_UNIT_TO_METER,
  CENTIMETER,
  CENTIMETER_TO_METER,
  FOOT,
  FOOT_TO_METER,
  INCH,
  INCH_TO_METER,
  KILOMETER,
  KILOMETER_TO_METER,
  LIGHT_YEAR,
  LIGHT_YEAR_TO_METER,
  METER,
  METER_TO_METER,
  MICROMETER,
  MICROMETER_TO_METER,
  MILE,
  MILE_TO_METER,
  MILLIMETER,
  MILLIMETER_TO_METER,
  NANOMETER,
  NANOMETER_TO_METER,
  NAUTICAL_MILE,
  NAUTICAL_MILE_TO_METER,
  PARSEC,
  PARSEC_TO_METER,
  YARD,
  YARD_TO_METER,
} from '../constants';
import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

export * from '../constants/length.js';

/**
 * Raw category definition. Used by the root registry; most consumers should
 * import {@link length} instead.
 *
 * @internal
 */
export const lengthCategory: CategoryDef<typeof LENGTH> = {
  name: LENGTH,
  anchor: METER,
  units: {
    [METER]: {
      ratio: METER_TO_METER,
      name: 'meter',
      plural: 'meters',
      symbol: 'm',
      system: 'metric',
      aliases: ['meter', 'metre', 'metres', 'meters'],
    },
    [KILOMETER]: {
      ratio: KILOMETER_TO_METER,
      name: 'kilometer',
      plural: 'kilometers',
      symbol: 'km',
      system: 'metric',
      aliases: ['kilometre', 'kilometres', 'kilometers'],
    },
    [CENTIMETER]: {
      ratio: CENTIMETER_TO_METER,
      name: 'centimeter',
      plural: 'centimeters',
      symbol: 'cm',
      system: 'metric',
      aliases: ['centimetre', 'centimetres'],
    },
    [MILLIMETER]: {
      ratio: MILLIMETER_TO_METER,
      name: 'millimeter',
      plural: 'millimeters',
      symbol: 'mm',
      system: 'metric',
      aliases: ['millimetre', 'millimetres'],
    },
    [MICROMETER]: {
      ratio: MICROMETER_TO_METER,
      name: 'micrometer',
      plural: 'micrometers',
      symbol: 'μm',
      system: 'metric',
      aliases: ['um', 'micrometre', 'micrometres', 'micron', 'microns'],
    },
    [NANOMETER]: {
      ratio: NANOMETER_TO_METER,
      name: 'nanometer',
      plural: 'nanometers',
      symbol: 'nm',
      system: 'metric',
      aliases: ['nanometre', 'nanometres'],
    },
    [ANGSTROM]: {
      ratio: ANGSTROM_TO_METER,
      name: 'angstrom',
      plural: 'angstroms',
      symbol: 'Å',
      system: 'metric',
      aliases: ['angstrom', 'angstroms', 'a'],
    },
    [INCH]: {
      ratio: INCH_TO_METER,
      name: 'inch',
      plural: 'inches',
      symbol: 'in',
      system: 'imperial',
      aliases: ['inch', 'inches', '"'],
    },
    [FOOT]: {
      ratio: FOOT_TO_METER,
      name: 'foot',
      plural: 'feet',
      symbol: 'ft',
      system: 'imperial',
      aliases: ['foot', 'feet', "'"],
    },
    [YARD]: {
      ratio: YARD_TO_METER,
      name: 'yard',
      plural: 'yards',
      symbol: 'yd',
      system: 'imperial',
      aliases: ['yard', 'yards'],
    },
    [MILE]: {
      ratio: MILE_TO_METER,
      name: 'mile',
      plural: 'miles',
      symbol: 'mi',
      system: 'imperial',
      aliases: ['mile', 'miles'],
    },
    [NAUTICAL_MILE]: {
      ratio: NAUTICAL_MILE_TO_METER,
      name: 'nautical mile',
      plural: 'nautical miles',
      symbol: 'nmi',
      system: 'imperial',
      aliases: ['nauticalmile', 'nauticalmiles'],
    },
    [LIGHT_YEAR]: {
      ratio: LIGHT_YEAR_TO_METER,
      name: 'light-year',
      plural: 'light-years',
      symbol: 'ly',
      system: 'metric',
      aliases: ['lightyear', 'lightyears'],
    },
    [ASTRONOMICAL_UNIT]: {
      ratio: ASTRONOMICAL_UNIT_TO_METER,
      name: 'astronomical unit',
      plural: 'astronomical units',
      symbol: 'au',
      system: 'metric',
      aliases: ['ua'],
    },
    [PARSEC]: {
      ratio: PARSEC_TO_METER,
      name: 'parsec',
      plural: 'parsecs',
      symbol: 'pc',
      system: 'metric',
      aliases: ['parsec', 'parsecs'],
    },
  },
};

/**
 * Convert a length value between any registered length units.
 *
 * @example
 *   import { length } from '@biggora/unit-converter/length';
 *
 *   length(5, 'm').to('ft');          // 16.4042
 *   length(5500, 'm').to('best');     // { value: 5.5, unit: 'km', ... }
 *   length.units;                     // ['m','km','cm',...]
 *   length.describe('mi');            // { key: 'mi', name: 'mile', ratio: 1609.344, ... }
 *
 * @see https://physics.nist.gov/cuu/pdf/sp811.pdf  NIST SP 811 §B.8
 * @since 0.1.0
 */
export const length = makeCategory(lengthCategory);

declare module '../core/types.js' {
  interface UnitRegistry {
    length: keyof typeof lengthCategory.units;
  }
}
