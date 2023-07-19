/* eslint-disable no-unused-vars */

export const useLocalStorage = <T>(
  name: string,
): [() => T | null, (item: T) => void, () => void] => {
  const getLocalStorage = (): T | null => {
    const local = localStorage.getItem(name);
    if (local != null) {
      return JSON.parse(local) as T;
    }
    return null;
  };
  const setLocalStorage = (item: T) => {
    localStorage.setItem(name, JSON.stringify(item));
  };
  const removeLocalStorage = () => {
    return localStorage.removeItem(name);
  };
  return [getLocalStorage, setLocalStorage, removeLocalStorage];
};
