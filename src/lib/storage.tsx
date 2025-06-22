const LocalStorage = {
  /**
   * Clear all localStorage data
   */
  clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Failed to clear localStorage:', error)
    }
  },

  /**
   * Get a value from localStorage with type safety
   * @param key - The storage key
   * @param defaultValue - Default value if key doesn't exist
   * @returns The stored value or default value
   */
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key)
      if (item === null) {
        return defaultValue
      }
      return JSON.parse(item) as T
    } catch (error) {
      console.error(`Failed to get localStorage key "${key}":`, error)
      return defaultValue
    }
  },

  /**
   * Get a value from localStorage that might not exist
   * @param key - The storage key
   * @returns The stored value or null
   */
  getOptional(key: string) {
    try {
      const item = localStorage.getItem(key)
      if (item === null) {
        return null
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return JSON.parse(item)
    } catch (error) {
      console.error(`Failed to get localStorage key "${key}":`, error)
      return null
    }
  },

  /**
   * Check if a key exists in localStorage
   * @param key - The storage key to check
   * @returns True if key exists, false otherwise
   */
  has(key: string): boolean {
    try {
      return localStorage.getItem(key) !== null
    } catch (error) {
      console.error(`Failed to check localStorage key "${key}":`, error)
      return false
    }
  },

  /**
   * Remove a key from localStorage
   * @param key - The storage key to remove
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Failed to remove localStorage key "${key}":`, error)
    }
  },

  /**
   * Set a value in localStorage with type safety
   * @param key - The storage key
   * @param value - The value to store
   */
  set(key: string, value: unknown): void {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(key, serializedValue)
    } catch (error) {
      console.error(`Failed to set localStorage key "${key}":`, error)
    }
  }
}

export default LocalStorage
