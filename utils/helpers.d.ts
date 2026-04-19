/**
 * Utility helper functions
 */
/**
 * Debounce function to limit function execution frequency
 */
export declare function debounce<T extends (...args: unknown[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void;
/**
 * Throttle function to limit function execution to fixed intervals
 */
export declare function throttle<T extends (...args: unknown[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void;
/**
 * Generate unique ID
 */
export declare function generateId(prefix?: string): string;
/**
 * Get current timestamp
 */
export declare function getCurrentTimestamp(): number;
/**
 * Check if array is empty
 */
export declare function isEmpty<T>(arr: T[]): boolean;
/**
 * Format date to readable string
 */
export declare function formatDate(timestamp: number): string;
/**
 * Clone object (shallow copy)
 */
export declare function shallowClone<T>(obj: T): T;
/**
 * Merge objects
 */
export declare function mergeObjects<T extends Record<string, unknown>>(...objects: T[]): T;
/**
 * Filter array by predicate
 */
export declare function filterArray<T>(array: T[], predicate: (item: T) => boolean): T[];
/**
 * Find first matching item
 */
export declare function findItem<T>(array: T[], predicate: (item: T) => boolean): T | undefined;
/**
 * Map array with transformation
 */
export declare function mapArray<T, R>(array: T[], mapper: (item: T, index: number) => R): R[];
/**
 * Check if query matches item (simple text search)
 */
export declare function matchesQuery(text: string, query: string): boolean;
/**
 * Capitalize first letter of string
 */
export declare function capitalize(str: string): string;
/**
 * Parse query string from URL
 */
export declare function parseQueryString(query?: string): Record<string, string>;
/**
 * Build query string from object
 */
export declare function buildQueryString(params: Record<string, unknown>): string;
/**
 * Safe JSON parse
 */
export declare function safeParse<T>(json: string, defaultValue: T): T;
/**
 * Safe JSON stringify
 */
export declare function safeStringify(obj: unknown): string;
//# sourceMappingURL=helpers.d.ts.map