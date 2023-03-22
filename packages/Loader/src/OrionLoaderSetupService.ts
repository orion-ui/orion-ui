import { reactive, watchEffect } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps from '../../Shared/SharedProps';
import useLoader from 'services/LoaderService';

type Props = SetupProps<typeof OrionLoaderSetupService.props>

export default class OrionLoaderSetupService extends SharedSetupService<Props> {
	static props = {
		...SharedProps.color('brand'),
		...SharedProps.size(),
		// @doc props/global displays a fullpage loader
		// @doc/fr props/global affiche un loader sur toute la page
		global: Boolean,
		// @doc props/visible if set, shows the loader
		// @doc/fr props/visible si défini, affiche le loader
		visible: Boolean,
		// @doc props/message message under the loader
		// @doc/fr props/message message qui apparaît sous l'icône de chargement
		message: {
			type: String,
			default: undefined,
		},
	};

	private state = reactive({
		text: undefined as Undef<string>,
		forceVisible: false,
	});

	get text () {
		return this.state.text;
	}

	get forceVisible () {
		return this.state.forceVisible;
	}

	get publicInstance () {
		return {
			...super.publicInstance,
			show: this.show.bind(this),
			hide: this.hide.bind(this),
		};
	}


	constructor (props: Props) {
		super(props);

		watchEffect(() => { this.state.text = this.props.message; });

		if (this.props.global) {
			useLoader().setGlobalLoader(this.publicInstance);
		}
	}


	show (newText?: string): void {
		this.state.forceVisible = true;
		this.state.text = newText ?? this.props.message ?? undefined;
	}

	hide (): void {
		this.state.forceVisible = false;
	}
}
