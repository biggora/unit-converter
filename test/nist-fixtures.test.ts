/**
 * Golden NIST SP 811 §B.8/§B.9 verification. Every "exact" row must convert
 * without floating-point drift.
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { convert } from '../src/index.js';

interface FixtureCase {
  readonly from: string;
  readonly to: string;
  readonly value: number;
  readonly expected: number;
  readonly exact?: boolean;
}

interface Fixture {
  readonly source: string;
  readonly cases: readonly FixtureCase[];
}

const here = dirname(fileURLToPath(import.meta.url));
const REL_EPS = 1e-12;

function loadFixture(name: string): Fixture {
  const path = resolve(here, 'fixtures', name);
  return JSON.parse(readFileSync(path, 'utf-8')) as Fixture;
}

function runFixture(name: string): void {
  const fixture = loadFixture(name);
  describe(fixture.source, () => {
    for (const c of fixture.cases) {
      it(`${c.value} ${c.from} → ${c.to} = ${c.expected}${c.exact ? ' (exact)' : ''}`, () => {
        const result = convert(c.value, c.from, { category: undefined }).to(c.to) as number;
        if (c.exact) {
          expect(result).toBe(c.expected);
        } else {
          expect(result).toBeCloseTo(c.expected, 12);
        }
        // Inverse round-trip
        const inverse = convert(result, c.to).to(c.from) as number;
        expect(Math.abs(inverse - c.value) / Math.max(Math.abs(c.value), 1)).toBeLessThan(REL_EPS);
      });
    }
  });
}

runFixture('nist-sp811-b8.json');
runFixture('nist-sp811-b9.json');
