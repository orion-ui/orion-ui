import { reactive, watchEffect } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import useLoader from 'services/LoaderService';
import { SharedPropsColor, SharedPropsSize } from 'lib/shared-props';

export type OrionLoaderEmits = {}
export type OrionLoaderProps = SharedPropsColor & SharedPropsSize & {
	// @doc props/global displays a fullpage loader
	// @doc/fr props/global affiche un loader sur toute la page
	global: boolean,
	// @doc props/message message under the loader
	// @doc/fr props/message message qui apparaît sous l'icône de chargement
	message?: string,
	// @doc props/visible if set, shows the loader
	// @doc/fr props/visible si défini, affiche le loader
	visible: boolean,
}

export default class OrionLoaderSetupService extends SharedSetupService {
	static readonly defaultProps = {
		color: 'brand' as Orion.Color,
		global: false,
		visible: false,
		size: 'md' as Orion.Size,
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


	constructor (protected props: OrionLoaderProps, protected emits: OrionLoaderEmits) {
		super();

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
