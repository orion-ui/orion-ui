import { reactive } from 'vue';
import { forEach } from 'lodash-es';

import { _queue } from '../../Shared/SharedPopableSetupService';
import SharedSetupService from '../../Shared/SharedSetupService';
import useOverlay from 'services/OverlayService';

type Props = SetupProps<typeof OrionOverlaySetupService.props>

export default class OrionOverlaySetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/global defines if the overlay is fullpage
		// @doc props/global définit si le contraste doit être sur toute la page
		global: Boolean,
	};

	private state = reactive({
		visible: false,
		parentOverflowStyle: undefined as Undef<string>,
	});

	private get activeModalUsingOverlay () {
		return _queue.OrionModal.filter(x => x.state.visible && x.options.overlay);
	}

	private get activeAsideUsingOverlay () {
		return _queue.OrionAside.filter(x => x.state.visible && x.options.overlay);
	}

	get visible () {
		return this.state.visible;
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

		if (this.props.global) {
			useOverlay().setGlobalOverlay(this.publicInstance);
		}
	}

	show () {
		this.state.visible = true;
	}

	hide () {
		if (this.activeModalUsingOverlay.length || this.activeAsideUsingOverlay.length) return;
		this.state.visible = false;
	}

	handleClick () {
		if (this.props.global) {
			this.hide();
			forEach(_queue, (q) => {
				q.forEach((x) => {
					if (x.state.visible && x.options.hideOnOverlayClick) {
						x.close();
					}
				});
			});
		}
	}
}
