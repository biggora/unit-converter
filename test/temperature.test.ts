/**
 * Temperature is the only affine-with-offset category — explicit pinning is
 * worth the extra suite.
 */
import { describe, expect, it } from 'vitest';
import { temperature } from '../src/index.js';

const ABS_EPS = 1e-9;

describe('temperature pivot points', () => {
  it('absolute zero is shared', () => {
    expect(temperature(0, 'K').to('C')).toBeCloseTo(-273.15, 12);
    expect(temperature(-273.15, 'C').to('K')).toBeCloseTo(0, ABS_EPS);
    expect(temperature(-459.67, 'F').to('C')).toBeCloseTo(-273.15, 9);
    expect(temperature(0, 'R').to('K')).toBe(0);
  });

  it('water freezing point', () => {
    expect(temperature(0, 'C').to('K')).toBe(273.15);
    expect(temperature(32, 'F').to('C')).toBeCloseTo(0, ABS_EPS);
    expect(temperature(491.67, 'R').to('K')).toBeCloseTo(273.15, 9);
  });

  it('water boiling point at 1 atm', () => {
    expect(temperature(100, 'C').to('F')).toBeCloseTo(212, 9);
    expect(temperature(212, 'F').to('C')).toBeCloseTo(100, 9);
    expect(temperature(100, 'C').to('K')).toBe(373.15);
  });

  it('symbolic aliases (°C, degC) work', () => {
    expect(temperature(0, '°C').to('K')).toBe(273.15);
    expect(temperature(0, 'degc').to('K')).toBe(273.15);
    expect(temperature(0, 'celsius').to('K')).toBe(273.15);
  });

  it('inverse round-trip', () => {
    for (const t of [-100, 0, 25, 100]) {
      const roundTrip = temperature(temperature(t, 'C').to('F'), 'F').to('C');
      expect(roundTrip).toBeCloseTo(t, 9);
    }
  });

  it('possibilities list contains all four scales', () => {
    const p = temperature(0, 'K').possibilities();
    expect(p).toEqual(expect.arrayContaining(['K', 'C', 'F', 'R']));
  });
});
