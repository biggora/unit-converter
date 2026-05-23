/**
 * CLI entry point: dump the full unit registry to a JSON file.
 *
 *   pnpm export:registry                 # writes ./dist/registry.json
 *   pnpm export:registry --out path.json # custom destination
 *
 * @module
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { exportRegistry } from '../src';

function parseOut(argv: readonly string[]): string {
  const idx = argv.indexOf('--out');
  const next = idx >= 0 ? argv[idx + 1] : undefined;
  if (next) return resolve(next);
  return resolve('dist/registry.json');
}

async function main(): Promise<void> {
  const outPath = parseOut(process.argv.slice(2));
  const data = exportRegistry();
  const json = JSON.stringify(data, null, 2);

  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, `${json}\n`, 'utf8');

  const totalUnits = data.categories.reduce((n, c) => n + c.units.length, 0);
  console.log(
    `Exported ${totalUnits} units across ${data.categories.length} categories → ${outPath}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
