/**
 * Pressure conversion constants (anchor: pascal).
 *
 * `<UNIT>_TO_PASCAL`: pascals = value * <UNIT>_TO_PASCAL.
 *
 * `ATMOSPHERE_TO_PASCAL` is exactly 101325 Pa (NIST §B.8). `PSI_TO_PASCAL`
 * derives from the exact pound-force / square-inch definition and is rounded
 * to 10 significant digits.
 *
 * @module
 */

// — Unit identifiers —
export const PASCAL = 'Pa' as const;
export const HECTOPASCAL = 'hPa' as const;
export const KILOPASCAL = 'kPa' as const;
export const MEGAPASCAL = 'MPa' as const;
export const GIGAPASCAL = 'GPa' as const;
export const BAR = 'bar' as const;
export const MILLIBAR = 'mbar' as const;
export const ATMOSPHERE = 'atm' as const;
export const TORR = 'torr' as const;
export const MILLIMETER_OF_MERCURY = 'mmHg' as const;
export const INCH_OF_MERCURY = 'inHg' as const;
export const PSI = 'psi' as const;

// — Conversion factors —
export const PASCAL_TO_PASCAL = 1;
export const HECTOPASCAL_TO_PASCAL = 100;
export const KILOPASCAL_TO_PASCAL = 1_000;
export const MEGAPASCAL_TO_PASCAL = 1_000_000;
export const GIGAPASCAL_TO_PASCAL = 1_000_000_000;
export const BAR_TO_PASCAL = 100_000;
export const MILLIBAR_TO_PASCAL = 100;

/** NIST §B.8 exact. */
export const ATMOSPHERE_TO_PASCAL = 101_325;
export const TORR_TO_PASCAL = 101_325 / 760;
/** CIPM 2007. */
export const MILLIMETER_OF_MERCURY_TO_PASCAL = 133.322387415;
/** 25.4 × mmHg. */
export const INCH_OF_MERCURY_TO_PASCAL = 3386.388640341;
/** NIST §B.8: lbf / in² exact then rounded. */
export const PSI_TO_PASCAL = 6894.757293168;
