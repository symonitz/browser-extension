// matcher.js

/**
 * Checks if a URL starts with any watched domain/prefix
 * @param {string} url - The full request URL
 * @param {Array<string>} watchedPaths - List of URL prefixes (from sync)
 * @returns {boolean} - True if the URL should be reported to the server
 */
export function matchRequest(url, watchedPaths) {
    return watchedPaths.some((prefix) => url.startsWith(prefix));
  }
  