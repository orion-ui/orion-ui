import { getUid, toggleGlobalListener } from 'utils/tools';
import { useLang } from './LangService';
import useModal from './ModalService';

class ConfirmService {
	resolve!: (val: boolean) => void;
	modal!: OrionModal;
	options?: Partial<Orion.Modal.Options>;
	escapeEventUid = getUid();
	message: string;


	constructor (message: string, options?: Partial<Orion.Modal.Options>) {
		this.message = message;
		this.options = options;
		this.setGlobalEventListener();
	}


	setGlobalEventListener () {
		toggleGlobalListener('keydown', (e: Event) => {
			if ((e as KeyboardEvent).key === 'Escape') {
				this.modal.close();
				this.resolve(false);
				toggleGlobalListener(this.escapeEventUid);
			} else if ((e as KeyboardEvent).key === 'Enter') {
				this.modal.close();
				this.resolve(true);
				toggleGlobalListener(this.escapeEventUid);
			}
		}, { uid: this.escapeEventUid });
	}

	async openConfirmModalAsync () {
		return new Promise<boolean>((resolve) => {
			this.resolve = resolve;
			this.modal = useModal({
				title: useLang().USE_CONFIRM__TITLE,
				message: this.message,
				hideClose: true,
				hideOnOverlayClick: false,
				hideOnEsc: false,
				size: 'xs',
				actions: [
					{
						color: 'success',
						label: useLang().CONFIRM,
						autofocus: true,
						callback: (M) => {
							M.close();
							resolve(true);
							toggleGlobalListener(this.escapeEventUid);
						},
					},
					{
						color: 'error',
						label: useLang().CANCEL,
						outline: true,
						callback: (M) => {
							M.close();
							resolve(false);
							toggleGlobalListener(this.escapeEventUid);
						},
					},
				],
				...this.options,
			});
		});
	}
}

export default function useConfirm (message: string, options?: Partial<Orion.Modal.Options>) {
	return new ConfirmService(message, options).openConfirmModalAsync();
}
