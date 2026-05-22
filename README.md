[![npm version](https://img.shields.io/npm/v/@biggora/unit-converter.svg)](https://www.npmjs.com/package/@biggora/unit-converter)
[![Unit Tests](https://github.com/biggora/unit-converter/actions/workflows/ci.yml/badge.svg)](https://github.com/biggora/unit-converter/actions/workflows/unit-tests.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# unit-converter

> Zero-dependency, cross-runtime TypeScript micro-library for unit conversion.
> Type-safe chained API, exact BigInt arithmetic where it matters, NIST-pinned
> coefficients.

**[Live demo →](https://biggora.github.io/unit-converter/)**

```ts
import { convert } from '@biggora/unit-converter';

convert(5, 'm').to('ft');              // 16.404199475065617
convert(0, 'C', { category: 'temperature' }).to('F'); // 32
convert(5500, 'm').to('best');         // { value: 5.5, unit: 'km', ... }
convert(20n, 'h').to('ms');            // 72000000n  (exact)
```

## Why

* **Zero runtime dependencies.** Nothing to audit, nothing to vendor.
* **Cross-runtime.** Same artifact runs on Node ≥ 18, Bun, Deno, and modern browsers.
* **Tree-shakeable.** Per-category subpath exports — pull in only the categories you need.
* **Type-safe.** Unit literals are checked at compile time; `to()` only autocompletes siblings.
* **NIST-pinned.** Every imperial coefficient cites NIST SP 811 §B.8 / §B.9.
* **Exact BigInt.** Integer-aligned categories (`time`, `dataStorage`) refuse to silently truncate.

## Install

```bash
npm i @biggora/unit-converter
pnpm add @biggora/unit-converter
bun add @biggora/unit-converter
```

Deno can consume the npm package via [`jsr` interop](https://docs.deno.com/runtime/manual/node/npm_specifiers/) or `npm:@biggora/unit-converter`.

## API at a glance

```ts
// 1. Root convert — auto-routes by unit name.
import { convert } from '@biggora/unit-converter';
convert(5, 'm').to('ft');

// 2. Per-category subpath — smallest bundle (~3-4 KB gzipped each).
import { length } from '@biggora/unit-converter/length';
length(5, 'm').to('ft');

// 3. Named per-category exports from the root.
import { mass, time } from '@biggora/unit-converter';
```

Every chain returns a frozen `Converter`:

```ts
const c = convert(5, 'm');
c.category;         // 'length'
c.possibilities();  // ['m','km','cm','mm','μm', …]
c.to('ft');         // 16.4042
c.to('best');       // { value: 5, unit: 'm', category: 'length', toString() }
```

## Categories (v0.1)

| Category      | Anchor | Units                                                                          |
| ------------- | ------ | ------------------------------------------------------------------------------ |
| `length`      | m      | m, km, cm, mm, μm, nm, Å, in, ft, yd, mi, nmi, ly, au, pc                      |
| `mass`        | kg     | kg, g, mg, μg, t, lb, oz, st, ton, long-ton, gr, ct                            |
| `time`        | s      | ns, μs, ms, s, min, h, d, week, month, year                                    |
| `temperature` | K      | K, C, F, R                                                                     |
| `volume`      | m³     | m3, L, mL, cm3, mm3, km3, us-gal, us-qt, us-pt, us-cup, us-floz, us-tbsp, us-tsp, imp-gal, imp-pt, imp-floz, in3, ft3, yd3 |
| `area`        | m²     | m2, cm2, mm2, km2, ha, a, in2, ft2, yd2, mi2, acre                             |
| `speed`       | m/s    | m/s, km/h, mph, kn, ft/s, in/s, mach, c                                        |
| `dataStorage` | byte   | B, KB, MB, GB, TB, PB, KiB, MiB, GiB, TiB, PiB, bit                            |
| `angle`       | rad    | rad, deg, gon, turn, arcmin, arcsec, mrad                                      |
| `pressure`    | Pa     | Pa, hPa, kPa, MPa, GPa, bar, mbar, atm, torr, mmHg, inHg, psi                  |

Aliases are case-insensitive — `Meter`, `metres`, `°C`, `degF`, `kilogram`, `pound` all work.

## Best mode

```ts
convert(5500, 'm').to('best');           // { value: 5.5, unit: 'km' }
convert(0.005, 'm').to('best');          // { value: 5, unit: 'mm' }
length(2.5, 'mi').to('best');            // { value: 2.5, unit: 'mi' }
length(1, 'm').to('best', { system: 'imperial' }); // imperial-only candidates
```

Heuristic: pick the candidate whose magnitude is closest to √10 on the log
scale (i.e. in the [1, 10) decade with a small-integer bias). Defaults to the
input unit's measurement system, so metric inputs stay metric unless you opt out.

## BigInt mode

```ts
import { time, dataStorage } from '@biggora/unit-converter';

time.bigint(20n, 'h').to('ms');          // 72_000_000n
dataStorage.bigint(1n, 'TiB').to('B');   // 1_099_511_627_776n
time.bigint(1n, 'ms').to('s');           // throws BigIntPrecisionError
time.bigint(1n, 'month').to('s');        // throws UnitNotBigIntSafeError
```

Supported categories (v0.1): `time` (ns…week), `dataStorage` (byte-aligned).
Imperial and offset categories never participate — their ratios aren't integers.

## Errors

| Class                     | `.code`                | Cause                                          |
| ------------------------- | ---------------------- | ---------------------------------------------- |
| `UnknownUnitError`        | `E_UNKNOWN_UNIT`       | Unit name not registered (with `.suggestions`) |
| `IncompatibleUnitsError`  | `E_INCOMPATIBLE_UNITS` | Cross-category `to()`                          |
| `InvalidValueError`       | `E_INVALID_VALUE`      | NaN, ±Infinity, wrong type, overflow           |
| `BigIntPrecisionError`    | `E_BIGINT_PRECISION`   | BigInt conversion would lose precision         |
| `UnitNotBigIntSafeError`  | `E_BIGINT_UNSAFE`      | Unit has no `bigintRatio`                      |
| `AmbiguousUnitError`      | `E_AMBIGUOUS_UNIT`     | Name resolves to ≥2 categories                 |

All extend `UnitConverterError extends Error`. Catch the base for a single check.

## Precision

* Linear conversions: relative error `< 1e-12` for inputs up to `1e15`.
* Temperature: absolute error `< 1e-9 K` (offset arithmetic with FP).
* Extreme ratios (e.g. `ly → in ≈ 3.7e17`) drop 1–2 least significant digits — use
  BigInt for integer-aligned domains or accept the IEEE-754 limit.

## Cross-runtime

CI runs the published tarball against Node ≥ 18, Bun, and Deno. The same `dist/`
artifact serves all three — no conditional code paths.

## Tree-shaking

```ts
import { length } from '@biggora/unit-converter/length';
length(5, 'm').to('ft');
// → bundle contains only length, not mass/time/etc.
```

Each subpath entry is a self-contained ESM/CJS pair (~3–4 KB gzipped).

## License

MIT
