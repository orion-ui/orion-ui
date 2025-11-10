
import { describe, it, expect, vi, beforeEach } from 'vitest';
import usePrompt from '../../../../services/PromptService';

import useModal from '../../../../services/ModalService';
import useLang from '../../../../services/LangService';
import { getUid, toggleGlobalListener } from 'utils/tools';

const mockModalInstance = {
	close: vi.fn(),
};

vi.mock('services/ModalService', () => ({
	default: vi.fn(() => mockModalInstance),
}));

vi.mock('services/LangService', () => ({
	default: vi.fn(() => ({
		CANCEL: 'Annuler',
	})),
}));

vi.mock('utils/tools', () => ({
	getUid: vi.fn(() => 'test-uid-123'),
	toggleGlobalListener: vi.fn(),
}));

const mockedUseModal = vi.mocked(useModal);
const mockedUseLang = vi.mocked(useLang);
const mockedToggleGlobalListener = vi.mocked(toggleGlobalListener);


describe('services/PromptService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call useModal with correctly merged options', () => {
		const customOptions = {
			size: 'lg' as const,
			customClass: 'custom-prompt-class',
			prompt: {
				type: 'password' as const,
				value: 'initial',
			},
		};

		usePrompt(customOptions);

		expect(mockedUseModal).toHaveBeenCalledOnce();
		const modalArgs = mockedUseModal.mock.calls[0][0];

		expect(modalArgs.hideClose).toBe(true);
		expect(modalArgs.hideOnOverlayClick).toBe(false);

		expect(modalArgs.size).toBe('lg');
		expect(modalArgs.customClass).toBe('custom-prompt-class');
		expect(modalArgs.prompt?.type).toBe('password');
		expect(modalArgs.prompt?.value).toBe('initial');
	});

	it('should resolve with `confirm: true` and the value on success callback', async () => {
		const promptPromise = usePrompt<string>({
			prompt: { value: 'user input' },
		});
		const modalArgs = mockedUseModal.mock.calls[0][0];
		const successCallback = modalArgs.actions.find(a => a.color === 'success')?.callback;

		successCallback();
		const result = await promptPromise;

		expect(mockModalInstance.close).toHaveBeenCalledOnce();
		expect(mockedToggleGlobalListener).toHaveBeenCalledWith('test-uid-123'); // Teardown listener
		expect(result).toEqual({
			confirm: true,
			value: 'user input',
			modal: mockModalInstance,
		});
	});

	it('should resolve with `confirm: false` on cancel callback', async () => {
		const promptPromise = usePrompt<string>({
			prompt: { value: 'user input' },
		});
		const modalArgs = mockedUseModal.mock.calls[0][0];
		const cancelCallback = modalArgs.actions.find(a => a.color === 'danger')?.callback;

		cancelCallback();
		const result = await promptPromise;

		expect(mockModalInstance.close).toHaveBeenCalledOnce();
		expect(mockedToggleGlobalListener).toHaveBeenCalledWith('test-uid-123'); // Teardown listener
		expect(result).toEqual({
			confirm: false,
			value: 'user input',
			modal: mockModalInstance,
		});
	});

	it('should set up a global keydown listener and cancel on "Escape"', async () => {
		const promptPromise = usePrompt();
		const setupArgs = mockedToggleGlobalListener.mock.calls[0];
		const eventType = setupArgs[0];
		const handler = setupArgs[1];

		expect(eventType).toBe('keydown');
		expect(handler).toBeInstanceOf(Function);

		handler({ key: 'Escape' });
		const result = await promptPromise;

		expect(mockModalInstance.close).toHaveBeenCalledTimes(2);
		expect(result.confirm).toBe(false);
		expect(mockedToggleGlobalListener.mock.calls.filter(c => c[0] === 'test-uid-123')).toHaveLength(2);
	});

	it('should not confirm if a required field is empty', async () => {
		const promptPromise = usePrompt({
			prompt: {
				fieldProps: { required: true },
				value: undefined,
			},
		});
		const modalArgs = mockedUseModal.mock.calls[0][0];
		const successCallback = modalArgs.actions.find(a => a.color === 'success')?.callback;

		successCallback();

		expect(mockModalInstance.close).not.toHaveBeenCalled();

		modalArgs.prompt.value = 'a valid value';
		successCallback();
		const result = await promptPromise;

		expect(mockModalInstance.close).toHaveBeenCalledOnce();
		expect(result.confirm).toBe(true);
		expect(result.value).toBe('a valid value');
	});

	it('should initialize value as an empty array for "upload" type prompts', () => {
		usePrompt({
			prompt: { type: 'upload' },
		});

		const modalArgs = mockedUseModal.mock.calls[0][0];
		expect(modalArgs.prompt?.value).toEqual([]);
	});

	it('should use language service for the cancel button label', () => {
		usePrompt();

		expect(mockedUseLang).toHaveBeenCalledOnce();
		const modalArgs = mockedUseModal.mock.calls[0][0];
		const cancelAction = modalArgs.actions.find(a => a.color === 'danger');
		expect(cancelAction?.label).toBe('Annuler');
	});
});
