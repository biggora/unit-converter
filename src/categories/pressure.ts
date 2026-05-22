/**
 * Pressure conversions (anchor: pascal).
 *
 * `atm` is defined as exactly 101325 Pa (NIST §B.8). `psi` derives from the
 * exact pound-force / square-inch definition and is rounded to 10 significant
 * digits.
 *
 * @module
 */

import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

/** @internal */
export const pressureCategory: CategoryDef<'pressure'> = {
  name: 'pressure',
  anchor: 'Pa',
  units: {
    Pa: {
      ratio: 1,
      name: 'pascal',
      plural: 'pascals',
      symbol: 'Pa',
      system: 'metric',
      aliases: ['pascal', 'pascals'],
    },
    hPa: {
      ratio: 100,
      name: 'hectopascal',
      plural: 'hectopascals',
      symbol: 'hPa',
      system: 'metric',
      aliases: ['hectopascal', 'hectopascals'],
    },
    kPa: {
      ratio: 1_000,
      name: 'kilopascal',
      plural: 'kilopascals',
      symbol: 'kPa',
      system: 'metric',
      aliases: ['kilopascal', 'kilopascals'],
    },
    MPa: {
      ratio: 1_000_000,
      name: 'megapascal',
      plural: 'megapascals',
      symbol: 'MPa',
      system: 'metric',
      aliases: ['megapascal', 'megapascals'],
    },
    GPa: {
      ratio: 1_000_000_000,
      name: 'gigapascal',
      plural: 'gigapascals',
      symbol: 'GPa',
      system: 'metric',
      aliases: ['gigapascal', 'gigapascals'],
    },
    bar: {
      ratio: 100_000,
      name: 'bar',
      plural: 'bar',
      symbol: 'bar',
      system: 'metric',
      aliases: ['bars'],
    },
    mbar: {
      ratio: 100,
      name: 'millibar',
      plural: 'millibar',
      symbol: 'mbar',
      system: 'metric',
      aliases: ['millibar', 'millibars'],
    },
    atm: {
      ratio: 101_325, // NIST §B.8 exact
      name: 'standard atmosphere',
      plural: 'atmospheres',
      symbol: 'atm',
      system: 'metric',
      aliases: ['atmosphere', 'atmospheres'],
    },
    torr: {
      ratio: 101_325 / 760,
      name: 'torr',
      plural: 'torr',
      symbol: 'Torr',
      system: 'metric',
      aliases: ['Torr'],
    },
    mmHg: {
      ratio: 133.322387415, // CIPM 2007
      name: 'millimeter of mercury',
      plural: 'millimeters of mercury',
      symbol: 'mmHg',
      system: 'metric',
      aliases: ['mmhg'],
    },
    inHg: {
      ratio: 3386.388640341, // 25.4 × mmHg
      name: 'inch of mercury',
      plural: 'inches of mercury',
      symbol: 'inHg',
      system: 'imperial',
      aliases: ['inhg'],
    },
    psi: {
      ratio: 6894.757293168, // NIST §B.8: lbf / in² exact then rounded
      name: 'pound-force per square inch',
      plural: 'pound-force per square inch',
      symbol: 'psi',
      system: 'imperial',
      aliases: ['lbfin2', 'lbf/in2'],
    },
  },
};

/**
 * Convert a pressure value between any registered pressure units.
 *
 * @example
 *   import { pressure } from '@biggora/unit-converter/pressure';
 *
 *   pressure(1, 'atm').to('Pa');     // 101325
 *   pressure(14.6959, 'psi').to('atm'); // ≈ 1
 *
 * @since 0.1.0
 */
export const pressure = makeCategory(pressureCategory);

declare module '../core/types.js' {
  interface UnitRegistry {
    pressure: keyof typeof pressureCategory.units;
  }
}
