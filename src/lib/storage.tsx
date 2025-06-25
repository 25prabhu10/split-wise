const LocalStorage = {
  /**
   * Set a value in localStorage with type safety
   * @param key - The storage key
   * @param value - The value to store
   */
  set(key: string, value: unknown): void {
    try {
      const serializedValue = typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value)
      localStorage.setItem(key, serializedValue)
    } catch (error) {
      console.error(`Failed to set localStorage key "${key}":`, error)
    }
  }
}

export default LocalStorage
