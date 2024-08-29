import SharedSetupService from '../../Shared/SharedSetupService';
import { PopperMethods } from 'floating-vue';
import { reactive, ref } from 'vue';

export type OrionPopConfirmEmits = {
	(e: 'confirm'): void;
	(e: 'cancel'): void;
}
export type OrionPopConfirmProps = {
	// @doc props/title title of the confirm popup
	// @doc/fr props/title titre de la popup de confirmation
	title: string,
};

export default class OrionPopConfirmSetupService extends SharedSetupService {
	static readonly defaultProps = {};

	_popper = ref<typeof PopperMethods['methods']>();
	_actions = ref<RefDom>();


	private state = reactive({ isVisible: false });


	get title () {
		return this.props.title ?? this.lang.ORION_POP_CONFIRM__TITLE;
	}

	get publicInstance () {
		return {};
	}


	constructor (protected props: OrionPopConfirmProps, protected emits: OrionPopConfirmEmits) {
		super();
	}


	confirm () {
		if (this.state.isVisible) {
			this.emits('confirm');
			this.close();
		}
	}

	cancel (e?: Event) {
		if (this.state.isVisible) {
			this.emits('cancel');
			if (!e) this.close();
		}
	}

	close () {
		this.state.isVisible = false;
		this._popper.value?.hide();
	}

	handlePopoverShow () {
		this.state.isVisible = true;
		setTimeout(() => {
			if (this._actions.value?.children) {
				Array.from(this._actions.value.children).forEach((element) => {
					if (element.attributes.getNamedItem('autofocus')) {
						(element as HTMLElement).focus();
					}
				});
			}
		}, 100);
	}
}
