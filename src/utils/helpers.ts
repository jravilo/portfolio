/**
 * Utility helper functions
 */

/**
 * Debounce function to limit function execution frequency
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | undefined;
  
  return function debounced(...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

/**
 * Throttle function to limit function execution to fixed intervals
 */
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function throttled(...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Generate unique ID
 */
export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 9);
  return prefix ? `${prefix}-${timestamp}-${randomPart}` : `${timestamp}-${randomPart}`;
}

/**
 * Get current timestamp
 */
export function getCurrentTimestamp(): number {
  return Date.now();
}

/**
 * Check if array is empty
 */
export function isEmpty<T>(arr: T[]): boolean {
  return arr.length === 0;
}

/**
 * Format date to readable string
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Clone object (shallow copy)
 */
export function shallowClone<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return [...(obj as unknown[])] as unknown as T;
  }
  if (obj !== null && typeof obj === 'object') {
    return { ...(obj as Record<string, unknown>) } as T;
  }
  return obj;
}

/**
 * Merge objects
 */
export function mergeObjects<T extends Record<string, unknown>>(
  ...objects: T[]
): T {
  return Object.assign({}, ...objects) as T;
}

/**
 * Filter array by predicate
 */
export function filterArray<T>(
  array: T[],
  predicate: (item: T) => boolean
): T[] {
  return array.filter(predicate);
}

/**
 * Find first matching item
 */
export function findItem<T>(
  array: T[],
  predicate: (item: T) => boolean
): T | undefined {
  return array.find(predicate);
}

/**
 * Map array with transformation
 */
export function mapArray<T, R>(
  array: T[],
  mapper: (item: T, index: number) => R
): R[] {
  return array.map(mapper);
}

/**
 * Check if query matches item (simple text search)
 */
export function matchesQuery(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Parse query string from URL
 */
export function parseQueryString(query?: string): Record<string, string> {
  const params = new URLSearchParams(query || window.location.search);
  const obj: Record<string, string> = {};
  params.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

/**
 * Build query string from object
 */
export function buildQueryString(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
}

/**
 * Safe JSON parse
 */
export function safeParse<T>(json: string, defaultValue: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return defaultValue;
  }
}

/**
 * Safe JSON stringify
 */
export function safeStringify(obj: unknown): string {
  try {
    return JSON.stringify(obj);
  } catch {
    return '{}';
  }
}
