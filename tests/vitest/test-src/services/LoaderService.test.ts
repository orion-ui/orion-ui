
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useLoader, { LoaderService } from '../../../../services/LoaderService';
import Log from '../../../../utils/Log';

vi.mock('../../../../utils/Log', () => ({
  default: {
    orion: vi.fn(),
  },
}));

const getMockLoader = () => ({
  show: vi.fn(),
  hide: vi.fn(),
});

describe('../../../../services/LoaderService.ts', () => {
  describe('LoaderService Class Behavior', () => {
    let service: LoaderService;
    let mockLoader: ReturnType<typeof getMockLoader>;

    beforeEach(() => {
      vi.clearAllMocks();
      
      service = new LoaderService();
      mockLoader = getMockLoader();
    });

    it('should log an activation message upon instantiation', () => {
      expect(Log.orion).toHaveBeenCalledTimes(1);
      expect(Log.orion).toHaveBeenCalledWith('LoaderService activated');
    });

    it('should throw an error if show() is called before a loader is set', () => {
      expect(() => service.show()).toThrow('Orion global loader not set');
    });

    it('should throw an error if hide() is called before a loader is set', () => {
      expect(() => service.hide()).toThrow('Orion global loader not set');
    });

    describe('when a global loader is set', () => {
      beforeEach(() => {
        service.setGlobalLoader(mockLoader as any);
      });

      it('should call the loader\'s show() method with a message', () => {
        const message = 'Loading data...';
        service.show(message);
        expect(mockLoader.show).toHaveBeenCalledTimes(1);
        expect(mockLoader.show).toHaveBeenCalledWith(message);
      });

      it('should call the loader\'s show() method without a message', () => {
        service.show();
        expect(mockLoader.show).toHaveBeenCalledTimes(1);
        expect(mockLoader.show).toHaveBeenCalledWith(undefined);
      });

      it('should call the loader\'s hide() method', () => {
        service.hide();
        expect(mockLoader.hide).toHaveBeenCalledTimes(1);
        expect(mockLoader.hide).toHaveBeenCalledWith();
      });
    });
  });

  describe('useLoader()', () => {
    it('should always return the same singleton instance of LoaderService', () => {
      const instance1 = useLoader();
      const instance2 = useLoader();

      expect(instance1).toBeInstanceOf(LoaderService);
      expect(instance1).toBe(instance2);
    });
  });
});
