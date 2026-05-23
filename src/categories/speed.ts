/**
 * Speed / velocity conversions (anchor: metre per second).
 *
 * Numeric factors are exported as named constants in
 * {@link ../constants/speed | src/constants/speed.ts} and re-exported below.
 *
 * @module
 */

import { SPEED } from '../constants';
import {
  FOOT_PER_SECOND,
  FOOT_PER_SECOND_TO_METER_PER_SECOND,
  INCH_PER_SECOND,
  INCH_PER_SECOND_TO_METER_PER_SECOND,
  KILOMETER_PER_HOUR,
  KILOMETER_PER_HOUR_TO_METER_PER_SECOND,
  KNOT,
  KNOT_TO_METER_PER_SECOND,
  MACH,
  MACH_TO_METER_PER_SECOND,
  METER_PER_SECOND,
  METER_PER_SECOND_TO_METER_PER_SECOND,
  MILE_PER_HOUR,
  MILE_PER_HOUR_TO_METER_PER_SECOND,
  SPEED_OF_LIGHT,
  SPEED_OF_LIGHT_TO_METER_PER_SECOND,
} from '../constants';
import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

export * from '../constants/speed.js';

/** @internal */
export const speedCategory: CategoryDef<typeof SPEED> = {
  name: SPEED,
  anchor: METER_PER_SECOND,
  units: {
    [METER_PER_SECOND]: {
      ratio: METER_PER_SECOND_TO_METER_PER_SECOND,
      name: 'meter per second',
      plural: 'meters per second',
      symbol: 'm/s',
      system: 'metric',
      aliases: ['mps', 'meterspersecond'],
    },
    [KILOMETER_PER_HOUR]: {
      ratio: KILOMETER_PER_HOUR_TO_METER_PER_SECOND,
      name: 'kilometer per hour',
      plural: 'kilometers per hour',
      symbol: 'km/h',
      system: 'metric',
      aliases: ['kph', 'kmh', 'kmph'],
    },
    [MILE_PER_HOUR]: {
      ratio: MILE_PER_HOUR_TO_METER_PER_SECOND,
      name: 'mile per hour',
      plural: 'miles per hour',
      symbol: 'mph',
      system: 'imperial',
      aliases: ['mileperhour', 'milesperhour'],
    },
    [KNOT]: {
      ratio: KNOT_TO_METER_PER_SECOND,
      name: 'knot',
      plural: 'knots',
      symbol: 'kn',
      system: 'imperial',
      aliases: ['knot', 'knots', 'kt'],
    },
    [FOOT_PER_SECOND]: {
      ratio: FOOT_PER_SECOND_TO_METER_PER_SECOND,
      name: 'foot per second',
      plural: 'feet per second',
      symbol: 'ft/s',
      system: 'imperial',
      aliases: ['fps', 'ftps'],
    },
    [INCH_PER_SECOND]: {
      ratio: INCH_PER_SECOND_TO_METER_PER_SECOND,
      name: 'inch per second',
      plural: 'inches per second',
      symbol: 'in/s',
      system: 'imperial',
      aliases: ['ips', 'inps'],
    },
    [MACH]: {
      ratio: MACH_TO_METER_PER_SECOND,
      name: 'mach',
      symbol: 'Ma',
      system: 'metric',
      aliases: ['ma'],
    },
    [SPEED_OF_LIGHT]: {
      ratio: SPEED_OF_LIGHT_TO_METER_PER_SECOND,
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
 *   import { speed } from '@biggora/unit-converter/speed';
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
