/**
 * Digital data storage (anchor: byte).
 *
 * Numeric factors are exported as named constants in
 * {@link ../constants/data-storage | src/constants/data-storage.ts} and
 * re-exported below.
 *
 * Decimal-prefixed (`KB`, `MB`, …) and binary-prefixed (`KiB`, `MiB`, …) units
 * follow IEC 80000-13. Every byte-aligned unit carries an integer
 * `bigintRatio`, enabling exact BigInt math. `bit` is byte/8 and therefore
 * number-only.
 *
 * @module
 */

import {
  BIT_TO_BYTE,
  BYTE_TO_BYTE,
  BYTE_TO_BYTE_BIGINT,
  GIBIBYTE_TO_BYTE,
  GIBIBYTE_TO_BYTE_BIGINT,
  GIGABYTE_TO_BYTE,
  GIGABYTE_TO_BYTE_BIGINT,
  KIBIBYTE_TO_BYTE,
  KIBIBYTE_TO_BYTE_BIGINT,
  KILOBYTE_TO_BYTE,
  KILOBYTE_TO_BYTE_BIGINT,
  MEBIBYTE_TO_BYTE,
  MEBIBYTE_TO_BYTE_BIGINT,
  MEGABYTE_TO_BYTE,
  MEGABYTE_TO_BYTE_BIGINT,
  PEBIBYTE_TO_BYTE,
  PEBIBYTE_TO_BYTE_BIGINT,
  PETABYTE_TO_BYTE,
  PETABYTE_TO_BYTE_BIGINT,
  TEBIBYTE_TO_BYTE,
  TEBIBYTE_TO_BYTE_BIGINT,
  TERABYTE_TO_BYTE,
  TERABYTE_TO_BYTE_BIGINT,
} from '../constants';
import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

export * from '../constants/data-storage.js';

/** @internal */
export const dataStorageCategory: CategoryDef<'dataStorage'> = {
  name: 'dataStorage',
  anchor: 'B',
  units: {
    B: {
      ratio: BYTE_TO_BYTE,
      bigintRatio: BYTE_TO_BYTE_BIGINT,
      name: 'byte',
      plural: 'bytes',
      symbol: 'B',
      system: 'metric',
      aliases: ['byte', 'bytes'],
    },
    KB: {
      ratio: KILOBYTE_TO_BYTE,
      bigintRatio: KILOBYTE_TO_BYTE_BIGINT,
      name: 'kilobyte',
      plural: 'kilobytes',
      symbol: 'kB',
      system: 'metric',
      aliases: ['kb', 'kilobyte', 'kilobytes'],
    },
    MB: {
      ratio: MEGABYTE_TO_BYTE,
      bigintRatio: MEGABYTE_TO_BYTE_BIGINT,
      name: 'megabyte',
      plural: 'megabytes',
      symbol: 'MB',
      system: 'metric',
      aliases: ['mb', 'megabyte', 'megabytes'],
    },
    GB: {
      ratio: GIGABYTE_TO_BYTE,
      bigintRatio: GIGABYTE_TO_BYTE_BIGINT,
      name: 'gigabyte',
      plural: 'gigabytes',
      symbol: 'GB',
      system: 'metric',
      aliases: ['gb', 'gigabyte', 'gigabytes'],
    },
    TB: {
      ratio: TERABYTE_TO_BYTE,
      bigintRatio: TERABYTE_TO_BYTE_BIGINT,
      name: 'terabyte',
      plural: 'terabytes',
      symbol: 'TB',
      system: 'metric',
      aliases: ['tb', 'terabyte', 'terabytes'],
    },
    PB: {
      ratio: PETABYTE_TO_BYTE,
      bigintRatio: PETABYTE_TO_BYTE_BIGINT,
      name: 'petabyte',
      plural: 'petabytes',
      symbol: 'PB',
      system: 'metric',
      aliases: ['pb', 'petabyte', 'petabytes'],
    },
    KiB: {
      ratio: KIBIBYTE_TO_BYTE,
      bigintRatio: KIBIBYTE_TO_BYTE_BIGINT,
      name: 'kibibyte',
      plural: 'kibibytes',
      symbol: 'KiB',
      system: 'metric',
      aliases: ['kib', 'kibibyte', 'kibibytes'],
    },
    MiB: {
      ratio: MEBIBYTE_TO_BYTE,
      bigintRatio: MEBIBYTE_TO_BYTE_BIGINT,
      name: 'mebibyte',
      plural: 'mebibytes',
      symbol: 'MiB',
      system: 'metric',
      aliases: ['mib', 'mebibyte', 'mebibytes'],
    },
    GiB: {
      ratio: GIBIBYTE_TO_BYTE,
      bigintRatio: GIBIBYTE_TO_BYTE_BIGINT,
      name: 'gibibyte',
      plural: 'gibibytes',
      symbol: 'GiB',
      system: 'metric',
      aliases: ['gib', 'gibibyte', 'gibibytes'],
    },
    TiB: {
      ratio: TEBIBYTE_TO_BYTE,
      bigintRatio: TEBIBYTE_TO_BYTE_BIGINT,
      name: 'tebibyte',
      plural: 'tebibytes',
      symbol: 'TiB',
      system: 'metric',
      aliases: ['tib', 'tebibyte', 'tebibytes'],
    },
    PiB: {
      ratio: PEBIBYTE_TO_BYTE,
      bigintRatio: PEBIBYTE_TO_BYTE_BIGINT,
      name: 'pebibyte',
      plural: 'pebibytes',
      symbol: 'PiB',
      system: 'metric',
      aliases: ['pib', 'pebibyte', 'pebibytes'],
    },
    bit: {
      ratio: BIT_TO_BYTE,
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
 *   import { dataStorage } from '@biggora/unit-converter/data-storage';
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
