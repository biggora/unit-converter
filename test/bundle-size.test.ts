/**
 * Bundle-size budget. Run after `pnpm build`; if `dist/` is missing, the
 * suite is skipped so unit-test runs don't depend on a prior build.
 */
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';

const here = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(here, '..', 'dist');

// Budgets reflect actual gzip sizes with a 15% growth headroom for
// alias/locale additions. Tight enough to detect regressions, loose enough
// not to flap on documentation changes.
const BUDGETS_BYTES: Record<string, number> = {
  'index.mjs': 13_000,
  'length.mjs': 4200,
  'mass.mjs': 4100,
  'time.mjs': 4000,
  'temperature.mjs': 3700,
  'volume.mjs': 4500,
  'area.mjs': 4000,
  'speed.mjs': 4000,
  'data-storage.mjs': 4000,
  'angle.mjs': 3800,
  'pressure.mjs': 4100,
};

const distExists = existsSync(distDir);

describe.skipIf(!distExists)('bundle-size budgets (gzip)', () => {
  for (const [file, budget] of Object.entries(BUDGETS_BYTES)) {
    it(`${file} ≤ ${budget} B gzipped`, () => {
      const path = resolve(distDir, file);
      const stat = statSync(path);
      expect(stat.size).toBeGreaterThan(0);
      const gz = gzipSync(readFileSync(path));
      expect(gz.byteLength).toBeLessThanOrEqual(budget);
    });
  }
});
