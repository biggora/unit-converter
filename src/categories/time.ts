/**
 * Time conversions (anchor: second).
 *
 * Numeric factors are exported as named constants in
 * {@link ../constants/time | src/constants/time.ts} and re-exported below.
 *
 * Units `ns`-through-`week` carry integer `bigintRatio`s expressed in
 * nanoseconds, enabling exact BigInt conversions. `month` and `year` use the
 * Julian conventions (30.4375 days / 365.25 days) and are number-only.
 *
 * @module
 */

import {
  DAY_TO_NANOSECOND_BIGINT,
  DAY_TO_SECOND,
  HOUR_TO_NANOSECOND_BIGINT,
  HOUR_TO_SECOND,
  MICROSECOND_TO_NANOSECOND_BIGINT,
  MICROSECOND_TO_SECOND,
  MILLISECOND_TO_NANOSECOND_BIGINT,
  MILLISECOND_TO_SECOND,
  MINUTE_TO_NANOSECOND_BIGINT,
  MINUTE_TO_SECOND,
  MONTH_TO_SECOND,
  NANOSECOND_TO_NANOSECOND_BIGINT,
  NANOSECOND_TO_SECOND,
  SECOND_TO_NANOSECOND_BIGINT,
  SECOND_TO_SECOND,
  WEEK_TO_NANOSECOND_BIGINT,
  WEEK_TO_SECOND,
  YEAR_TO_SECOND,
} from '../constants';
import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

export * from '../constants/time.js';

/** @internal */
export const timeCategory: CategoryDef<'time'> = {
  name: 'time',
  anchor: 's',
  units: {
    ns: {
      ratio: NANOSECOND_TO_SECOND,
      bigintRatio: NANOSECOND_TO_NANOSECOND_BIGINT,
      name: 'nanosecond',
      plural: 'nanoseconds',
      symbol: 'ns',
      system: 'metric',
      aliases: ['nanosecond', 'nanoseconds'],
    },
    μs: {
      ratio: MICROSECOND_TO_SECOND,
      bigintRatio: MICROSECOND_TO_NANOSECOND_BIGINT,
      name: 'microsecond',
      plural: 'microseconds',
      symbol: 'μs',
      system: 'metric',
      aliases: ['us', 'microsecond', 'microseconds'],
    },
    ms: {
      ratio: MILLISECOND_TO_SECOND,
      bigintRatio: MILLISECOND_TO_NANOSECOND_BIGINT,
      name: 'millisecond',
      plural: 'milliseconds',
      symbol: 'ms',
      system: 'metric',
      aliases: ['millisecond', 'milliseconds'],
    },
    s: {
      ratio: SECOND_TO_SECOND,
      bigintRatio: SECOND_TO_NANOSECOND_BIGINT,
      name: 'second',
      plural: 'seconds',
      symbol: 's',
      system: 'metric',
      aliases: ['sec', 'secs', 'second', 'seconds'],
    },
    min: {
      ratio: MINUTE_TO_SECOND,
      bigintRatio: MINUTE_TO_NANOSECOND_BIGINT,
      name: 'minute',
      plural: 'minutes',
      symbol: 'min',
      system: 'metric',
      aliases: ['minute', 'minutes'],
    },
    h: {
      ratio: HOUR_TO_SECOND,
      bigintRatio: HOUR_TO_NANOSECOND_BIGINT,
      name: 'hour',
      plural: 'hours',
      symbol: 'h',
      system: 'metric',
      aliases: ['hr', 'hrs', 'hour', 'hours'],
    },
    d: {
      ratio: DAY_TO_SECOND,
      bigintRatio: DAY_TO_NANOSECOND_BIGINT,
      name: 'day',
      plural: 'days',
      symbol: 'd',
      system: 'metric',
      aliases: ['day', 'days'],
    },
    week: {
      ratio: WEEK_TO_SECOND,
      bigintRatio: WEEK_TO_NANOSECOND_BIGINT,
      name: 'week',
      plural: 'weeks',
      symbol: 'wk',
      system: 'metric',
      aliases: ['wk', 'weeks'],
    },
    month: {
      ratio: MONTH_TO_SECOND,
      name: 'month',
      plural: 'months',
      symbol: 'mo',
      system: 'metric',
      aliases: ['mo', 'months'],
    },
    year: {
      ratio: YEAR_TO_SECOND,
      name: 'year',
      plural: 'years',
      symbol: 'yr',
      system: 'metric',
      aliases: ['yr', 'years', 'a'],
    },
  },
};

/**
 * Convert a time value between any registered time units.
 *
 * Integer-aligned conversions (ns..week) support BigInt arithmetic via
 * `time.bigint(20n, 'h').to('ms')`.
 *
 * @example
 *   import { time } from '@biggora/unit-converter/time';
 *
 *   time(2, 'h').to('s');            // 7200
 *   time.bigint(20n, 'h').to('ms');  // 72000000n  (exact)
 *   time.bigint(1n, 'd').to('s');    // 86400n
 *
 * @since 0.1.0
 */
export const time = makeCategory(timeCategory);

declare module '../core/types.js' {
  interface UnitRegistry {
    time: keyof typeof timeCategory.units;
  }
}
