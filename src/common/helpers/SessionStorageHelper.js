// Note: Deconstruct if a JS object is returned to avoid runtime errors.

import { useState, useEffect } from 'react';

const getSessionStorage = (key, defaultValue) => {
  const value = sessionStorage.getItem(key);

  if (!value) return defaultValue;

  return JSON.parse(value);
};

export const useSessionStorage = (key, defaultValue = null) => {
  const [value, setValue] = useState(getSessionStorage(key, defaultValue));

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}