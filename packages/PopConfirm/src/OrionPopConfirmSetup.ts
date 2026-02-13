import { type PopperMethods } from 'floating-vue';
import { Reactive } from 'utils/decorators';
import { ref } from 'vue';
import { SharedSetup } from '../../Shared/SharedSetup';

type OrionPopConfirmType = 'default' | 'danger';

export type OrionPopConfirmEmits = {
	// @doc event/confirm/desc emitted when the confirm button is clicked
	// @doc/fr event/confirm/desc émis quand le bouton `confirm` est clické
	(e: 'confirm'): void
	// @doc event/cancel/desc emitted when the cancel button is clicked
	// @doc/fr event/cancel/desc émis quand le bouton `cancel` est clické
	(e: 'cancel'): void
};

export type OrionPopConfirmProps = {
	// @doc props/title title of the confirm popup
	// @doc/fr props/title titre de la popup de confirmation
	title?: string
	// @doc props/type defines the confirm type
	// @doc/fr props/type definit le type de confirmation
	type?: OrionPopConfirmType
	// @doc props/hideTitle whether to hide the title or not
	// @doc/fr props/hideTitle indique si le titre doit être caché ou non
	hideTitle?: boolean
};

export class OrionPopConfirmSetup extends SharedSetup {

	static readonly defaultProps = { type: 'default' as OrionPopConfirmType };

	readonly _popper = ref<typeof PopperMethods['methods']>();
	readonly _actions = ref<RefDom>();

	@Reactive private readonly state = { isVisible: false };

	get title () { return this.props.title ?? this.lang.ORION_POP_CONFIRM__TITLE }
	get isDanger () { return this.props.type === 'danger' }
	get confirmButtonColor () { return this.isDanger ? 'danger' : 'primary' }
	get icon () { return this.isDanger ? 'error' : 'info' }
	get publicInstance () { return {} }

	constructor (
		protected props: OrionPopConfirmProps & typeof OrionPopConfirmSetup.defaultProps,
		protected emits: OrionPopConfirmEmits,
	) {
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
