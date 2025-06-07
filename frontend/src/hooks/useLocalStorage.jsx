import { useState } from "react";

/**
 * useLocalStorage
 *  - Custom hook to keep a state variable in sync with localStorage.
 *  - key: string, initialValue: any
 */
export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error("useLocalStorage getError:", err);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err) {
      console.error("useLocalStorage setError:", err);
    }
  };

  return [storedValue, setValue];
}
