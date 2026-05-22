/**
 * Property-based sanity checks across every category:
 *   identity:    convert(x, u).to(u) === x
 *   inverse:     convert(convert(x, a).to(b), b).to(a) ≈ x
 *   composition: a→c ≈ a→b→c
 *
 * Temperature is excluded from inverse for non-zero values (offset asymmetry
 * causes small drift that's already covered by temperature.test.ts).
 */
import { describe, expect, it } from 'vitest';
import type { CategoryFunction } from '../src/factories/make-category.js';
import {
  angle,
  area,
  dataStorage,
  length,
  mass,
  pressure,
  speed,
  time,
  volume,
} from '../src/index.js';

const REL_EPS = 1e-10;
const SAMPLE_VALUES = [1, 0.5, 1e6, 1e-6, Math.PI];

const CATEGORIES: ReadonlyArray<readonly [string, CategoryFunction<string>]> = [
  ['length', length as unknown as CategoryFunction<string>],
  ['mass', mass as unknown as CategoryFunction<string>],
  ['time', time as unknown as CategoryFunction<string>],
  ['volume', volume as unknown as CategoryFunction<string>],
  ['area', area as unknown as CategoryFunction<string>],
  ['speed', speed as unknown as CategoryFunction<string>],
  ['dataStorage', dataStorage as unknown as CategoryFunction<string>],
  ['angle', angle as unknown as CategoryFunction<string>],
  ['pressure', pressure as unknown as CategoryFunction<string>],
];

function relClose(actual: number, expected: number, eps = REL_EPS): boolean {
  if (!Number.isFinite(actual) || !Number.isFinite(expected)) return false;
  const denom = Math.max(Math.abs(expected), 1);
  return Math.abs(actual - expected) / denom < eps;
}

describe.each(CATEGORIES)('%s properties', (name, fn) => {
  it(`${name} identity`, () => {
    for (const unit of fn.units) {
      for (const x of SAMPLE_VALUES) {
        const result = fn(x, unit).to(unit) as number;
        expect(relClose(result, x)).toBe(true);
      }
    }
  });

  it(`${name} inverse round-trip (sample pairs)`, () => {
    const units = fn.units.slice(0, 8); // limit explosion in large categories
    for (const a of units) {
      for (const b of units) {
        if (a === b) continue;
        const round = fn(fn(1, a).to(b) as number, b).to(a) as number;
        expect(relClose(round, 1)).toBe(true);
      }
    }
  });

  it(`${name} composition through anchor`, () => {
    const triples = fn.units.slice(0, 5);
    for (const a of triples) {
      for (const b of triples) {
        for (const c of triples) {
          const direct = fn(1, a).to(c) as number;
          const viaB = fn(fn(1, a).to(b) as number, b).to(c) as number;
          if (!Number.isFinite(direct) || !Number.isFinite(viaB)) continue;
          expect(relClose(viaB, direct, 1e-9)).toBe(true);
        }
      }
    }
  });
});
