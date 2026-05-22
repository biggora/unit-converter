// @ts-check
/**
 * unit-converter — demo playground controller.
 *
 * Loads the built ESM bundle from ./lib/index.mjs (populated at build time by
 * the Pages workflow; locally: `cp dist/index.mjs* demo/lib/`).
 */
import {
  UnitConverterError,
  angle,
  area,
  convert,
  dataStorage,
  length,
  mass,
  pressure,
  speed,
  temperature,
  time,
  volume,
} from './lib/index.mjs';

const CATEGORIES = /** @type {const} */ ({
  length,
  mass,
  time,
  temperature,
  volume,
  area,
  speed,
  dataStorage,
  angle,
  pressure,
});

const $ = (/** @type {string} */ id) => /** @type {HTMLElement} */ (document.getElementById(id));

const categorySelect = /** @type {HTMLSelectElement} */ ($('category-select'));
const fromSelect = /** @type {HTMLSelectElement} */ ($('from-select'));
const toSelect = /** @type {HTMLSelectElement} */ ($('to-select'));
const valueInput = /** @type {HTMLInputElement} */ ($('value-input'));
const bestToggle = /** @type {HTMLInputElement} */ ($('best-toggle'));
const resultEl = $('result');
const resultNumber = $('result-number');
const resultUnit = $('result-unit');
const resultMeta = $('result-meta');

const CATEGORY_LABELS = {
  length: 'Length',
  mass: 'Mass',
  time: 'Time',
  temperature: 'Temperature',
  volume: 'Volume',
  area: 'Area',
  speed: 'Speed',
  dataStorage: 'Data storage',
  angle: 'Angle',
  pressure: 'Pressure',
};

for (const key of Object.keys(CATEGORIES)) {
  const opt = document.createElement('option');
  opt.value = key;
  opt.textContent = CATEGORY_LABELS[key] ?? key;
  categorySelect.appendChild(opt);
}

const DEFAULTS = {
  length: { from: 'm', to: 'ft', value: 5 },
  mass: { from: 'kg', to: 'lb', value: 1 },
  time: { from: 'h', to: 'min', value: 1 },
  temperature: { from: 'C', to: 'F', value: 0 },
  volume: { from: 'L', to: 'us-gal', value: 1 },
  area: { from: 'm2', to: 'ft2', value: 10 },
  speed: { from: 'km/h', to: 'mph', value: 100 },
  dataStorage: { from: 'GiB', to: 'MiB', value: 1 },
  angle: { from: 'deg', to: 'rad', value: 180 },
  pressure: { from: 'atm', to: 'Pa', value: 1 },
};

function unitLabel(
  /** @type {string} */ key,
  /** @type {(unit: string) => { name: string; symbol?: string }} */ describe,
) {
  try {
    const def = describe(key);
    const symbol = def.symbol && def.symbol !== key ? `  (${def.symbol})` : '';
    return `${key} — ${def.name}${symbol}`;
  } catch {
    return key;
  }
}

function populateUnitSelects(/** @type {keyof typeof CATEGORIES} */ key) {
  const fn = CATEGORIES[key];
  const def = DEFAULTS[key];

  for (const sel of [fromSelect, toSelect]) {
    sel.textContent = '';
    for (const u of fn.units) {
      const opt = document.createElement('option');
      opt.value = u;
      opt.textContent = unitLabel(u, fn.describe);
      sel.appendChild(opt);
    }
  }
  fromSelect.value = def.from;
  toSelect.value = def.to;
  valueInput.value = String(def.value);
}

function format(/** @type {number} */ v) {
  if (!Number.isFinite(v)) return String(v);
  if (Number.isInteger(v) && Math.abs(v) < 1e16) return v.toString();
  const abs = Math.abs(v);
  if (abs !== 0 && (abs < 1e-4 || abs >= 1e16)) return v.toExponential(6);
  return Number(v.toPrecision(8)).toString();
}

function showError(/** @type {string} */ msg) {
  resultEl.classList.add('is-error');
  resultNumber.textContent = msg;
  resultUnit.textContent = '';
  resultMeta.textContent = '';
}

function showResult(
  /** @type {string} */ number,
  /** @type {string} */ unit,
  /** @type {string} */ meta,
) {
  resultEl.classList.remove('is-error');
  resultNumber.textContent = number;
  resultUnit.textContent = unit;
  resultMeta.textContent = meta;
}

function compute() {
  const catKey = /** @type {keyof typeof CATEGORIES} */ (categorySelect.value);
  const fn = CATEGORIES[catKey];
  const fromUnit = fromSelect.value;
  const toUnit = toSelect.value;
  const rawValue = valueInput.value;

  if (rawValue === '' || rawValue == null) {
    showError('Enter a value');
    return;
  }
  const value = Number(rawValue);
  if (!Number.isFinite(value)) {
    showError('Value must be a finite number');
    return;
  }

  try {
    const converter = fn(value, fromUnit);
    if (bestToggle.checked) {
      const best = converter.to('best');
      showResult(format(best.value), best.unit, `best · ${best.toString()}`);
    } else {
      const out = /** @type {number} */ (converter.to(toUnit));
      let symbol = toUnit;
      try {
        const desc = fn.describe(toUnit);
        if (desc.symbol) symbol = desc.symbol;
      } catch {
        /* ignore — keep raw key */
      }
      showResult(format(out), symbol, `${value} ${fromUnit} → ${toUnit}`);
    }
  } catch (err) {
    if (err instanceof UnitConverterError) {
      showError(`${err.code}: ${err.message}`);
    } else {
      showError(String(err));
    }
  }
}

categorySelect.addEventListener('change', () => {
  populateUnitSelects(/** @type {keyof typeof CATEGORIES} */ (categorySelect.value));
  compute();
});
for (const el of [fromSelect, toSelect, valueInput, bestToggle]) {
  el.addEventListener('input', compute);
}

categorySelect.value = 'length';
populateUnitSelects('length');
compute();

// ─── BigInt presets ────────────────────────────────────────────────────────
const presets = [
  {
    label: '20n h → ms',
    call: 'time.bigint(20n, "h").to("ms")',
    run: () => time.bigint(20n, 'h').to('ms'),
  },
  {
    label: '1n d → ns',
    call: 'time.bigint(1n, "d").to("ns")',
    run: () => time.bigint(1n, 'd').to('ns'),
  },
  {
    label: '1n TiB → B',
    call: 'dataStorage.bigint(1n, "TiB").to("B")',
    run: () => dataStorage.bigint(1n, 'TiB').to('B'),
  },
  {
    label: '1n PB → MB',
    call: 'dataStorage.bigint(1n, "PB").to("MB")',
    run: () => dataStorage.bigint(1n, 'PB').to('MB'),
  },
  {
    label: '1n ms → s (lossy)',
    call: 'time.bigint(1n, "ms").to("s")',
    run: () => time.bigint(1n, 'ms').to('s'),
  },
  {
    label: '1n KB → KiB (lossy)',
    call: 'dataStorage.bigint(1n, "KB").to("KiB")',
    run: () => dataStorage.bigint(1n, 'KB').to('KiB'),
  },
];

function makePreset(/** @type {(typeof presets)[number]} */ p) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'preset';

  const callSpan = document.createElement('span');
  callSpan.className = 'preset-call';
  callSpan.textContent = p.call;

  const outSpan = document.createElement('span');
  outSpan.className = 'preset-out';

  btn.append(callSpan, outSpan);

  function update() {
    try {
      const v = p.run();
      outSpan.textContent = `${v.toString()}n`;
      btn.classList.remove('is-error');
    } catch (err) {
      outSpan.textContent =
        err instanceof UnitConverterError ? `${err.code} — ${err.message}` : String(err);
      btn.classList.add('is-error');
    }
  }
  btn.addEventListener('click', update);
  update();
  return btn;
}

const presetsRoot = $('bigint-presets');
for (const p of presets) presetsRoot.appendChild(makePreset(p));

// ─── Errors showcase ───────────────────────────────────────────────────────
const errorOutput = $('error-output');
const scenarios = [
  {
    label: 'UnknownUnitError',
    call: 'convert(1, "meterz")',
    run: () => convert(1, /** @type {any} */ ('meterz')),
  },
  {
    label: 'IncompatibleUnitsError',
    call: 'convert(5, "m").to("kg")',
    run: () => convert(5, 'm').to(/** @type {any} */ ('kg')),
  },
  {
    label: 'InvalidValueError (NaN)',
    call: 'convert(NaN, "m")',
    run: () => convert(Number.NaN, 'm'),
  },
  {
    label: 'AmbiguousUnitError',
    call: 'convert(1, "c")',
    run: () => convert(1, /** @type {any} */ ('c')),
  },
  {
    label: 'BigIntPrecisionError',
    call: 'time.bigint(1n, "ms").to("s")',
    run: () => time.bigint(1n, 'ms').to('s'),
  },
  {
    label: 'UnitNotBigIntSafeError',
    call: 'time.bigint(1n, "month").to("s")',
    run: () => time.bigint(1n, 'month').to('s'),
  },
];

const errorButtons = $('error-buttons');
for (const sc of scenarios) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = sc.label;
  btn.addEventListener('click', () => {
    let text = `> ${sc.call}\n\n`;
    try {
      sc.run();
      text += '(no error thrown — unexpected)';
    } catch (err) {
      if (err instanceof UnitConverterError) {
        const lines = [
          `name:        ${err.name}`,
          `code:        ${err.code}`,
          `message:     ${err.message}`,
        ];
        if (
          'suggestions' in err &&
          Array.isArray(/** @type {any} */ (err).suggestions) &&
          /** @type {any} */ (err).suggestions.length
        ) {
          lines.push(`suggestions: ${/** @type {any} */ (err).suggestions.join(', ')}`);
        }
        if ('cause' in err && /** @type {any} */ (err).cause) {
          lines.push(`cause:       ${String(/** @type {any} */ (err).cause)}`);
        }
        text += lines.join('\n');
      } else {
        text += String(err);
      }
    }
    errorOutput.textContent = text;
  });
  errorButtons.appendChild(btn);
}
