/**
 * Temperature conversion constants (anchor: kelvin).
 *
 * All four scales are affine — `K = value * <UNIT>_TO_KELVIN_RATIO + <UNIT>_TO_KELVIN_OFFSET`.
 *
 * ```
 *   K = K * 1     + 0
 *   K = °C * 1    + 273.15
 *   K = °F * 5/9  + 459.67 * 5/9
 *   K = °R * 5/9  + 0
 * ```
 *
 * @module
 */

export const KELVIN_TO_KELVIN_RATIO = 1;
export const KELVIN_TO_KELVIN_OFFSET = 0;

export const CELSIUS_TO_KELVIN_RATIO = 1;
export const CELSIUS_TO_KELVIN_OFFSET = 273.15;

export const FAHRENHEIT_TO_KELVIN_RATIO = 5 / 9;
export const FAHRENHEIT_TO_KELVIN_OFFSET = (459.67 * 5) / 9;

export const RANKINE_TO_KELVIN_RATIO = 5 / 9;
export const RANKINE_TO_KELVIN_OFFSET = 0;
