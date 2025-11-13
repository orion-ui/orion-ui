
import { vi, describe, it, expect, beforeEach } from 'vitest';
import useConfirm from '../../../../services/ConfirmService';
import { getUid, toggleGlobalListener } from '../../../../utils/tools';
import useLang from '../../../../services/LangService';
import useModal from '../../../../services/ModalService';

const mockModalInstance = {
	close: vi.fn(),
};

vi.mock('../../../../utils/tools', () => ({
	getUid: vi.fn(),
	toggleGlobalListener: vi.fn(),
}));

vi.mock('../../../../services/LangService', () => ({
	default: vi.fn(),
}));

vi.mock('../../../../services/ModalService', () => ({
	default: vi.fn(() => mockModalInstance),
}));

const mockedGetUid = vi.mocked(getUid);
const mockedToggleGlobalListener = vi.mocked(toggleGlobalListener);
const mockedUseLang = vi.mocked(useLang);
const mockedUseModal = vi.mocked(useModal);


describe('ConfirmService', () => {
	const MOCK_UID = 'test-uid-42';

	beforeEach(() => {
		vi.clearAllMocks();

		mockedGetUid.mockReturnValue(MOCK_UID);

		mockedUseLang.mockReturnValue({
			USE_CONFIRM__TITLE: 'Confirmation',
			CONFIRM: 'Confirm',
			CANCEL: 'Cancel',
		} as any);
	});

	it('should open a modal with correct parameters', () => {
		const message = 'Are you sure you want to proceed?';
		const options = { size: 'sm' as const };

		useConfirm(message, options);

		expect(mockedUseModal).toHaveBeenCalledOnce();
		expect(mockedUseModal).toHaveBeenCalledWith(expect.objectContaining({
			title: 'Confirmation',
			message: message,
			size: 'sm',
			hideClose: true,
			hideOnOverlayClick: false,
			hideOnEsc: false,
			actions: expect.any(Array),
		}));
	});

	it('should set up a global keydown listener', () => {
		useConfirm('Listen up!');

		expect(mockedToggleGlobalListener).toHaveBeenCalledOnce();
		expect(mockedToggleGlobalListener).toHaveBeenCalledWith(
			'keydown',
			expect.any(Function),
			{ uid: MOCK_UID },
		);
	});

	it('resolves with `true` when the confirm action is triggered', async () => {
		const confirmPromise = useConfirm('Confirm this action.');

		const modalOptions = mockedUseModal.mock.calls[0][0];
		const confirmAction = modalOptions.actions?.find(action => action.label === 'Confirm');
		confirmAction?.callback?.(mockModalInstance as any);

		await expect(confirmPromise).resolves.toBe(true);
		expect(mockModalInstance.close).toHaveBeenCalledOnce();
		expect(mockedToggleGlobalListener).toHaveBeenCalledWith(MOCK_UID);
	});

	it('resolves with `false` when the cancel action is triggered', async () => {
		const confirmPromise = useConfirm('Cancel this action.');

		const modalOptions = mockedUseModal.mock.calls[0][0];
		const cancelAction = modalOptions.actions?.find(action => action.label === 'Cancel');
		cancelAction?.callback?.(mockModalInstance as any);

		await expect(confirmPromise).resolves.toBe(false);
		expect(mockModalInstance.close).toHaveBeenCalledOnce();
		expect(mockedToggleGlobalListener).toHaveBeenCalledWith(MOCK_UID);
	});

	it('resolves with `true` when the "Enter" key is pressed', async () => {
		const confirmPromise = useConfirm('Press Enter.');

		const keydownCallback = mockedToggleGlobalListener.mock.calls[0][1] as (e: Event) => void;
		keydownCallback(new KeyboardEvent('keydown', { key: 'Enter' }));

		await expect(confirmPromise).resolves.toBe(true);
		expect(mockModalInstance.close).toHaveBeenCalledOnce();
		expect(mockedToggleGlobalListener).toHaveBeenCalledWith(MOCK_UID);
	});

	it('resolves with `false` when the "Escape" key is pressed', async () => {
		const confirmPromise = useConfirm('Press Escape.');

		const keydownCallback = mockedToggleGlobalListener.mock.calls[0][1] as (e: Event) => void;
		keydownCallback(new KeyboardEvent('keydown', { key: 'Escape' }));

		await expect(confirmPromise).resolves.toBe(false);
		expect(mockModalInstance.close).toHaveBeenCalledOnce();
		expect(mockedToggleGlobalListener).toHaveBeenCalledWith(MOCK_UID);
	});

	it('should not do anything on other key presses', async () => {
		useConfirm('Press Tab.');

		const keydownCallback = mockedToggleGlobalListener.mock.calls[0][1] as (e: Event) => void;
		keydownCallback(new KeyboardEvent('keydown', { key: 'Tab' }));

		expect(mockModalInstance.close).not.toHaveBeenCalled();
		expect(mockedToggleGlobalListener).toHaveBeenCalledTimes(1);
	});
});
