
import { describe, it, expect, vi } from 'vitest';
import useDocument from '../../../../services/DocumentService';

describe('useDocument', () => {
  it('should return the document object when it is defined (browser environment)', () => {
    expect(useDocument()).toBe(document);
  });

  it('should return undefined when document is not defined (SSR environment)', () => {
    vi.stubGlobal('document', undefined);

    expect(useDocument()).toBeUndefined();

  });
});
