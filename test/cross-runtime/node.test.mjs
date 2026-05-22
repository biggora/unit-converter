import assert from 'node:assert/strict';
// Cross-runtime smoke test for the built artifact.
// Run with: `node --test test/cross-runtime/node.mjs` (also works under `bun test`).
import test from 'node:test';
import { convert, dataStorage, length, time } from '../../dist/index.mjs';

test('length: 5 m → 16.4042 ft', () => {
  assert.ok(Math.abs(convert(5, 'm').to('ft') - 16.404199475065617) < 1e-12);
});

test('length.units returns a non-empty list', () => {
  assert.ok(length.units.length >= 10);
});

test('time: bigint 20h → 72_000_000 ms', () => {
  assert.equal(time.bigint(20n, 'h').to('ms'), 72_000_000n);
});

test('dataStorage: 1 GiB → 1024 MiB', () => {
  assert.equal(dataStorage(1, 'GiB').to('MiB'), 1024);
});

test('errors carry a code', () => {
  try {
    convert(5, 'nonsense');
    assert.fail('expected throw');
  } catch (e) {
    assert.equal(e.code, 'E_UNKNOWN_UNIT');
  }
});
