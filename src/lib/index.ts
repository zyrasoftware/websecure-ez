// Main exports for websecure-ez package
export {
  createSecureMiddleware,
  sanitizeInput,
  applyCookieDefaults,
  generateNonce,
  presets,
  type WebSecureConfig,
  type CookieOptions,
} from './websecure-ez';

// Re-export everything as default for convenience
export { default } from './websecure-ez'; 