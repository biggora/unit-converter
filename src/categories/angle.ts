/**
 * Plane-angle conversions (anchor: radian).
 *
 * @module
 */

import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

const PI = Math.PI;

/** @internal */
export const angleCategory: CategoryDef<'angle'> = {
  name: 'angle',
  anchor: 'rad',
  units: {
    rad: {
      ratio: 1,
      name: 'radian',
      plural: 'radians',
      symbol: 'rad',
      system: 'metric',
      aliases: ['radian', 'radians'],
    },
    deg: {
      ratio: PI / 180,
      name: 'degree',
      plural: 'degrees',
      symbol: '°',
      system: 'metric',
      aliases: ['degree', 'degrees', '°'],
    },
    gon: {
      ratio: PI / 200,
      name: 'gradian',
      plural: 'gradians',
      symbol: 'gon',
      system: 'metric',
      aliases: ['grad', 'grade', 'gradian', 'gradians'],
    },
    turn: {
      ratio: 2 * PI,
      name: 'turn',
      plural: 'turns',
      symbol: 'turn',
      system: 'metric',
      aliases: ['rev', 'revolution', 'revolutions', 'turns'],
    },
    arcmin: {
      ratio: PI / (180 * 60),
      name: 'arcminute',
      plural: 'arcminutes',
      symbol: "'",
      system: 'metric',
      aliases: ['arcminute', 'arcminutes', 'moa'],
    },
    arcsec: {
      ratio: PI / (180 * 3600),
      name: 'arcsecond',
      plural: 'arcseconds',
      symbol: '"',
      system: 'metric',
      aliases: ['arcsecond', 'arcseconds'],
    },
    mrad: {
      ratio: 1e-3,
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
 *   import { angle } from 'unit-converter/angle';
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
