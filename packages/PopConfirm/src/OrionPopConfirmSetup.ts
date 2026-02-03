import { type PopperMethods } from 'floating-vue';
import { Reactive } from 'utils/decorators';
import { ref } from 'vue';
import { SharedSetup } from '../../Shared/SharedSetup';

export type OrionPopConfirmEmits = {
	// @doc event/confirm/desc emitted when the confirm button is clicked
	// @doc/fr event/confirm/desc émis quand le bouton `confirm` est clické
	(e: 'confirm'): void
	// @doc event/cancel/desc emitted when the cancel button is clicked
	// @doc/fr event/cancel/desc émis quand le bouton `cancel` est clické
	(e: 'cancel'): void
};

export type OrionPopConfirmType = 'default' | 'destructive';

export type OrionPopConfirmProps = {
	// @doc props/title title of the confirm popup
	// @doc/fr props/title titre de la popup de confirmation
	title?: string
	// @doc props/type defines the confirm type
	// @doc/fr props/type definit le type de confirmation
	type?: OrionPopConfirmType
};

export class OrionPopConfirmSetup extends SharedSetup {

	static readonly defaultProps = {
		type: 'default' as OrionPopConfirmType,
	};

	_popper = ref<typeof PopperMethods['methods']>();
	_actions = ref<RefDom>();

	@Reactive private readonly state = { isVisible: false };

	get title () { return this.props.title ?? this.lang.ORION_POP_CONFIRM__TITLE }
	get type () { return this.props.type ?? OrionPopConfirmSetup.defaultProps.type }
	get isDestructive () { return this.type === 'destructive' }
	get confirmButtonColor () { return this.isDestructive ? 'danger' : 'primary' }
	get icon () { return this.isDestructive ? 'error' : 'info' }
	get publicInstance () { return {} }

	constructor (protected props: OrionPopConfirmProps & typeof OrionPopConfirmSetup.defaultProps, protected emits: OrionPopConfirmEmits) {
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
