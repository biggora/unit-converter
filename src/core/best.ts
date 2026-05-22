/**
 * `to('best')` heuristic: pick the unit that renders the input as a
 * human-friendly magnitude.
 *
 * Rule: among the candidate units, prefer the one whose converted absolute
 * value is the smallest that is still `>= 1`. If no candidate satisfies that
 * (e.g. the input is microscopic), pick the candidate with the largest
 * absolute magnitude. The result for `value === 0` is the canonical anchor.
 *
 * @module
 */

import { affineConvert } from './math.js';
import type { BestOptions, BestResult, CategoryDef, UnitDef } from './types.js';

interface Candidate {
  readonly unit: string;
  readonly def: UnitDef;
  readonly value: number;
}

/**
 * @internal
 */
export function pickBest(
  value: number,
  from: UnitDef,
  category: CategoryDef,
  opts: BestOptions | undefined,
): BestResult {
  // System default: explicit opt → input unit's own system → no filter.
  const system = opts?.system ?? from.system;
  const predicate = opts?.predicate;

  const collect = (filterSystem: string | undefined): Candidate[] => {
    const out: Candidate[] = [];
    for (const key of Object.keys(category.units)) {
      const def = category.units[key];
      if (!def) continue;
      if (filterSystem && def.system !== filterSystem) continue;
      const v = affineConvert(value, from, def);
      if (predicate && !predicate({ unit: key, value: v })) continue;
      out.push({ unit: key, def, value: v });
    }
    return out;
  };

  let candidates = collect(system);
  // Graceful fallback: if the (default) system filter eliminates every unit,
  // retry without the filter so 'best' never throws on legal inputs.
  if (candidates.length === 0 && !opts?.system) candidates = collect(undefined);

  if (candidates.length === 0) {
    const anchor = category.units[category.anchor];
    if (!anchor) {
      throw new Error(`Category "${category.name}" has no anchor unit "${category.anchor}".`);
    }
    return makeResult(affineConvert(value, from, anchor), category.anchor, category.name, anchor);
  }

  const picked = chooseCandidate(candidates);
  return makeResult(picked.value, picked.unit, category.name, picked.def);
}

/**
 * Geometric-midpoint heuristic: the most readable rendering is the one whose
 * magnitude is closest to √10 (≈ 3.16) on the log scale — i.e. in the [1, 10)
 * decade with a slight bias to small integers like 2 or 5.
 *
 * Zero is special-cased: pick the first candidate (stable, anchor-favouring).
 *
 * @internal
 */
function chooseCandidate(candidates: readonly Candidate[]): Candidate {
  const TARGET_LOG = 0.5; // log10(√10)
  let best: Candidate | undefined;
  let bestDist = Number.POSITIVE_INFINITY;
  let zeroCandidate: Candidate | undefined;

  for (const c of candidates) {
    const abs = Math.abs(c.value);
    if (abs === 0) {
      if (!zeroCandidate) zeroCandidate = c;
      continue;
    }
    const dist = Math.abs(Math.log10(abs) - TARGET_LOG);
    if (dist < bestDist) {
      best = c;
      bestDist = dist;
    }
  }
  return best ?? (zeroCandidate as Candidate) ?? (candidates[0] as Candidate);
}

function makeResult(value: number, unit: string, category: string, def: UnitDef): BestResult {
  const symbol = def.symbol ?? unit;
  return Object.freeze({
    value,
    unit,
    category,
    toString(): string {
      return `${formatNumber(value)} ${symbol}`;
    },
  });
}

function formatNumber(v: number): string {
  if (!Number.isFinite(v)) return String(v);
  if (Number.isInteger(v) && Math.abs(v) < 1e16) return v.toString();
  const abs = Math.abs(v);
  if (abs !== 0 && (abs < 1e-4 || abs >= 1e16)) return v.toExponential(4);
  return Number(v.toPrecision(6)).toString();
}
