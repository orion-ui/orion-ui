import { reactive } from 'vue';
import { forEach } from 'lodash-es';
import SharedSetupService from '../../Shared/SharedSetupService';
import useOverlay from 'services/OverlayService';
import usePopableQueueService from 'services/PopableQueueService';

export type OrionOverlayEmits = {}
export type OrionOverlayProps = {
	// @doc props/global defines if the overlay is fullpage
	// @doc/fr props/global Missing @doc
	global: boolean,
};

export default class OrionOverlaySetupService extends SharedSetupService {
	static readonly defaultProps = { global: false };

	private state = reactive({
		visible: false,
		parentOverflowStyle: undefined as Undef<string>,
	});

	private get activeModalUsingOverlay () {
		return usePopableQueueService().modalQueue.filter(x => x.state.visible && x.options.overlay);
	}

	private get activeAsideUsingOverlay () {
		return usePopableQueueService().asideQueue.filter(x => x.state.visible && x.options.overlay);
	}

	get visible () {
		return this.state.visible;
	}

	get zIndex () {
		const queueLength = usePopableQueueService().queueIds.length;
		return this.props.global && queueLength
			? 100 - 1 + queueLength
			: 100;
	}

	get publicInstance () {
		return {
			...super.publicInstance,
			show: this.show.bind(this),
			hide: this.hide.bind(this),
		};
	}


	constructor (protected props: OrionOverlayProps, protected emits: OrionOverlayEmits) {
		super();

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
			forEach([
				...usePopableQueueService().asideQueue,
				...usePopableQueueService().modalQueue,
			], (x) => {
				if (x.state.visible && x.options.hideOnOverlayClick && x.isLastOpenedPopable()) {
					x.close();
				}
			});
		}
	}
}
