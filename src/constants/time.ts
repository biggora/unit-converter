/**
 * Time conversion constants (anchor: second).
 *
 * `<UNIT>_TO_SECOND`: float seconds = value * <UNIT>_TO_SECOND.
 *
 * BigInt-safe units (nanosecond..week) additionally expose a
 * `<UNIT>_TO_NANOSECOND_BIGINT` constant. The internal BigInt scale is the
 * nanosecond (not the second) so that all integer-aligned conversions stay
 * exact at the smallest representable unit. Float `*_TO_SECOND` and bigint
 * `*_TO_NANOSECOND_BIGINT` therefore differ by 10⁹.
 *
 * `month` and `year` use Julian conventions (30.4375 days / 365.25 days) and
 * are float-only — they cannot participate in exact BigInt arithmetic.
 *
 * @module
 */

// — Unit identifiers —
export const NANOSECOND = 'ns' as const;
export const MICROSECOND = 'μs' as const;
export const MILLISECOND = 'ms' as const;
export const SECOND = 's' as const;
export const MINUTE = 'min' as const;
export const HOUR = 'h' as const;
export const DAY = 'd' as const;
export const WEEK = 'week' as const;
export const MONTH = 'month' as const;
export const YEAR = 'year' as const;

// — Conversion factors —
export const NANOSECOND_TO_SECOND = 1e-9;
export const NANOSECOND_TO_NANOSECOND_BIGINT = 1n;

export const MICROSECOND_TO_SECOND = 1e-6;
export const MICROSECOND_TO_NANOSECOND_BIGINT = 1_000n;

export const MILLISECOND_TO_SECOND = 1e-3;
export const MILLISECOND_TO_NANOSECOND_BIGINT = 1_000_000n;

export const SECOND_TO_SECOND = 1;
export const SECOND_TO_NANOSECOND_BIGINT = 1_000_000_000n;

export const MINUTE_TO_SECOND = 60;
export const MINUTE_TO_NANOSECOND_BIGINT = 60_000_000_000n;

export const HOUR_TO_SECOND = 3_600;
export const HOUR_TO_NANOSECOND_BIGINT = 3_600_000_000_000n;

export const DAY_TO_SECOND = 86_400;
export const DAY_TO_NANOSECOND_BIGINT = 86_400_000_000_000n;

export const WEEK_TO_SECOND = 604_800;
export const WEEK_TO_NANOSECOND_BIGINT = 604_800_000_000_000n;

/** Average Julian month = 365.25 / 12 days. */
export const MONTH_TO_SECOND = 2_629_746;
/** Julian year = 365.25 days. */
export const YEAR_TO_SECOND = 31_557_600;
