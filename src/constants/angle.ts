/**
 * Plane-angle conversion constants (anchor: radian).
 *
 * `<UNIT>_TO_RADIAN`: radians = value * <UNIT>_TO_RADIAN.
 *
 * @module
 */

const PI = Math.PI;

// — Unit identifiers —
export const RADIAN = 'rad' as const;
export const DEGREE = 'deg' as const;
export const GRADIAN = 'gon' as const;
export const TURN = 'turn' as const;
export const ARCMINUTE = 'arcmin' as const;
export const ARCSECOND = 'arcsec' as const;
export const MILLIRADIAN = 'mrad' as const;

// — Conversion factors —
export const RADIAN_TO_RADIAN = 1;
export const DEGREE_TO_RADIAN = PI / 180;
export const GRADIAN_TO_RADIAN = PI / 200;
export const TURN_TO_RADIAN = 2 * PI;
export const ARCMINUTE_TO_RADIAN = PI / (180 * 60);
export const ARCSECOND_TO_RADIAN = PI / (180 * 3600);
export const MILLIRADIAN_TO_RADIAN = 1e-3;
