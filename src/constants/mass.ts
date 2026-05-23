/**
 * Mass conversion constants (anchor: kilogram).
 *
 * `<UNIT>_TO_KILOGRAM`: kilograms = value * <UNIT>_TO_KILOGRAM.
 *
 * Imperial / avoirdupois factors are NIST SP 811 §B.8 boldface (exact).
 *
 * @module
 */

// — Unit identifiers —
export const KILOGRAM = 'kg' as const;
export const GRAM = 'g' as const;
export const MILLIGRAM = 'mg' as const;
export const MICROGRAM = 'μg' as const;
export const TONNE = 't' as const;
export const POUND = 'lb' as const;
export const OUNCE = 'oz' as const;
export const STONE = 'st' as const;
export const SHORT_TON = 'ton' as const;
export const LONG_TON = 'long-ton' as const;
export const GRAIN = 'gr' as const;
export const CARAT = 'ct' as const;

// — Conversion factors —
export const KILOGRAM_TO_KILOGRAM = 1;
export const GRAM_TO_KILOGRAM = 0.001;
export const MILLIGRAM_TO_KILOGRAM = 1e-6;
export const MICROGRAM_TO_KILOGRAM = 1e-9;
export const TONNE_TO_KILOGRAM = 1_000;

/** NIST SP 811 §B.8 exact. */
export const POUND_TO_KILOGRAM = 0.45359237;
/** = lb / 16, exact. */
export const OUNCE_TO_KILOGRAM = 0.028349523125;
/** = 14 * lb, exact. */
export const STONE_TO_KILOGRAM = 6.35029318;
/** US short ton = 2000 lb, exact. */
export const SHORT_TON_TO_KILOGRAM = 907.18474;
/** UK long ton = 2240 lb, exact. */
export const LONG_TON_TO_KILOGRAM = 1016.0469088;
/** NIST: grain = 64.79891 mg, exact. */
export const GRAIN_TO_KILOGRAM = 0.00006479891;
/** Metric carat = 200 mg, exact. */
export const CARAT_TO_KILOGRAM = 0.0002;
