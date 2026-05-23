/**
 * Digital-storage conversion constants (anchor: byte).
 *
 * `<UNIT>_TO_BYTE`: bytes = value * <UNIT>_TO_BYTE.
 *
 * Decimal-prefixed (`KB`, `MB`, …) and binary-prefixed (`KiB`, `MiB`, …) units
 * follow IEC 80000-13. Every byte-aligned unit additionally exposes a BigInt
 * variant `<UNIT>_TO_BYTE_BIGINT` for exact arithmetic. `bit` is byte / 8 and
 * therefore float-only.
 *
 * @module
 */

// — Unit identifiers —
export const BYTE = 'B' as const;
export const KILOBYTE = 'KB' as const;
export const MEGABYTE = 'MB' as const;
export const GIGABYTE = 'GB' as const;
export const TERABYTE = 'TB' as const;
export const PETABYTE = 'PB' as const;
export const KIBIBYTE = 'KiB' as const;
export const MEBIBYTE = 'MiB' as const;
export const GIBIBYTE = 'GiB' as const;
export const TEBIBYTE = 'TiB' as const;
export const PEBIBYTE = 'PiB' as const;
export const BIT = 'bit' as const;

// — Conversion factors —
export const BYTE_TO_BYTE = 1;
export const BYTE_TO_BYTE_BIGINT = 1n;

export const KILOBYTE_TO_BYTE = 1e3;
export const KILOBYTE_TO_BYTE_BIGINT = 1_000n;

export const MEGABYTE_TO_BYTE = 1e6;
export const MEGABYTE_TO_BYTE_BIGINT = 1_000_000n;

export const GIGABYTE_TO_BYTE = 1e9;
export const GIGABYTE_TO_BYTE_BIGINT = 1_000_000_000n;

export const TERABYTE_TO_BYTE = 1e12;
export const TERABYTE_TO_BYTE_BIGINT = 1_000_000_000_000n;

export const PETABYTE_TO_BYTE = 1e15;
export const PETABYTE_TO_BYTE_BIGINT = 1_000_000_000_000_000n;

export const KIBIBYTE_TO_BYTE = 1_024;
export const KIBIBYTE_TO_BYTE_BIGINT = 1_024n;

export const MEBIBYTE_TO_BYTE = 1_048_576;
export const MEBIBYTE_TO_BYTE_BIGINT = 1_048_576n;

export const GIBIBYTE_TO_BYTE = 1_073_741_824;
export const GIBIBYTE_TO_BYTE_BIGINT = 1_073_741_824n;

export const TEBIBYTE_TO_BYTE = 1_099_511_627_776;
export const TEBIBYTE_TO_BYTE_BIGINT = 1_099_511_627_776n;

export const PEBIBYTE_TO_BYTE = 1.125899906842624e15;
export const PEBIBYTE_TO_BYTE_BIGINT = 1_125_899_906_842_624n;

export const BIT_TO_BYTE = 0.125;
