import { safeParse, safeStringify } from '../utils/helpers';

/**
 * Storage Manager - Singleton pattern for localStorage management
 * Provides type-safe wrapper around browser localStorage
 */
export class StorageManager {
  private static instance: StorageManager;

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  /**
   * Save data to localStorage
   */
  save<T>(key: string, data: T): void {
    try {
      const serialized = safeStringify(data);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Error saving to localStorage [${key}]:`, error);
    }
  }

  /**
   * Load data from localStorage
   */
  load<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }
      return safeParse(item, defaultValue);
    } catch (error) {
      console.error(`Error loading from localStorage [${key}]:`, error);
      return defaultValue;
    }
  }

  /**
   * Remove item from localStorage
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage [${key}]:`, error);
    }
  }

  /**
   * Clear all items
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * Check if key exists
   */
  has(key: string): boolean {
    try {
      return localStorage.getItem(key) !== null;
    } catch {
      return false;
    }
  }

  /**
   * Get all keys
   */
  getAllKeys(): string[] {
    try {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          keys.push(key);
        }
      }
      return keys;
    } catch {
      return [];
    }
  }

  /**
   * Get storage size
   */
  getSize(): number {
    try {
      let size = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const item = localStorage.getItem(key);
          if (item) {
            size += item.length + key.length;
          }
        }
      }
      return size;
    } catch {
      return 0;
    }
  }
}

export default StorageManager.getInstance();
