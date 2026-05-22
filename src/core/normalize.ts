/**
 * String normalization and fuzzy-suggestion helpers used by the registry.
 *
 * No external dependencies — the Damerau-Levenshtein implementation is a
 * compact dynamic-programming table sized for short unit names.
 *
 * @module
 */

/**
 * Canonicalize a unit name for lookup. Case-insensitive; preserves Unicode
 * letters so symbols like `°C`, `μm`, `Å` keep their characters.
 */
export function normalizeUnit(name: string): string {
  return name.trim().toLowerCase();
}

/**
 * Damerau-Levenshtein distance with transpositions, bounded to 32×32 to keep
 * the inner table small. Returns `Infinity` if either string is too long.
 */
export function damerauLevenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  if (a.length > 32 || b.length > 32) return Number.POSITIVE_INFINITY;

  const m = a.length;
  const n = b.length;
  const d: number[] = new Array((m + 1) * (n + 1));
  const at = (i: number, j: number): number => i * (n + 1) + j;

  for (let i = 0; i <= m; i++) d[at(i, 0)] = i;
  for (let j = 0; j <= n; j++) d[at(0, j)] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
      const ins = (d[at(i, j - 1)] ?? 0) + 1;
      const del = (d[at(i - 1, j)] ?? 0) + 1;
      const sub = (d[at(i - 1, j - 1)] ?? 0) + cost;
      let v = Math.min(ins, del, sub);
      if (
        i > 1 &&
        j > 1 &&
        a.charCodeAt(i - 1) === b.charCodeAt(j - 2) &&
        a.charCodeAt(i - 2) === b.charCodeAt(j - 1)
      ) {
        v = Math.min(v, (d[at(i - 2, j - 2)] ?? 0) + 1);
      }
      d[at(i, j)] = v;
    }
  }
  return d[at(m, n)] ?? 0;
}

/**
 * Return up to {@link limit} closest matches to {@link query} from
 * {@link candidates}, sorted by distance ascending. Matches with distance > 3
 * are filtered out — beyond that the suggestion is more confusing than useful.
 */
export function suggest(query: string, candidates: Iterable<string>, limit = 3): readonly string[] {
  const q = normalizeUnit(query);
  const scored: { name: string; d: number }[] = [];
  for (const c of candidates) {
    const d = damerauLevenshtein(q, normalizeUnit(c));
    if (d <= 3) scored.push({ name: c, d });
  }
  scored.sort((a, b) => a.d - b.d || a.name.length - b.name.length);
  return scored.slice(0, limit).map((s) => s.name);
}
