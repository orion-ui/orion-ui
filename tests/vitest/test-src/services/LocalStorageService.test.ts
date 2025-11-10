import { describe, it, expect, afterEach } from 'vitest';
import useLocalStorage from '../../../../services/LocalStorageService';

const originalLocalStorage = global.localStorage;

describe('useLocalStorage()', () => {
  afterEach(() => {
    Object.defineProperty(global, 'localStorage', {
      value: originalLocalStorage,
      writable: true,
    });
  });

  it('should return the localStorage object when it is defined (browser environment)', () => {
    const result = useLocalStorage();

    expect(result).toBeDefined();
    expect(result).toBe(originalLocalStorage);
  });

  it('should return undefined when localStorage is not defined (SSR environment)', () => {
   Object.defineProperty(global, 'localStorage', {
      value: undefined,
      writable: true,
    });

    const result = useLocalStorage();

    expect(result).toBeUndefined();
  });
});