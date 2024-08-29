import { watch } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionFooterFixedEmits = {}
export type OrionFooterFixedProps = {
	// @doc props/title title of the footer
	// @doc/fr props/title Missing @doc
	title?: string,
	// @doc props/visible if set, displays the footer
	// @doc/fr props/visible si défini, affiche le composant
	visible: boolean,
};

export default class OrionFooterFixedSetupService extends SharedSetupService {
	static readonly defaultProps = { visible: false };

	constructor (protected props: OrionFooterFixedProps, protected emits: OrionFooterFixedEmits) {
		super();

		watch(() => this.props.visible, (val) => {
			if (val) {
				document.body.classList.add('orion-body--footer-fixed-visible');
			} else {
				document.body.classList.remove('orion-body--footer-fixed-visible');
			}
		});
	}

	protected onMounted () {
		if (this.props.visible) {
			document.body.classList.add('orion-body--footer-fixed-visible');
		}
	}

	protected onUnmounted () {
		document.body.classList.remove('orion-body--footer-fixed-visible');
	}

	get withNavItems () {
		if (this.document?.getElementsByClassName('orion-nav-tabs').length)
			return true;
		else
			return false;
	}
}
