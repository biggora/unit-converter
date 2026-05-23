/**
 * Volume conversion constants (anchor: cubic metre).
 *
 * `<UNIT>_TO_CUBIC_METER`: cubic metres = value * <UNIT>_TO_CUBIC_METER.
 *
 * US customary factors are NIST SP 811 §B.8 boldface (exact). Imperial factors
 * derive from the exact `imp-gal = 4.54609 L` definition.
 *
 * @module
 */

export const CUBIC_METER_TO_CUBIC_METER = 1;
export const LITER_TO_CUBIC_METER = 1e-3;
export const MILLILITER_TO_CUBIC_METER = 1e-6;
export const CUBIC_CENTIMETER_TO_CUBIC_METER = 1e-6;
export const CUBIC_MILLIMETER_TO_CUBIC_METER = 1e-9;
export const CUBIC_KILOMETER_TO_CUBIC_METER = 1e9;

/** NIST §B.8 exact. */
export const US_GALLON_TO_CUBIC_METER = 0.003785411784;
export const US_QUART_TO_CUBIC_METER = 0.000946352946;
export const US_PINT_TO_CUBIC_METER = 0.000473176473;
export const US_CUP_TO_CUBIC_METER = 0.0002365882365;
export const US_FLUID_OUNCE_TO_CUBIC_METER = 0.0000295735295625;
export const US_TABLESPOON_TO_CUBIC_METER = 0.00001478676478125;
export const US_TEASPOON_TO_CUBIC_METER = 0.000004928921593749999;

/** Imperial gallon = 4.54609 L exact. */
export const IMPERIAL_GALLON_TO_CUBIC_METER = 0.00454609;
export const IMPERIAL_PINT_TO_CUBIC_METER = 0.00056826125;
export const IMPERIAL_FLUID_OUNCE_TO_CUBIC_METER = 0.0000284130625;

/** = 0.0254³ exact. */
export const CUBIC_INCH_TO_CUBIC_METER = 0.000016387064;
/** = 0.3048³ exact. */
export const CUBIC_FOOT_TO_CUBIC_METER = 0.028316846592;
/** = 0.9144³ exact. */
export const CUBIC_YARD_TO_CUBIC_METER = 0.764554857984;
