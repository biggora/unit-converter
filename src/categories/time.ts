/**
 * Time conversions (anchor: second).
 *
 * Units `ns`-through-`week` carry integer `bigintRatio`s expressed in
 * nanoseconds, enabling exact BigInt conversions. `month` and `year` use the
 * Julian conventions (30.4375 days / 365.25 days) and are number-only.
 *
 * @module
 */

import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

/** @internal */
export const timeCategory: CategoryDef<'time'> = {
  name: 'time',
  anchor: 's',
  units: {
    ns: {
      ratio: 1e-9,
      bigintRatio: 1n,
      name: 'nanosecond',
      plural: 'nanoseconds',
      symbol: 'ns',
      system: 'metric',
      aliases: ['nanosecond', 'nanoseconds'],
    },
    μs: {
      ratio: 1e-6,
      bigintRatio: 1_000n,
      name: 'microsecond',
      plural: 'microseconds',
      symbol: 'μs',
      system: 'metric',
      aliases: ['us', 'microsecond', 'microseconds'],
    },
    ms: {
      ratio: 1e-3,
      bigintRatio: 1_000_000n,
      name: 'millisecond',
      plural: 'milliseconds',
      symbol: 'ms',
      system: 'metric',
      aliases: ['millisecond', 'milliseconds'],
    },
    s: {
      ratio: 1,
      bigintRatio: 1_000_000_000n,
      name: 'second',
      plural: 'seconds',
      symbol: 's',
      system: 'metric',
      aliases: ['sec', 'secs', 'second', 'seconds'],
    },
    min: {
      ratio: 60,
      bigintRatio: 60_000_000_000n,
      name: 'minute',
      plural: 'minutes',
      symbol: 'min',
      system: 'metric',
      aliases: ['minute', 'minutes'],
    },
    h: {
      ratio: 3_600,
      bigintRatio: 3_600_000_000_000n,
      name: 'hour',
      plural: 'hours',
      symbol: 'h',
      system: 'metric',
      aliases: ['hr', 'hrs', 'hour', 'hours'],
    },
    d: {
      ratio: 86_400,
      bigintRatio: 86_400_000_000_000n,
      name: 'day',
      plural: 'days',
      symbol: 'd',
      system: 'metric',
      aliases: ['day', 'days'],
    },
    week: {
      ratio: 604_800,
      bigintRatio: 604_800_000_000_000n,
      name: 'week',
      plural: 'weeks',
      symbol: 'wk',
      system: 'metric',
      aliases: ['wk', 'weeks'],
    },
    month: {
      ratio: 2_629_746, // average Julian month (365.25 / 12 days)
      name: 'month',
      plural: 'months',
      symbol: 'mo',
      system: 'metric',
      aliases: ['mo', 'months'],
    },
    year: {
      ratio: 31_557_600, // Julian year = 365.25 days
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
 *   import { time } from 'unit-converter/time';
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
