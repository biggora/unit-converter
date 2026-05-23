/**
 * Plane-angle conversions (anchor: radian).
 *
 * Numeric factors are exported as named constants in
 * {@link ../constants/angle | src/constants/angle.ts} and re-exported below.
 *
 * @module
 */

import {
  ARCMINUTE_TO_RADIAN,
  ARCSECOND_TO_RADIAN,
  DEGREE_TO_RADIAN,
  GRADIAN_TO_RADIAN,
  MILLIRADIAN_TO_RADIAN,
  RADIAN_TO_RADIAN,
  TURN_TO_RADIAN,
} from '../constants';
import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

export * from '../constants/angle.js';

/** @internal */
export const angleCategory: CategoryDef<'angle'> = {
  name: 'angle',
  anchor: 'rad',
  units: {
    rad: {
      ratio: RADIAN_TO_RADIAN,
      name: 'radian',
      plural: 'radians',
      symbol: 'rad',
      system: 'metric',
      aliases: ['radian', 'radians'],
    },
    deg: {
      ratio: DEGREE_TO_RADIAN,
      name: 'degree',
      plural: 'degrees',
      symbol: '°',
      system: 'metric',
      aliases: ['degree', 'degrees', '°'],
    },
    gon: {
      ratio: GRADIAN_TO_RADIAN,
      name: 'gradian',
      plural: 'gradians',
      symbol: 'gon',
      system: 'metric',
      aliases: ['grad', 'grade', 'gradian', 'gradians'],
    },
    turn: {
      ratio: TURN_TO_RADIAN,
      name: 'turn',
      plural: 'turns',
      symbol: 'turn',
      system: 'metric',
      aliases: ['rev', 'revolution', 'revolutions', 'turns'],
    },
    arcmin: {
      ratio: ARCMINUTE_TO_RADIAN,
      name: 'arcminute',
      plural: 'arcminutes',
      symbol: "'",
      system: 'metric',
      aliases: ['arcminute', 'arcminutes', 'moa'],
    },
    arcsec: {
      ratio: ARCSECOND_TO_RADIAN,
      name: 'arcsecond',
      plural: 'arcseconds',
      symbol: '"',
      system: 'metric',
      aliases: ['arcsecond', 'arcseconds'],
    },
    mrad: {
      ratio: MILLIRADIAN_TO_RADIAN,
      name: 'milliradian',
      plural: 'milliradians',
      symbol: 'mrad',
      system: 'metric',
      aliases: ['milliradian', 'milliradians'],
    },
  },
};

/**
 * Convert a plane-angle value between any registered angle units.
 *
 * @example
 *   import { angle } from '@biggora/unit-converter/angle';
 *
 *   angle(180, 'deg').to('rad');     // Math.PI
 *   angle(1, 'turn').to('deg');      // 360
 *
 * @since 0.1.0
 */
export const angle = makeCategory(angleCategory);

declare module '../core/types.js' {
  interface UnitRegistry {
    angle: keyof typeof angleCategory.units;
  }
}
