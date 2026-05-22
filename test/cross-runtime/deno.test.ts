// Cross-runtime smoke test under Deno.
// Run with: `deno test --allow-read test/cross-runtime/deno.test.ts`
import { assertAlmostEquals, assertEquals } from 'jsr:@std/assert';
import { convert, length, time } from '../../dist/index.mjs';

Deno.test('length: 5 m ≈ 16.4042 ft', () => {
  assertAlmostEquals(convert(5, 'm').to('ft'), 16.404199475065617, 1e-12);
});

Deno.test('length.units non-empty', () => {
  assertEquals(length.units.length >= 10, true);
});

Deno.test('time bigint 20h → 72_000_000 ms', () => {
  assertEquals(time.bigint(20n, 'h').to('ms'), 72_000_000n);
});
