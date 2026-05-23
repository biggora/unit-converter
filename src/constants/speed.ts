/**
 * Speed / velocity conversion constants (anchor: metre per second).
 *
 * `<UNIT>_TO_METER_PER_SECOND`: m/s = value * <UNIT>_TO_METER_PER_SECOND.
 *
 * @module
 */

export const METER_PER_SECOND_TO_METER_PER_SECOND = 1;
/** 1000 / 3600 = 5/18. */
export const KILOMETER_PER_HOUR_TO_METER_PER_SECOND = 1 / 3.6;
/** 1609.344 / 3600 exact. */
export const MILE_PER_HOUR_TO_METER_PER_SECOND = 0.44704;
/** Nautical-mile / hour, exact ratio definition. */
export const KNOT_TO_METER_PER_SECOND = 1852 / 3600;
/** NIST §B.8 exact. */
export const FOOT_PER_SECOND_TO_METER_PER_SECOND = 0.3048;
/** NIST §B.8 exact. */
export const INCH_PER_SECOND_TO_METER_PER_SECOND = 0.0254;
/** Mach 1 at 15 °C sea level (ISO 2533). */
export const MACH_TO_METER_PER_SECOND = 340.29;
/** Speed of light in vacuum, exact (SI). */
export const SPEED_OF_LIGHT_TO_METER_PER_SECOND = 299_792_458;
