/**
 * Category-name constants — string-literal exports for the 10 measurement
 * categories registered by this library.
 *
 * ```ts
 * import { LENGTH, MASS } from '@biggora/unit-converter/constants';
 * convert(5, 'm', { category: LENGTH });
 * ```
 *
 * @module
 */

export const LENGTH = 'length' as const;
export const MASS = 'mass' as const;
export const TIME = 'time' as const;
export const TEMPERATURE = 'temperature' as const;
export const VOLUME = 'volume' as const;
export const AREA = 'area' as const;
export const SPEED = 'speed' as const;
export const DATA_STORAGE = 'dataStorage' as const;
export const ANGLE = 'angle' as const;
export const PRESSURE = 'pressure' as const;
