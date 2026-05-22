/**
 * Temperature conversions (anchor: kelvin).
 *
 * All four scales are affine — `value * ratio + offset = K`. Concrete formulas:
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

import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

/** @internal */
export const temperatureCategory: CategoryDef<'temperature'> = {
  name: 'temperature',
  anchor: 'K',
  units: {
    K: {
      ratio: 1,
      offset: 0,
      name: 'kelvin',
      plural: 'kelvins',
      symbol: 'K',
      system: 'metric',
      aliases: ['kelvin', 'kelvins'],
    },
    C: {
      ratio: 1,
      offset: 273.15,
      name: 'celsius',
      plural: 'celsius',
      symbol: '°C',
      system: 'metric',
      aliases: ['celsius', '°c', 'degc', '°C'],
    },
    F: {
      ratio: 5 / 9,
      offset: (459.67 * 5) / 9,
      name: 'fahrenheit',
      plural: 'fahrenheit',
      symbol: '°F',
      system: 'imperial',
      aliases: ['fahrenheit', '°f', 'degf', '°F'],
    },
    R: {
      ratio: 5 / 9,
      offset: 0,
      name: 'rankine',
      plural: 'rankine',
      symbol: '°R',
      system: 'imperial',
      aliases: ['rankine', '°r', 'degr', '°R'],
    },
  },
};

/**
 * Convert a temperature value between Kelvin, Celsius, Fahrenheit and Rankine.
 *
 * @example
 *   import { temperature } from '@biggora/unit-converter/temperature';
 *
 *   temperature(0, 'C').to('K');     // 273.15
 *   temperature(32, 'F').to('C');    // 0
 *   temperature(100, 'C').to('F');   // 212
 *
 * @since 0.1.0
 */
export const temperature = makeCategory(temperatureCategory);

declare module '../core/types.js' {
  interface UnitRegistry {
    temperature: keyof typeof temperatureCategory.units;
  }
}
