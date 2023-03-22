import SharedSetupService from '../../Shared/SharedSetupService';
import { PopperMethods } from 'floating-vue';
import { reactive, ref } from 'vue';

type Props = SetupProps<typeof OrionPopConfirmSetupService.props>
type PopConfirmEmit = {
	(e: 'confirm'): void;
	(e: 'cancel'): void;
}

export default class OrionPopConfirmSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/title title of the confirm popup
		// @doc/fr props/title titre de la popup de confirmation
		// @doc props/title/default depends on the selected language
		title: {
			type: String,
			default: undefined,
		},
	};

	_popper = ref<typeof PopperMethods['methods']>();
	_actions = ref<RefDom>();

	private emit: PopConfirmEmit;
	private state = reactive({ isVisible: false });


	get title () {
		return this.props.title ?? this.lang.ORION_POP_CONFIRM__TITLE;
	}


	constructor (props: Props, emit: PopConfirmEmit) {
		super(props);
		this.emit = emit;
	}


	confirm () {
		if (this.state.isVisible) {
			this.emit('confirm');
			this.close();
		}
	}

	cancel (e?: Event) {
		if (this.state.isVisible) {
			this.emit('cancel');
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
