import { useState, useEffect } from "react";

function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue; // Fallback during SSR
    }

    const storedValue = localStorage.getItem(key);

    try {
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.warn(`Error parsing localStorage value for key "${key}":`, error);
      return initialValue; // Return initial value if parsing fails
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error saving to localStorage for key "${key}":`, error);
      }
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
