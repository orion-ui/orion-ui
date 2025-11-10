
import { describe, it, expect, vi, beforeEach } from 'vitest';
import usePluralize from '../../../../services/PluralizeService';
import useLang from '../../../../services/LangService';

vi.mock('../../../../services/LangService', () => ({
  default: vi.fn(),
}));

describe('usePluralize', () => {
  const pluralizeMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useLang as vi.Mock).mockReturnValue({
      pluralize: pluralizeMock,
    });
  });

  it('should call the pluralize method from LangService with correct arguments', () => {
    const words = 'item';
    const quantity = 5;
    const quantityIncluded = true;

    usePluralize(words, quantity, quantityIncluded);

    expect(useLang).toHaveBeenCalledOnce();
    expect(pluralizeMock).toHaveBeenCalledOnce();
    expect(pluralizeMock).toHaveBeenCalledWith(words, quantity, quantityIncluded);
  });

  it('should pass `undefined` for quantityIncluded when it is not provided', () => {
    const words = 'box';
    const quantity = 10;

    usePluralize(words, quantity);

    expect(pluralizeMock).toHaveBeenCalledWith(words, quantity, undefined);
  });

  it('should return the value from the LangService pluralize method', () => {
    const expectedResult = '5 items';
    pluralizeMock.mockReturnValue(expectedResult);

    const result = usePluralize('item', 5, true);

    expect(result).toBe(expectedResult);
  });
});
