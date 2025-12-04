import { getUid, toggleGlobalListener } from 'utils/tools';
import { reactive } from 'vue';
import { useLang } from './LangService';
import { useModal } from './ModalService';

class PromptService<T> {
	resolve!: (val: Orion.Modal.PromptResolveType<T>) => void;
	modal!: OrionModal;
	options?: Partial<Orion.Modal.Options>;
	escapeEventUid = getUid();

	private prompt = reactive({
		type: 'input' as Orion.Modal.PromptType,
		value: undefined as Nil<T>,
		fieldProps: {},
		confirm: () => this.successCallback(),
		cancel: () => this.cancelCallback(),
	}) as Orion.Modal.Prompt<T>;


	constructor (options?: Partial<Orion.Modal.Options>) {
		this.options = options;
		Object.assign(this.prompt, options?.prompt);

		if (options?.prompt?.type === 'upload') {
			this.prompt.value = [] as T;
		}

		this.setGlobalEventListener();
	}

	private successCallback () {
		if (!(this.prompt?.fieldProps?.required && !this.prompt?.value)) {
			this.modal.close();
			this.resolve({
				confirm: true,
				value: this.prompt.value,
				modal: this.modal,
			});
			toggleGlobalListener(this.escapeEventUid);
		}
	};

	private cancelCallback () {
		this.modal.close();
		this.resolve({
			confirm: false,
			value: this.prompt.value,
			modal: this.modal,
		});
		toggleGlobalListener(this.escapeEventUid);
	};

	private setGlobalEventListener () {
		toggleGlobalListener('keydown', (e: Event) => {
			if ((e as KeyboardEvent).key === 'Escape') {
				this.modal.close();
				this.cancelCallback();
				toggleGlobalListener(this.escapeEventUid);
			};
		}, { uid: this.escapeEventUid });
	}

	async openPromptModalAsync () {
		return new Promise<Orion.Modal.PromptResolveType<T>>((resolve) => {
			this.resolve = resolve;
			this.modal = useModal({
				hideClose: true,
				hideOnOverlayClick: false,
				hideOnEsc: false,
				customClass: 'orion-modal--prompt',
				size: 'xs',
				actions: [
					{
						color: 'success',
						label: 'OK',
						callback: this.successCallback.bind(this),
					},
					{
						color: 'error',
						outline: true,
						label: useLang().CANCEL,
						callback: this.cancelCallback.bind(this),
					},
				],
				...this.options,
				events: {
					confirm: this.successCallback.bind(this),
					cancel: this.cancelCallback.bind(this),
					...this.options?.events,
				},
				prompt: this.prompt,
			});
		});
	}
}

export function usePrompt <T> (options?: Partial<Orion.Modal.Options>) {
	return new PromptService<T>(options).openPromptModalAsync();
}
