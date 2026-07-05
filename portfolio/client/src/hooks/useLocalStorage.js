import { useState } from 'react'

/**
 * useLocalStorage
 * A useState wrapper that persists value in localStorage.
 *
 * @param {string} key - localStorage key
 * @param {*} initialValue - default value if key doesn't exist
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (err) {
      console.error(`useLocalStorage error for key "${key}":`, err)
    }
  }

  return [storedValue, setValue]
}