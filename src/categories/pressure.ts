/**
 * Pressure conversions (anchor: pascal).
 *
 * Numeric factors are exported as named constants in
 * {@link ../constants/pressure | src/constants/pressure.ts} and re-exported
 * below.
 *
 * @module
 */

import {
  ATMOSPHERE_TO_PASCAL,
  BAR_TO_PASCAL,
  GIGAPASCAL_TO_PASCAL,
  HECTOPASCAL_TO_PASCAL,
  INCH_OF_MERCURY_TO_PASCAL,
  KILOPASCAL_TO_PASCAL,
  MEGAPASCAL_TO_PASCAL,
  MILLIBAR_TO_PASCAL,
  MILLIMETER_OF_MERCURY_TO_PASCAL,
  PASCAL_TO_PASCAL,
  PSI_TO_PASCAL,
  TORR_TO_PASCAL,
} from '../constants';
import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

export * from '../constants/pressure.js';

/** @internal */
export const pressureCategory: CategoryDef<'pressure'> = {
  name: 'pressure',
  anchor: 'Pa',
  units: {
    Pa: {
      ratio: PASCAL_TO_PASCAL,
      name: 'pascal',
      plural: 'pascals',
      symbol: 'Pa',
      system: 'metric',
      aliases: ['pascal', 'pascals'],
    },
    hPa: {
      ratio: HECTOPASCAL_TO_PASCAL,
      name: 'hectopascal',
      plural: 'hectopascals',
      symbol: 'hPa',
      system: 'metric',
      aliases: ['hectopascal', 'hectopascals'],
    },
    kPa: {
      ratio: KILOPASCAL_TO_PASCAL,
      name: 'kilopascal',
      plural: 'kilopascals',
      symbol: 'kPa',
      system: 'metric',
      aliases: ['kilopascal', 'kilopascals'],
    },
    MPa: {
      ratio: MEGAPASCAL_TO_PASCAL,
      name: 'megapascal',
      plural: 'megapascals',
      symbol: 'MPa',
      system: 'metric',
      aliases: ['megapascal', 'megapascals'],
    },
    GPa: {
      ratio: GIGAPASCAL_TO_PASCAL,
      name: 'gigapascal',
      plural: 'gigapascals',
      symbol: 'GPa',
      system: 'metric',
      aliases: ['gigapascal', 'gigapascals'],
    },
    bar: {
      ratio: BAR_TO_PASCAL,
      name: 'bar',
      plural: 'bar',
      symbol: 'bar',
      system: 'metric',
      aliases: ['bars'],
    },
    mbar: {
      ratio: MILLIBAR_TO_PASCAL,
      name: 'millibar',
      plural: 'millibar',
      symbol: 'mbar',
      system: 'metric',
      aliases: ['millibar', 'millibars'],
    },
    atm: {
      ratio: ATMOSPHERE_TO_PASCAL,
      name: 'standard atmosphere',
      plural: 'atmospheres',
      symbol: 'atm',
      system: 'metric',
      aliases: ['atmosphere', 'atmospheres'],
    },
    torr: {
      ratio: TORR_TO_PASCAL,
      name: 'torr',
      plural: 'torr',
      symbol: 'Torr',
      system: 'metric',
      aliases: ['Torr'],
    },
    mmHg: {
      ratio: MILLIMETER_OF_MERCURY_TO_PASCAL,
      name: 'millimeter of mercury',
      plural: 'millimeters of mercury',
      symbol: 'mmHg',
      system: 'metric',
      aliases: ['mmhg'],
    },
    inHg: {
      ratio: INCH_OF_MERCURY_TO_PASCAL,
      name: 'inch of mercury',
      plural: 'inches of mercury',
      symbol: 'inHg',
      system: 'imperial',
      aliases: ['inhg'],
    },
    psi: {
      ratio: PSI_TO_PASCAL,
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
