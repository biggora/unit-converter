/**
 * Speed / velocity conversions (anchor: metre per second).
 *
 * @module
 */

import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

/** @internal */
export const speedCategory: CategoryDef<'speed'> = {
  name: 'speed',
  anchor: 'm/s',
  units: {
    'm/s': {
      ratio: 1,
      name: 'meter per second',
      plural: 'meters per second',
      symbol: 'm/s',
      system: 'metric',
      aliases: ['mps', 'meterspersecond'],
    },
    'km/h': {
      ratio: 1 / 3.6, // 1000 / 3600 = 5/18
      name: 'kilometer per hour',
      plural: 'kilometers per hour',
      symbol: 'km/h',
      system: 'metric',
      aliases: ['kph', 'kmh', 'kmph'],
    },
    mph: {
      ratio: 0.44704, // 1609.344 / 3600 exact
      name: 'mile per hour',
      plural: 'miles per hour',
      symbol: 'mph',
      system: 'imperial',
      aliases: ['mileperhour', 'milesperhour'],
    },
    kn: {
      ratio: 1852 / 3600, // nautical-mile / hour, exact ratio definition
      name: 'knot',
      plural: 'knots',
      symbol: 'kn',
      system: 'imperial',
      aliases: ['knot', 'knots', 'kt'],
    },
    'ft/s': {
      ratio: 0.3048, // NIST B.8 exact
      name: 'foot per second',
      plural: 'feet per second',
      symbol: 'ft/s',
      system: 'imperial',
      aliases: ['fps', 'ftps'],
    },
    'in/s': {
      ratio: 0.0254, // NIST B.8 exact
      name: 'inch per second',
      plural: 'inches per second',
      symbol: 'in/s',
      system: 'imperial',
      aliases: ['ips', 'inps'],
    },
    mach: {
      ratio: 340.29, // Mach 1 at 15 °C sea level (ISO 2533)
      name: 'mach',
      symbol: 'Ma',
      system: 'metric',
      aliases: ['ma'],
    },
    c: {
      ratio: 299_792_458, // speed of light in vacuum, exact (SI)
      name: 'speed of light',
      symbol: 'c',
      system: 'metric',
      aliases: ['lightspeed', 'speedoflight'],
    },
  },
};

/**
 * Convert a speed value between any registered speed units.
 *
 * @example
 *   import { speed } from 'unit-converter/speed';
 *
 *   speed(100, 'km/h').to('mph');   // 62.1371...
 *   speed(1, 'mach').to('km/h');    // 1225.044
 *
 * @since 0.1.0
 */
export const speed = makeCategory(speedCategory);

declare module '../core/types.js' {
  interface UnitRegistry {
    speed: keyof typeof speedCategory.units;
  }
}
