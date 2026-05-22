/**
 * Digital data storage (anchor: byte).
 *
 * Decimal-prefixed (`KB`, `MB`, …) and binary-prefixed (`KiB`, `MiB`, …) units
 * follow IEC 80000-13. Every byte-aligned unit carries an integer
 * `bigintRatio`, enabling exact BigInt math. `bit` is byte/8 and therefore
 * number-only.
 *
 * @module
 */

import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

/** @internal */
export const dataStorageCategory: CategoryDef<'dataStorage'> = {
  name: 'dataStorage',
  anchor: 'B',
  units: {
    B: {
      ratio: 1,
      bigintRatio: 1n,
      name: 'byte',
      plural: 'bytes',
      symbol: 'B',
      system: 'metric',
      aliases: ['byte', 'bytes'],
    },
    KB: {
      ratio: 1e3,
      bigintRatio: 1_000n,
      name: 'kilobyte',
      plural: 'kilobytes',
      symbol: 'kB',
      system: 'metric',
      aliases: ['kb', 'kilobyte', 'kilobytes'],
    },
    MB: {
      ratio: 1e6,
      bigintRatio: 1_000_000n,
      name: 'megabyte',
      plural: 'megabytes',
      symbol: 'MB',
      system: 'metric',
      aliases: ['mb', 'megabyte', 'megabytes'],
    },
    GB: {
      ratio: 1e9,
      bigintRatio: 1_000_000_000n,
      name: 'gigabyte',
      plural: 'gigabytes',
      symbol: 'GB',
      system: 'metric',
      aliases: ['gb', 'gigabyte', 'gigabytes'],
    },
    TB: {
      ratio: 1e12,
      bigintRatio: 1_000_000_000_000n,
      name: 'terabyte',
      plural: 'terabytes',
      symbol: 'TB',
      system: 'metric',
      aliases: ['tb', 'terabyte', 'terabytes'],
    },
    PB: {
      ratio: 1e15,
      bigintRatio: 1_000_000_000_000_000n,
      name: 'petabyte',
      plural: 'petabytes',
      symbol: 'PB',
      system: 'metric',
      aliases: ['pb', 'petabyte', 'petabytes'],
    },
    KiB: {
      ratio: 1_024,
      bigintRatio: 1_024n,
      name: 'kibibyte',
      plural: 'kibibytes',
      symbol: 'KiB',
      system: 'metric',
      aliases: ['kib', 'kibibyte', 'kibibytes'],
    },
    MiB: {
      ratio: 1_048_576,
      bigintRatio: 1_048_576n,
      name: 'mebibyte',
      plural: 'mebibytes',
      symbol: 'MiB',
      system: 'metric',
      aliases: ['mib', 'mebibyte', 'mebibytes'],
    },
    GiB: {
      ratio: 1_073_741_824,
      bigintRatio: 1_073_741_824n,
      name: 'gibibyte',
      plural: 'gibibytes',
      symbol: 'GiB',
      system: 'metric',
      aliases: ['gib', 'gibibyte', 'gibibytes'],
    },
    TiB: {
      ratio: 1_099_511_627_776,
      bigintRatio: 1_099_511_627_776n,
      name: 'tebibyte',
      plural: 'tebibytes',
      symbol: 'TiB',
      system: 'metric',
      aliases: ['tib', 'tebibyte', 'tebibytes'],
    },
    PiB: {
      ratio: 1.125899906842624e15,
      bigintRatio: 1_125_899_906_842_624n,
      name: 'pebibyte',
      plural: 'pebibytes',
      symbol: 'PiB',
      system: 'metric',
      aliases: ['pib', 'pebibyte', 'pebibytes'],
    },
    bit: {
      ratio: 0.125,
      name: 'bit',
      plural: 'bits',
      symbol: 'b',
      system: 'metric',
      aliases: ['b', 'bits'],
    },
  },
};

/**
 * Convert a digital-storage value between any registered storage units.
 *
 * Byte-aligned conversions support BigInt arithmetic — exact even at petabyte
 * scale.
 *
 * @example
 *   import { dataStorage } from 'unit-converter/data-storage';
 *
 *   dataStorage(1, 'GiB').to('MiB');                 // 1024
 *   dataStorage.bigint(1n, 'TiB').to('B');           // 1099511627776n
 *
 * @since 0.1.0
 */
export const dataStorage = makeCategory(dataStorageCategory);

declare module '../core/types.js' {
  interface UnitRegistry {
    dataStorage: keyof typeof dataStorageCategory.units;
  }
}
