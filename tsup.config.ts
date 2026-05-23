import { defineConfig } from 'tsup';

const CATEGORIES = [
  'length',
  'mass',
  'time',
  'temperature',
  'volume',
  'area',
  'speed',
  'data-storage',
  'angle',
  'pressure',
] as const;

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    registry: 'src/registry.ts',
    constants: 'src/constants/index.ts',
    ...Object.fromEntries(CATEGORIES.map((c) => [c, `src/categories/${c}.ts`])),
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  treeshake: true,
  splitting: false,
  sourcemap: true,
  target: 'es2022',
  outExtension: ({ format }) => ({ js: format === 'esm' ? '.mjs' : '.cjs' }),
});
