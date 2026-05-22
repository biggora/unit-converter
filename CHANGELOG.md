# Changelog

All notable changes to `unit-converter` are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] — Unreleased

### Added

- Initial release covering the v0.1 MVP roadmap.
- Chainable root API: `convert(value, from).to(target | 'best')`.
- Per-category subpath exports (`unit-converter/length`, `…/mass`, …).
- 10 categories: `length`, `mass`, `time`, `temperature`, `volume`, `area`,
  `speed`, `dataStorage`, `angle`, `pressure`.
- Exact BigInt arithmetic for `time` (ns…week) and `dataStorage` (byte-aligned).
- `to('best')` heuristic with system inference.
- Damerau-Levenshtein suggestions on `UnknownUnitError`.
- Error hierarchy: `UnitConverterError` with six concrete subclasses.
- NIST SP 811 §B.8 / §B.9 golden-table tests.
- Cross-runtime smoke tests (Node, Bun, Deno).
- Bundle-size budgets enforced in CI.
