/**
 * Exact BigInt arithmetic for integer-aligned categories.
 */
import { describe, expect, it } from 'vitest';
import {
  BigIntPrecisionError,
  InvalidValueError,
  UnitNotBigIntSafeError,
  convert,
  dataStorage,
  time,
} from '../src/index.js';

describe('time bigint', () => {
  it('20h → 72_000_000 ms (exact)', () => {
    expect(convert(20n, 'h').to('ms')).toBe(72_000_000n);
    expect(time.bigint(20n, 'h').to('ms')).toBe(72_000_000n);
  });

  it('1 day → 86_400 s', () => {
    expect(time.bigint(1n, 'd').to('s')).toBe(86_400n);
  });

  it('100 weeks → ns', () => {
    // 100 weeks = 100 * 604_800 s = 60_480_000 s = 6.048e16 ns
    expect(time.bigint(100n, 'week').to('ns')).toBe(60_480_000_000_000_000n);
  });

  it('throws on month/year (not integer-aligned)', () => {
    expect(() => time.bigint(1n, 'month').to('s')).toThrowError(UnitNotBigIntSafeError);
    expect(() => time.bigint(1n, 's').to('year')).toThrowError(UnitNotBigIntSafeError);
  });

  it('throws BigIntPrecisionError on lossy conversion', () => {
    // 1 ms is 1_000_000 ns; cannot become an integer number of seconds without truncation.
    expect(() => time.bigint(1n, 'ms').to('s')).toThrowError(BigIntPrecisionError);
  });

  it('rejects non-bigint input', () => {
    // biome-ignore lint/suspicious/noExplicitAny: testing runtime guard
    expect(() => time.bigint(5 as any, 'h')).toThrowError(InvalidValueError);
  });
});

describe('dataStorage bigint', () => {
  it('1 TiB → 1_099_511_627_776 B (exact, binary)', () => {
    expect(dataStorage.bigint(1n, 'TiB').to('B')).toBe(1_099_511_627_776n);
  });

  it('1 PB → 1e15 B (exact, decimal)', () => {
    expect(dataStorage.bigint(1n, 'PB').to('B')).toBe(1_000_000_000_000_000n);
  });

  it('throws on bit (not byte-aligned)', () => {
    expect(() => dataStorage.bigint(8n, 'bit').to('B')).toThrowError(UnitNotBigIntSafeError);
  });

  it('throws when crossing decimal ↔ binary inexactly', () => {
    // 1 KB = 1000 B; cannot become an integer number of KiB.
    expect(() => dataStorage.bigint(1n, 'KB').to('KiB')).toThrowError(BigIntPrecisionError);
  });
});
