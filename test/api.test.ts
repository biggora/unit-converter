/**
 * Root-API behavior: dispatch, ambiguity handling, options, and Converter shape.
 */
import { describe, expect, it } from 'vitest';

import {
  AmbiguousUnitError,
  IncompatibleUnitsError,
  InvalidValueError,
  UnknownUnitError,
  convert,
  length,
  mass,
} from '../src/index.js';

describe('convert() root dispatch', () => {
  it('returns a number when target is a sibling unit', () => {
    expect(convert(5, 'm').to('ft')).toBeCloseTo(16.404199475065617, 12);
  });

  it('exposes category on the converter', () => {
    expect(convert(5, 'm').category).toBe('length');
    expect(convert(1, 'kg').category).toBe('mass');
  });

  it('lists possibilities', () => {
    const possibilities = convert(5, 'm').possibilities();
    expect(possibilities).toContain('m');
    expect(possibilities).toContain('ft');
    expect(possibilities).not.toContain('kg');
  });

  it('routes by alias (case-insensitive)', () => {
    expect(convert(1, 'Meter').to('cm')).toBe(100);
    expect(convert(1, 'KILOGRAM').to('g')).toBe(1000);
    expect(convert(1, 'pound').to('kg')).toBeCloseTo(0.45359237, 12);
  });

  it('accepts disambiguation via { category }', () => {
    expect(convert(0, 'C', { category: 'temperature' }).to('F')).toBeCloseTo(32, 9);
  });
});

describe('per-category functions', () => {
  it('match root convert() for unambiguous units', () => {
    const a = convert(5, 'm').to('ft');
    const b = length(5, 'm').to('ft');
    expect(a).toBe(b);
  });

  it('expose units/systems/category metadata', () => {
    expect(length.category).toBe('length');
    expect(length.units).toContain('m');
    expect(length.units).toContain('ft');
    expect(length.systems).toContain('metric');
    expect(length.systems).toContain('imperial');
  });

  it('describe returns canonical unit metadata', () => {
    const d = length.describe('mi');
    expect(d.key).toBe('mi');
    expect(d.ratio).toBe(1609.344);
    expect(d.name).toBe('mile');
  });
});

describe('error contract', () => {
  it('UnknownUnitError on bogus source', () => {
    expect(() => convert(5, 'wibble')).toThrowError(UnknownUnitError);
  });

  it('UnknownUnitError suggests close matches', () => {
    try {
      convert(5, 'meterz');
      expect.unreachable();
    } catch (e) {
      expect(e).toBeInstanceOf(UnknownUnitError);
      const err = e as UnknownUnitError;
      expect(err.suggestions).toContain('meter');
    }
  });

  it('IncompatibleUnitsError on cross-category to()', () => {
    expect(() => convert(5, 'm').to('kg' as never)).toThrowError(IncompatibleUnitsError);
  });

  it('AmbiguousUnitError on collision', () => {
    // 'c' is both speed of light and celsius
    expect(() => convert(5, 'c')).toThrowError(AmbiguousUnitError);
  });

  it('InvalidValueError on NaN', () => {
    expect(() => convert(Number.NaN, 'm')).toThrowError(InvalidValueError);
  });

  it('InvalidValueError on ±Infinity', () => {
    expect(() => convert(Number.POSITIVE_INFINITY, 'm')).toThrowError(InvalidValueError);
    expect(() => convert(Number.NEGATIVE_INFINITY, 'm')).toThrowError(InvalidValueError);
  });

  it('InvalidValueError on wrong type', () => {
    // biome-ignore lint/suspicious/noExplicitAny: testing runtime guard
    expect(() => convert('5' as any, 'm')).toThrowError(InvalidValueError);
  });
});

describe('mass parity', () => {
  it('lb ↔ kg is exact (NIST B.8)', () => {
    expect(mass(1, 'lb').to('kg')).toBe(0.45359237);
    expect(mass(0.45359237, 'kg').to('lb')).toBeCloseTo(1, 12);
  });
});
