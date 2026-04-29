/**
 * Minimal dev-only logger.
 * In production we drop the call entirely so we don't ship debug noise to end users.
 * If/when we wire a real error tracker (Sentry, Logtail, etc.), centralise it here.
 */
const isDev =
  typeof process !== "undefined" &&
  process.env &&
  process.env.NODE_ENV !== "production";

export function logError(...args) {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.error(...args);
  }
}

export function logWarn(...args) {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.warn(...args);
  }
}
