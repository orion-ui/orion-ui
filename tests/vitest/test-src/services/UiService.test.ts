import { describe, it, expect, vi, afterEach } from 'vitest';

const getUidMock = vi.fn();

vi.mock('../../../../utils/tools', () => ({
  getUid: getUidMock,
}));

describe('UiService', () => {
  afterEach(() => {
    vi.resetModules();
    getUidMock.mockClear();
  });

  it('should return a singleton instance', async () => {
    const { default: useUi } = await import('../../../../services/UiService');
    
    const instance1 = useUi();
    const instance2 = useUi();

    expect(instance1).toBe(instance2);
  });

  it('should initialize with a token provided by getUid', async () => {
    const initialToken = 'mocked-initial-uid';
    getUidMock.mockReturnValue(initialToken);

    const { default: useUi } = await import('../../../../services/UiService');
    const uiService = useUi();

    expect(uiService.token).toBe(initialToken);
    expect(getUidMock).toHaveBeenCalledTimes(1);
  });

  it('should update the token when update() is called', async () => {
    const initialToken = 'first-uid';
    const updatedToken = 'updated-uid';
    getUidMock.mockReturnValueOnce(initialToken);

    const { default: useUi } = await import('../../../../services/UiService');
    const uiService = useUi();

    expect(uiService.token).toBe(initialToken);

    getUidMock.mockReturnValueOnce(updatedToken);

    uiService.update();

    expect(uiService.token).toBe(updatedToken);
    expect(getUidMock).toHaveBeenCalledTimes(2);
  });
});