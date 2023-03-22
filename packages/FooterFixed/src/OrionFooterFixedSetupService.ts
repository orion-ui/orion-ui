import { watch } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';

type Props = SetupProps<typeof OrionFooterFixedSetupService.props>

export default class OrionFooterFixedSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/visible if set, displays the footer
		// @doc/fr props/visible si défini, affiche le composant
		visible: Boolean,
		// @doc props/title title of the footer
		// @doc props/title titre du pied de page
		title: {
			type: String,
			default: undefined,
		},
	};

	constructor (props: Props) {
		super(props);

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
