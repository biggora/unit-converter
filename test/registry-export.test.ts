/**
 * Verifies `exportRegistry()` returns a complete, JSON-serializable snapshot
 * of every category, anchor, unit and conversion factor.
 */
import { describe, expect, it } from 'vitest';

import { exportRegistry } from '../src/core/exporter.js';
import { exportRegistry as exportRegistryFromSubpath } from '../src/registry.js';

const EXPECTED_CATEGORIES: ReadonlyArray<readonly [string, string]> = [
  ['length', 'm'],
  ['mass', 'kg'],
  ['time', 's'],
  ['temperature', 'K'],
  ['volume', 'm3'],
  ['area', 'm2'],
  ['speed', 'm/s'],
  ['dataStorage', 'B'],
  ['angle', 'rad'],
  ['pressure', 'Pa'],
];

describe('exportRegistry()', () => {
  it('returns all 10 categories with correct anchors', () => {
    const reg = exportRegistry();
    expect(reg.categories).toHaveLength(EXPECTED_CATEGORIES.length);
    for (const [i, [name, anchor]] of EXPECTED_CATEGORIES.entries()) {
      expect(reg.categories[i].name).toBe(name);
      expect(reg.categories[i].anchor).toBe(anchor);
    }
  });

  it('every category has at least one unit', () => {
    const reg = exportRegistry();
    for (const cat of reg.categories) {
      expect(cat.units.length).toBeGreaterThan(0);
    }
  });

  it('length includes inch with ratio 0.0254', () => {
    const reg = exportRegistry();
    const lengthCat = reg.categories.find((c) => c.name === 'length');
    expect(lengthCat).toBeDefined();
    const inch = lengthCat?.units.find((u) => u.key === 'in');
    expect(inch?.ratio).toBe(0.0254);
    expect(inch?.name).toBe('inch');
    expect(inch?.system).toBe('imperial');
  });

  it('temperature units carry both ratio and offset', () => {
    const reg = exportRegistry();
    const tempCat = reg.categories.find((c) => c.name === 'temperature');
    const celsius = tempCat?.units.find((u) => u.key === 'C');
    expect(celsius?.ratio).toBe(1);
    expect(celsius?.offset).toBe(273.15);
  });

  it('bigint-safe units expose bigintRatio as a string with trailing "n"', () => {
    const reg = exportRegistry();
    const dataStorageCat = reg.categories.find((c) => c.name === 'dataStorage');
    const kib = dataStorageCat?.units.find((u) => u.key === 'KiB');
    expect(kib?.bigintRatio).toBe('1024n');
    // round-trip back to BigInt
    expect(BigInt(kib?.bigintRatio?.slice(0, -1) ?? '')).toBe(1024n);

    // time anchor is second, but bigint scale is nanosecond
    const timeCat = reg.categories.find((c) => c.name === 'time');
    const hour = timeCat?.units.find((u) => u.key === 'h');
    expect(hour?.bigintRatio).toBe('3600000000000n');
  });

  it('units without bigintRatio omit the field entirely', () => {
    const reg = exportRegistry();
    const tempCat = reg.categories.find((c) => c.name === 'temperature');
    for (const u of tempCat?.units ?? []) {
      expect(u.bigintRatio).toBeUndefined();
    }
  });

  it('JSON.stringify round-trips without throwing', () => {
    const reg = exportRegistry();
    const json = JSON.stringify(reg);
    expect(() => JSON.parse(json)).not.toThrow();
    const parsed = JSON.parse(json);
    expect(parsed.categories).toHaveLength(EXPECTED_CATEGORIES.length);
  });

  it('subpath module exports the same function', () => {
    expect(exportRegistryFromSubpath).toBe(exportRegistry);
  });

  it('result is deterministic across calls (same category order, unit count)', () => {
    const a = exportRegistry();
    const b = exportRegistry();
    expect(a.categories.length).toBe(b.categories.length);
    for (let i = 0; i < a.categories.length; i++) {
      expect(a.categories[i].name).toBe(b.categories[i].name);
      expect(a.categories[i].units.length).toBe(b.categories[i].units.length);
    }
  });
});
