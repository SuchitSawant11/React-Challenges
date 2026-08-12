import { useEffect, useState } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [
  T,
  (value: T | ((prev: T) => T)) => void
] {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key)

      if (storedValue === null) {
        return initialValue
      }

      return JSON.parse(storedValue) as T
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore localStorage write errors
    }
  }, [key, value])

  const setStoredValue = (
    newValue: T | ((prev: T) => T)
  ) => {
    setValue(newValue)
  }

  return [value, setStoredValue]
}