/**
 * Registry export — dumps every registered category, anchor, unit and
 * conversion factor in one of several formats.
 *
 *   exportRegistry()                       // → ExportedRegistry (plain object)
 *   exportRegistry({ format: 'json' })     // → JSON string
 *   exportRegistry({ format: 'markdown' }) // → Markdown tables
 *   exportRegistry({ format: 'csv' })      // → flat CSV
 *
 * The default `'object'` form is JSON-serializable as-is: `bigint` values are
 * encoded as decimal strings with a trailing `'n'` suffix (e.g. `"1024n"`) so
 * `JSON.stringify` never throws. Consumers that want native BigInt back can
 * parse them via `BigInt(value.slice(0, -1))`.
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

/**
 * Output shape for {@link exportRegistry}.
 *
 * - `'object'` (default): typed JS object — best for programmatic use.
 * - `'json'`: JSON-encoded string.
 * - `'markdown'`: GitHub-flavored Markdown — one `##` section + table per category.
 * - `'csv'`: flat RFC-4180 table — one row per unit, header included.
 */
export type ExportFormat = 'object' | 'json' | 'markdown' | 'csv';

export interface ExportOptions {
  readonly format?: ExportFormat;
  /** Pretty-print indent for JSON. Defaults to `2`. */
  readonly indent?: number;
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

function buildRegistry(): ExportedRegistry {
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

function toJson(reg: ExportedRegistry, indent: number): string {
  return JSON.stringify(reg, null, indent);
}

function toMarkdown(reg: ExportedRegistry): string {
  const HEADER = '| Key | Name | Symbol | System | Ratio | Offset | BigInt Ratio | Aliases |';
  const ALIGN = '| --- | --- | --- | --- | ---: | ---: | ---: | --- |';

  const lines: string[] = ['# Unit Registry', ''];
  for (const cat of reg.categories) {
    lines.push(`## ${cat.name} (anchor: \`${cat.anchor}\`)`, '', HEADER, ALIGN);
    for (const u of cat.units) {
      lines.push(
        `| \`${u.key}\` | ${u.name} | ${u.symbol ?? ''} | ${u.system ?? ''} | ${u.ratio} | ${
          u.offset ?? ''
        } | ${u.bigintRatio ?? ''} | ${u.aliases.join(', ')} |`,
      );
    }
    lines.push('');
  }
  return lines.join('\n');
}

function csvEscape(value: string): string {
  if (/[",\r\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function toCsv(reg: ExportedRegistry): string {
  const HEADERS = [
    'category',
    'anchor',
    'key',
    'name',
    'plural',
    'symbol',
    'system',
    'ratio',
    'offset',
    'bigintRatio',
    'aliases',
  ];
  const rows: string[] = [HEADERS.join(',')];
  for (const cat of reg.categories) {
    for (const u of cat.units) {
      const row = [
        cat.name,
        cat.anchor,
        u.key,
        u.name,
        u.plural ?? '',
        u.symbol ?? '',
        u.system ?? '',
        String(u.ratio),
        u.offset === undefined ? '' : String(u.offset),
        u.bigintRatio ?? '',
        u.aliases.join('|'),
      ].map(csvEscape);
      rows.push(row.join(','));
    }
  }
  return rows.join('\n');
}

/**
 * Dump every registered category / unit / factor.
 *
 * @example
 *   exportRegistry();                       // ExportedRegistry
 *   exportRegistry({ format: 'json' });     // string
 *   exportRegistry({ format: 'markdown' }); // string
 *   exportRegistry({ format: 'csv' });      // string
 */
export function exportRegistry(): ExportedRegistry;
export function exportRegistry(opts: ExportOptions & { format?: 'object' }): ExportedRegistry;
export function exportRegistry(opts: ExportOptions & { format: 'json' }): string;
export function exportRegistry(opts: ExportOptions & { format: 'markdown' }): string;
export function exportRegistry(opts: ExportOptions & { format: 'csv' }): string;
export function exportRegistry(opts: ExportOptions = {}): ExportedRegistry | string {
  const reg = buildRegistry();
  const format = opts.format ?? 'object';
  switch (format) {
    case 'object':
      return reg;
    case 'json':
      return toJson(reg, opts.indent ?? 2);
    case 'markdown':
      return toMarkdown(reg);
    case 'csv':
      return toCsv(reg);
  }
}
