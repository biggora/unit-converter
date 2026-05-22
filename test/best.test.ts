/**
 * `to('best')` heuristic verification.
 */
import { describe, expect, it } from 'vitest';
import { convert, length, mass, temperature, time } from '../src/index.js';

describe('to(best)', () => {
  it('5500 m → 5.5 km', () => {
    const r = convert(5500, 'm').to('best');
    expect(r.value).toBeCloseTo(5.5, 12);
    expect(r.unit).toBe('km');
  });

  it('0.005 m → 5 mm', () => {
    const r = convert(0.005, 'm').to('best');
    expect(r.value).toBeCloseTo(5, 12);
    expect(r.unit).toBe('mm');
  });

  it('1500 g → 1.5 kg', () => {
    const r = mass(1500, 'g').to('best');
    expect(r.value).toBeCloseTo(1.5, 12);
    expect(r.unit).toBe('kg');
  });

  it('3600 s → 1 h', () => {
    const r = time(3600, 's').to('best');
    expect(r.value).toBeCloseTo(1, 12);
    expect(r.unit).toBe('h');
  });

  it('respects explicit system filter', () => {
    const r = length(1, 'm').to('best', { system: 'imperial' });
    expect(['ft', 'yd', 'in']).toContain(r.unit);
    expect(r.value).toBeCloseTo(length(1, 'm').to(r.unit as 'ft'), 9);
  });

  it('defaults to input system', () => {
    // 2.5 mi should stay imperial (not switch to km).
    const r = length(2.5, 'mi').to('best');
    expect(['mi', 'yd', 'ft']).toContain(r.unit);
  });

  it('predicate can veto candidates', () => {
    const r = mass(1, 'kg').to('best', {
      predicate: ({ unit }) => unit !== 'kg', // forbid kg
    });
    expect(r.unit).not.toBe('kg');
  });

  it('toString renders with symbol', () => {
    const r = convert(5500, 'm').to('best');
    expect(r.toString()).toMatch(/km$/);
  });

  it('handles zero gracefully', () => {
    const r = convert(0, 'm').to('best');
    expect(r.value).toBe(0);
    expect(typeof r.unit).toBe('string');
  });

  it('temperature 20 C → 20 C', () => {
    const r = temperature(20, 'C').to('best');
    expect(r.unit).toBe('C');
  });
});
