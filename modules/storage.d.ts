/**
 * Storage Manager - Singleton pattern for localStorage management
 * Provides type-safe wrapper around browser localStorage
 */
export declare class StorageManager {
    private static instance;
    private constructor();
    /**
     * Get singleton instance
     */
    static getInstance(): StorageManager;
    /**
     * Save data to localStorage
     */
    save<T>(key: string, data: T): void;
    /**
     * Load data from localStorage
     */
    load<T>(key: string, defaultValue: T): T;
    /**
     * Remove item from localStorage
     */
    remove(key: string): void;
    /**
     * Clear all items
     */
    clear(): void;
    /**
     * Check if key exists
     */
    has(key: string): boolean;
    /**
     * Get all keys
     */
    getAllKeys(): string[];
    /**
     * Get storage size
     */
    getSize(): number;
}
declare const _default: StorageManager;
export default _default;
//# sourceMappingURL=storage.d.ts.map