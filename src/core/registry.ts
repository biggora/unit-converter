/**
 * Lazy unit registry: maps every (lowercased) unit name or alias to its owning
 * category. Only the root `convert()` triggers index construction — per-category
 * subpath imports never pay for it.
 *
 * @module
 */

import { angleCategory } from '../categories/angle.js';
import { areaCategory } from '../categories/area.js';
import { dataStorageCategory } from '../categories/data-storage.js';
import { lengthCategory } from '../categories/length.js';
import { massCategory } from '../categories/mass.js';
import { pressureCategory } from '../categories/pressure.js';
import { speedCategory } from '../categories/speed.js';
import { temperatureCategory } from '../categories/temperature.js';
import { timeCategory } from '../categories/time.js';
import { volumeCategory } from '../categories/volume.js';
import { normalizeUnit } from './normalize.js';
import type { CategoryDef } from './types.js';

/** All v0.1 categories. New ones extend this array (no other file changes). */
export const CATEGORIES: readonly CategoryDef[] = [
  lengthCategory,
  massCategory,
  timeCategory,
  temperatureCategory,
  volumeCategory,
  areaCategory,
  speedCategory,
  dataStorageCategory,
  angleCategory,
  pressureCategory,
];

export interface RegistryEntry {
  readonly category: CategoryDef;
  readonly key: string;
}

interface Index {
  /** lowercased name → primary entry (last-write-wins for collisions). */
  readonly entries: ReadonlyMap<string, RegistryEntry>;
  /** lowercased name → all categories that claim it. */
  readonly collisions: ReadonlyMap<string, readonly string[]>;
}

let cached: Index | null = null;

/**
 * Build (or return) the flat name → category index.
 *
 * Lazy + memoized. Cost amortizes to `O(total units)` once.
 *
 * @internal
 */
export function getIndex(): Index {
  if (cached) return cached;

  const entries = new Map<string, RegistryEntry>();
  const allCats = new Map<string, Set<string>>();

  for (const cat of CATEGORIES) {
    for (const [key, unit] of Object.entries(cat.units)) {
      const names = [key, ...(unit.aliases ?? [])];
      for (const name of names) {
        const lc = normalizeUnit(name);
        let cats = allCats.get(lc);
        if (!cats) {
          cats = new Set<string>();
          allCats.set(lc, cats);
        }
        cats.add(cat.name);
        entries.set(lc, { category: cat, key });
      }
    }
  }

  const collisions = new Map<string, readonly string[]>();
  for (const [lc, cats] of allCats) {
    if (cats.size > 1) {
      collisions.set(lc, [...cats].sort());
    }
  }

  cached = { entries, collisions };
  return cached;
}

/**
 * Force a rebuild of the index. Exposed for testing only.
 *
 * @internal
 */
export function resetIndex(): void {
  cached = null;
}
