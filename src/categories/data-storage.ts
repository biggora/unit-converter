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
  BIT,
  BIT_TO_BYTE,
  BYTE,
  BYTE_TO_BYTE,
  BYTE_TO_BYTE_BIGINT,
  DATA_STORAGE,
  GIBIBYTE,
  GIBIBYTE_TO_BYTE,
  GIBIBYTE_TO_BYTE_BIGINT,
  GIGABYTE,
  GIGABYTE_TO_BYTE,
  GIGABYTE_TO_BYTE_BIGINT,
  KIBIBYTE,
  KIBIBYTE_TO_BYTE,
  KIBIBYTE_TO_BYTE_BIGINT,
  KILOBYTE,
  KILOBYTE_TO_BYTE,
  KILOBYTE_TO_BYTE_BIGINT,
  MEBIBYTE,
  MEBIBYTE_TO_BYTE,
  MEBIBYTE_TO_BYTE_BIGINT,
  MEGABYTE,
  MEGABYTE_TO_BYTE,
  MEGABYTE_TO_BYTE_BIGINT,
  PEBIBYTE,
  PEBIBYTE_TO_BYTE,
  PEBIBYTE_TO_BYTE_BIGINT,
  PETABYTE,
  PETABYTE_TO_BYTE,
  PETABYTE_TO_BYTE_BIGINT,
  TEBIBYTE,
  TEBIBYTE_TO_BYTE,
  TEBIBYTE_TO_BYTE_BIGINT,
  TERABYTE,
  TERABYTE_TO_BYTE,
  TERABYTE_TO_BYTE_BIGINT,
} from '../constants';
import type { CategoryDef } from '../core/types.js';
import { makeCategory } from '../factories/make-category.js';

export * from '../constants/data-storage.js';

/** @internal */
export const dataStorageCategory: CategoryDef<typeof DATA_STORAGE> = {
  name: DATA_STORAGE,
  anchor: BYTE,
  units: {
    [BYTE]: {
      ratio: BYTE_TO_BYTE,
      bigintRatio: BYTE_TO_BYTE_BIGINT,
      name: 'byte',
      plural: 'bytes',
      symbol: 'B',
      system: 'metric',
      aliases: ['byte', 'bytes'],
    },
    [KILOBYTE]: {
      ratio: KILOBYTE_TO_BYTE,
      bigintRatio: KILOBYTE_TO_BYTE_BIGINT,
      name: 'kilobyte',
      plural: 'kilobytes',
      symbol: 'kB',
      system: 'metric',
      aliases: ['kb', 'kilobyte', 'kilobytes'],
    },
    [MEGABYTE]: {
      ratio: MEGABYTE_TO_BYTE,
      bigintRatio: MEGABYTE_TO_BYTE_BIGINT,
      name: 'megabyte',
      plural: 'megabytes',
      symbol: 'MB',
      system: 'metric',
      aliases: ['mb', 'megabyte', 'megabytes'],
    },
    [GIGABYTE]: {
      ratio: GIGABYTE_TO_BYTE,
      bigintRatio: GIGABYTE_TO_BYTE_BIGINT,
      name: 'gigabyte',
      plural: 'gigabytes',
      symbol: 'GB',
      system: 'metric',
      aliases: ['gb', 'gigabyte', 'gigabytes'],
    },
    [TERABYTE]: {
      ratio: TERABYTE_TO_BYTE,
      bigintRatio: TERABYTE_TO_BYTE_BIGINT,
      name: 'terabyte',
      plural: 'terabytes',
      symbol: 'TB',
      system: 'metric',
      aliases: ['tb', 'terabyte', 'terabytes'],
    },
    [PETABYTE]: {
      ratio: PETABYTE_TO_BYTE,
      bigintRatio: PETABYTE_TO_BYTE_BIGINT,
      name: 'petabyte',
      plural: 'petabytes',
      symbol: 'PB',
      system: 'metric',
      aliases: ['pb', 'petabyte', 'petabytes'],
    },
    [KIBIBYTE]: {
      ratio: KIBIBYTE_TO_BYTE,
      bigintRatio: KIBIBYTE_TO_BYTE_BIGINT,
      name: 'kibibyte',
      plural: 'kibibytes',
      symbol: 'KiB',
      system: 'metric',
      aliases: ['kib', 'kibibyte', 'kibibytes'],
    },
    [MEBIBYTE]: {
      ratio: MEBIBYTE_TO_BYTE,
      bigintRatio: MEBIBYTE_TO_BYTE_BIGINT,
      name: 'mebibyte',
      plural: 'mebibytes',
      symbol: 'MiB',
      system: 'metric',
      aliases: ['mib', 'mebibyte', 'mebibytes'],
    },
    [GIBIBYTE]: {
      ratio: GIBIBYTE_TO_BYTE,
      bigintRatio: GIBIBYTE_TO_BYTE_BIGINT,
      name: 'gibibyte',
      plural: 'gibibytes',
      symbol: 'GiB',
      system: 'metric',
      aliases: ['gib', 'gibibyte', 'gibibytes'],
    },
    [TEBIBYTE]: {
      ratio: TEBIBYTE_TO_BYTE,
      bigintRatio: TEBIBYTE_TO_BYTE_BIGINT,
      name: 'tebibyte',
      plural: 'tebibytes',
      symbol: 'TiB',
      system: 'metric',
      aliases: ['tib', 'tebibyte', 'tebibytes'],
    },
    [PEBIBYTE]: {
      ratio: PEBIBYTE_TO_BYTE,
      bigintRatio: PEBIBYTE_TO_BYTE_BIGINT,
      name: 'pebibyte',
      plural: 'pebibytes',
      symbol: 'PiB',
      system: 'metric',
      aliases: ['pib', 'pebibyte', 'pebibytes'],
    },
    [BIT]: {
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
