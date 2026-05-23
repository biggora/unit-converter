/**
 * Length conversion constants (anchor: metre).
 *
 * Each `<UNIT>_TO_METER` constant is the multiplicative factor that converts a
 * magnitude in `<UNIT>` to metres: `meters = value * <UNIT>_TO_METER`.
 *
 * Each bare `<UNIT>` constant is the string identifier the converter accepts
 * (`length(5, METER).to(FOOT)`).
 *
 * Imperial factors are NIST SP 811 §B.8 boldface (exact). Astronomical factors
 * follow IAU 2012 nominal conversions.
 *
 * @module
 */

// — Unit identifiers —
export const METER = 'm' as const;
export const KILOMETER = 'km' as const;
export const CENTIMETER = 'cm' as const;
export const MILLIMETER = 'mm' as const;
export const MICROMETER = 'μm' as const;
export const NANOMETER = 'nm' as const;
export const ANGSTROM = 'Å' as const;
export const INCH = 'in' as const;
export const FOOT = 'ft' as const;
export const YARD = 'yd' as const;
export const MILE = 'mi' as const;
export const NAUTICAL_MILE = 'nmi' as const;
export const LIGHT_YEAR = 'ly' as const;
export const ASTRONOMICAL_UNIT = 'au' as const;
export const PARSEC = 'pc' as const;

// — Conversion factors —
export const METER_TO_METER = 1;
export const KILOMETER_TO_METER = 1_000;
export const CENTIMETER_TO_METER = 0.01;
export const MILLIMETER_TO_METER = 0.001;
export const MICROMETER_TO_METER = 1e-6;
export const NANOMETER_TO_METER = 1e-9;
export const ANGSTROM_TO_METER = 1e-10;

/** NIST SP 811 §B.8 exact. */
export const INCH_TO_METER = 0.0254;
/** NIST SP 811 §B.8 exact. */
export const FOOT_TO_METER = 0.3048;
/** NIST SP 811 §B.8 exact. */
export const YARD_TO_METER = 0.9144;
/** NIST SP 811 §B.8 exact. */
export const MILE_TO_METER = 1609.344;
/** NIST SP 811 §B.9 exact. */
export const NAUTICAL_MILE_TO_METER = 1852;

/** IAU 2012: c × Julian-year. */
export const LIGHT_YEAR_TO_METER = 9.4607304725808e15;
/** IAU 2012 exact. */
export const ASTRONOMICAL_UNIT_TO_METER = 1.495978707e11;
/**
 * Parsec literal exceeds float64 mantissa precision — the runtime value is the
 * nearest representable double (≈ 3.085677581491367e16). Accepted as the
 * canonical encoding of this astronomical constant.
 */
// biome-ignore lint/correctness/noPrecisionLoss: documented IEEE-754 limit
export const PARSEC_TO_METER = 3.0856775814913673e16;
