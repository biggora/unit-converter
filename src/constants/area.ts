/**
 * Area conversion constants (anchor: square metre).
 *
 * `<UNIT>_TO_SQUARE_METER`: square metres = value * <UNIT>_TO_SQUARE_METER.
 *
 * Imperial squared factors are derived from the exact NIST §B.8 length values
 * (e.g. `SQUARE_FOOT_TO_SQUARE_METER = 0.3048²`).
 *
 * @module
 */

export const SQUARE_METER_TO_SQUARE_METER = 1;
export const SQUARE_CENTIMETER_TO_SQUARE_METER = 1e-4;
export const SQUARE_MILLIMETER_TO_SQUARE_METER = 1e-6;
export const SQUARE_KILOMETER_TO_SQUARE_METER = 1e6;
export const HECTARE_TO_SQUARE_METER = 10_000;
export const ARE_TO_SQUARE_METER = 100;

/** = 0.0254² exact. */
export const SQUARE_INCH_TO_SQUARE_METER = 0.00064516;
/** = 0.3048² exact. */
export const SQUARE_FOOT_TO_SQUARE_METER = 0.09290304;
/** = 0.9144² exact. */
export const SQUARE_YARD_TO_SQUARE_METER = 0.83612736;
/** = 1609.344² exact. */
export const SQUARE_MILE_TO_SQUARE_METER = 2_589_988.110336;
/** = 4840 * yd² exact. */
export const ACRE_TO_SQUARE_METER = 4_046.8564224;
