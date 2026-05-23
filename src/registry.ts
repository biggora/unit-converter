/**
 * Tree-shake-friendly subpath that exposes only the registry-export API.
 *
 * ```ts
 * import { exportRegistry } from '@biggora/unit-converter/registry';
 * ```
 *
 * @module
 */

export {
  type ExportedCategory,
  type ExportedRegistry,
  type ExportedUnit,
  exportRegistry,
} from './core/exporter.js';
