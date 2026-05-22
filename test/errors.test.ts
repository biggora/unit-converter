/**
 * Verify the error hierarchy and stable error codes.
 */
import { describe, expect, it } from 'vitest';

import {
  AmbiguousUnitError,
  BigIntPrecisionError,
  ErrorCode,
  IncompatibleUnitsError,
  InvalidValueError,
  UnitConverterError,
  UnitNotBigIntSafeError,
  UnknownUnitError,
  convert,
  length,
  time,
} from '../src/index.js';

describe('error hierarchy', () => {
  it('every error extends UnitConverterError', () => {
    const e1 = new UnknownUnitError('foo');
    const e2 = new IncompatibleUnitsError('m', 'kg', 'length', 'mass');
    const e3 = new InvalidValueError(Number.NaN, 'nan');
    const e4 = new BigIntPrecisionError('ms', 's', 1n);
    const e5 = new UnitNotBigIntSafeError('foo');
    const e6 = new AmbiguousUnitError('c', ['speed', 'temperature']);
    for (const e of [e1, e2, e3, e4, e5, e6]) {
      expect(e).toBeInstanceOf(UnitConverterError);
      expect(e).toBeInstanceOf(Error);
      expect(typeof e.code).toBe('string');
      expect(e.code.startsWith('E_')).toBe(true);
    }
  });

  it('codes are stable', () => {
    expect(ErrorCode.UNKNOWN_UNIT).toBe('E_UNKNOWN_UNIT');
    expect(ErrorCode.INCOMPATIBLE_UNITS).toBe('E_INCOMPATIBLE_UNITS');
    expect(ErrorCode.INVALID_VALUE).toBe('E_INVALID_VALUE');
    expect(ErrorCode.BIGINT_PRECISION).toBe('E_BIGINT_PRECISION');
    expect(ErrorCode.BIGINT_UNSAFE).toBe('E_BIGINT_UNSAFE');
    expect(ErrorCode.AMBIGUOUS_UNIT).toBe('E_AMBIGUOUS_UNIT');
  });

  it('UnknownUnitError carries the offending name', () => {
    try {
      length(1, 'wibble');
      expect.unreachable();
    } catch (e) {
      expect(e).toBeInstanceOf(UnknownUnitError);
      expect((e as UnknownUnitError).unit).toBe('wibble');
    }
  });

  it('IncompatibleUnitsError carries both categories', () => {
    try {
      convert(1, 'm').to('kg' as never);
      expect.unreachable();
    } catch (e) {
      expect(e).toBeInstanceOf(IncompatibleUnitsError);
      const err = e as IncompatibleUnitsError;
      expect(err.fromCategory).toBe('length');
      expect(err.toCategory).toBe('mass');
    }
  });

  it('InvalidValueError discriminates by cause', () => {
    try {
      convert(Number.NaN, 'm');
      expect.unreachable();
    } catch (e) {
      const err = e as InvalidValueError;
      expect(err.cause).toBe('nan');
    }
    try {
      convert(Number.POSITIVE_INFINITY, 'm');
      expect.unreachable();
    } catch (e) {
      const err = e as InvalidValueError;
      expect(err.cause).toBe('infinity');
    }
  });

  it('BigIntPrecisionError carries the source value', () => {
    try {
      time.bigint(1n, 'ms').to('s');
      expect.unreachable();
    } catch (e) {
      const err = e as BigIntPrecisionError;
      expect(err.value).toBe(1n);
      expect(err.from).toBe('ms');
      expect(err.to).toBe('s');
    }
  });

  it('AmbiguousUnitError lists candidate categories', () => {
    try {
      convert(1, 'c');
      expect.unreachable();
    } catch (e) {
      const err = e as AmbiguousUnitError;
      expect(err.categories.length).toBeGreaterThan(1);
      expect(err.categories).toEqual(expect.arrayContaining(['temperature']));
    }
  });
});
