/**
 * CLI entry point: dump the full unit registry to a file in JSON, Markdown,
 * or CSV format.
 *
 *   pnpm export:registry                                 # JSON → dist/registry.json
 *   pnpm export:registry --format markdown               # Markdown → dist/registry.md
 *   pnpm export:registry --format csv                    # CSV → dist/registry.csv
 *   pnpm export:registry --format json --out path.json   # custom destination
 *
 * @module
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { type ExportFormat, exportRegistry } from '../src';

const FORMAT_EXT: Record<ExportFormat, string> = {
  object: 'json',
  json: 'json',
  markdown: 'md',
  csv: 'csv',
};

function parseArg(argv: readonly string[], name: string): string | undefined {
  const idx = argv.indexOf(name);
  return idx >= 0 ? argv[idx + 1] : undefined;
}

function parseFormat(argv: readonly string[]): Exclude<ExportFormat, 'object'> {
  const raw = parseArg(argv, '--format') ?? 'json';
  if (raw === 'json' || raw === 'markdown' || raw === 'csv') return raw;
  throw new Error(`Unknown --format "${raw}". Expected: json | markdown | csv.`);
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const format = parseFormat(argv);
  const outArg = parseArg(argv, '--out');
  const outPath = resolve(outArg ?? `dist/registry.${FORMAT_EXT[format]}`);

  let body: string;
  if (format === 'json') body = exportRegistry({ format: 'json' });
  else if (format === 'markdown') body = exportRegistry({ format: 'markdown' });
  else body = exportRegistry({ format: 'csv' });

  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, body.endsWith('\n') ? body : `${body}\n`, 'utf8');

  const reg = exportRegistry();
  const totalUnits = reg.categories.reduce((n, c) => n + c.units.length, 0);
  console.log(
    `Exported ${totalUnits} units across ${reg.categories.length} categories as ${format} → ${outPath}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
