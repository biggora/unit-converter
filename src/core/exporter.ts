/**
 * Registry export — a single function that dumps every registered category,
 * anchor, unit and conversion factor into a plain-data object.
 *
 * The shape is JSON-serializable as-is: `bigint` values are returned as strings
 * with a trailing `'n'` suffix (e.g. `"1024n"`) so `JSON.stringify` never
 * throws. Consumers that want native BigInt back can parse them via
 * `BigInt(value.slice(0, -1))`.
 *
 * @example
 *   import { exportRegistry } from '@biggora/unit-converter';
 *
 *   const data = exportRegistry();
 *   data.categories[0].name;       // 'length'
 *   data.categories[0].anchor;     // 'm'
 *   data.categories[0].units[0];   // { key: 'm', ratio: 1, ... }
 *
 *   await writeFile('registry.json', JSON.stringify(data, null, 2));
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
import type { Category, CategoryDef, System } from './types.js';

/**
 * Serializable representation of a single unit.
 *
 * `bigintRatio`, when present, is encoded as a decimal string with a `'n'`
 * suffix (e.g. `"1099511627776n"`).
 */
export interface ExportedUnit {
  readonly key: string;
  readonly name: string;
  readonly plural?: string;
  readonly symbol?: string;
  readonly system?: System;
  readonly aliases: readonly string[];
  readonly ratio: number;
  readonly offset?: number;
  readonly bigintRatio?: string;
}

/**
 * Serializable representation of a single category.
 */
export interface ExportedCategory {
  readonly name: Category;
  readonly anchor: string;
  readonly units: readonly ExportedUnit[];
}

/**
 * Serializable representation of the full registry.
 */
export interface ExportedRegistry {
  readonly categories: readonly ExportedCategory[];
}

const ALL_CATEGORIES: readonly CategoryDef[] = [
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

/**
 * Dump every registered category / unit / factor into a plain-data object.
 *
 * The result is deterministic across calls (key order matches insertion order
 * of the category definitions) and JSON-serializable without custom replacers.
 */
export function exportRegistry(): ExportedRegistry {
  return {
    categories: ALL_CATEGORIES.map((cat) => ({
      name: cat.name as Category,
      anchor: cat.anchor,
      units: Object.entries(cat.units).map(([key, def]) => {
        const out: ExportedUnit = {
          key,
          name: def.name,
          ...(def.plural !== undefined && { plural: def.plural }),
          ...(def.symbol !== undefined && { symbol: def.symbol }),
          ...(def.system !== undefined && { system: def.system }),
          aliases: def.aliases ?? [],
          ratio: def.ratio,
          ...(def.offset !== undefined && { offset: def.offset }),
          ...(def.bigintRatio !== undefined && {
            bigintRatio: `${def.bigintRatio.toString()}n`,
          }),
        };
        return out;
      }),
    })),
  };
}
