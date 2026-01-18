import { useState, useEffect, useLayoutEffect } from 'react';

// Hook para travar o scroll do body de forma segura
export const useScrollLock = (lock: boolean) => {
  useLayoutEffect(() => {
    if (lock) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      // Retorna uma função de limpeza que restaura ao estado anterior
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [lock]);
};

// Hook para LocalStorage seguro (evita crash se JSON for inválido)
export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Erro ao ler localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Erro ao salvar localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};
