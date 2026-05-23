/**
 * Verifies `exportRegistry()` returns a complete, JSON-serializable snapshot
 * of every category, anchor, unit and conversion factor.
 */
import { describe, expect, it } from 'vitest';

import { exportRegistry } from '../src';
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
      expect(reg.categories[i]?.name).toBe(name);
      expect(reg.categories[i]?.anchor).toBe(anchor);
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
      expect(a.categories[i]?.name).toBe(b.categories[i]?.name);
      expect(a.categories[i]?.units.length).toBe(b.categories[i]?.units.length);
    }
  });
});

describe('exportRegistry({ format })', () => {
  it("'object' returns the same thing as the no-arg form", () => {
    const a = exportRegistry();
    const b = exportRegistry({ format: 'object' });
    expect(b.categories.length).toBe(a.categories.length);
  });

  it("'json' returns a parseable JSON string", () => {
    const json = exportRegistry({ format: 'json' });
    expect(typeof json).toBe('string');
    const parsed = JSON.parse(json);
    expect(parsed.categories).toHaveLength(EXPECTED_CATEGORIES.length);
  });

  it("'json' honors the indent option", () => {
    const compact = exportRegistry({ format: 'json', indent: 0 });
    const pretty = exportRegistry({ format: 'json', indent: 2 });
    expect(compact.length).toBeLessThan(pretty.length);
    // both still parse to the same shape
    expect(JSON.parse(compact).categories.length).toBe(JSON.parse(pretty).categories.length);
  });

  it("'markdown' contains a section header and a table row per category", () => {
    const md = exportRegistry({ format: 'markdown' });
    expect(md).toContain('# Unit Registry');
    expect(md).toContain('## length (anchor: `m`)');
    expect(md).toContain('## temperature (anchor: `K`)');
    // inch row should include its ratio
    expect(md).toMatch(/\|\s*`in`\s*\|\s*inch\s*\|/);
    expect(md).toContain('0.0254');
  });

  it("'csv' has the expected header and one row per unit", () => {
    const csv = exportRegistry({ format: 'csv' });
    const lines = csv.split('\n');
    expect(lines[0]).toBe(
      'category,anchor,key,name,plural,symbol,system,ratio,offset,bigintRatio,aliases',
    );
    const totalUnits = exportRegistry().categories.reduce((n, c) => n + c.units.length, 0);
    // header + data rows
    expect(lines).toHaveLength(totalUnits + 1);
    // inch row exists with ratio 0.0254
    expect(csv).toMatch(/length,m,in,inch,inches,in,imperial,0\.0254/);
    // pipe-joined aliases
    expect(csv).toMatch(/inch\|inches\|"/);
  });

  it("'csv' escapes embedded quotes", () => {
    const csv = exportRegistry({ format: 'csv' });
    // inch aliases include `"` — it must be RFC-4180-escaped
    const lengthInchLine = csv.split('\n').find((l) => l.startsWith('length,m,in,'));
    expect(lengthInchLine).toBeDefined();
    expect(lengthInchLine).toContain('""');
  });
});
