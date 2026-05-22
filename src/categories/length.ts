/**
 * Length conversions (anchor: metre).
 *
 * Imperial values are NIST SP 811 §B.8 boldface (exact). Astronomical values
 * follow IAU 2012 nominal conversions.
 *
 * @module
 */

import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

/**
 * Raw category definition. Used by the root registry; most consumers should
 * import {@link length} instead.
 *
 * @internal
 */
export const lengthCategory: CategoryDef<'length'> = {
  name: 'length',
  anchor: 'm',
  units: {
    m: {
      ratio: 1,
      name: 'meter',
      plural: 'meters',
      symbol: 'm',
      system: 'metric',
      aliases: ['meter', 'metre', 'metres', 'meters'],
    },
    km: {
      ratio: 1_000,
      name: 'kilometer',
      plural: 'kilometers',
      symbol: 'km',
      system: 'metric',
      aliases: ['kilometre', 'kilometres', 'kilometers'],
    },
    cm: {
      ratio: 0.01,
      name: 'centimeter',
      plural: 'centimeters',
      symbol: 'cm',
      system: 'metric',
      aliases: ['centimetre', 'centimetres'],
    },
    mm: {
      ratio: 0.001,
      name: 'millimeter',
      plural: 'millimeters',
      symbol: 'mm',
      system: 'metric',
      aliases: ['millimetre', 'millimetres'],
    },
    μm: {
      ratio: 1e-6,
      name: 'micrometer',
      plural: 'micrometers',
      symbol: 'μm',
      system: 'metric',
      aliases: ['um', 'micrometre', 'micrometres', 'micron', 'microns'],
    },
    nm: {
      ratio: 1e-9,
      name: 'nanometer',
      plural: 'nanometers',
      symbol: 'nm',
      system: 'metric',
      aliases: ['nanometre', 'nanometres'],
    },
    Å: {
      ratio: 1e-10,
      name: 'angstrom',
      plural: 'angstroms',
      symbol: 'Å',
      system: 'metric',
      aliases: ['angstrom', 'angstroms', 'a'],
    },
    in: {
      ratio: 0.0254, // NIST SP 811 §B.8 exact
      name: 'inch',
      plural: 'inches',
      symbol: 'in',
      system: 'imperial',
      aliases: ['inch', 'inches', '"'],
    },
    ft: {
      ratio: 0.3048, // NIST SP 811 §B.8 exact
      name: 'foot',
      plural: 'feet',
      symbol: 'ft',
      system: 'imperial',
      aliases: ['foot', 'feet', "'"],
    },
    yd: {
      ratio: 0.9144, // NIST SP 811 §B.8 exact
      name: 'yard',
      plural: 'yards',
      symbol: 'yd',
      system: 'imperial',
      aliases: ['yard', 'yards'],
    },
    mi: {
      ratio: 1609.344, // NIST SP 811 §B.8 exact
      name: 'mile',
      plural: 'miles',
      symbol: 'mi',
      system: 'imperial',
      aliases: ['mile', 'miles'],
    },
    nmi: {
      ratio: 1852, // NIST SP 811 §B.9 exact
      name: 'nautical mile',
      plural: 'nautical miles',
      symbol: 'nmi',
      system: 'imperial',
      aliases: ['nauticalmile', 'nauticalmiles'],
    },
    ly: {
      ratio: 9.4607304725808e15, // IAU 2012: c × Julian-year
      name: 'light-year',
      plural: 'light-years',
      symbol: 'ly',
      system: 'metric',
      aliases: ['lightyear', 'lightyears'],
    },
    au: {
      ratio: 1.495978707e11, // IAU 2012 exact
      name: 'astronomical unit',
      plural: 'astronomical units',
      symbol: 'au',
      system: 'metric',
      aliases: ['ua'],
    },
    pc: {
      // Parsec literal exceeds float64 mantissa precision — the runtime value
      // is the nearest representable double (≈ 3.085677581491367e16). Accepted
      // as the canonical encoding of this astronomical constant.
      // biome-ignore lint/correctness/noPrecisionLoss: documented IEEE-754 limit
      ratio: 3.0856775814913673e16,
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
 *   import { length } from 'unit-converter/length';
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
