import { forEach } from 'lodash-es';
import { useOverlay } from 'services/OverlayService';
import { usePopableQueue } from 'services/PopableQueueService';
import { Reactive } from 'utils';
import { SharedSetup } from '../../Shared/SharedSetup';

export type OrionOverlayEmits = {};
export type OrionOverlayProps = {
	// @doc props/global defines if the overlay is fullpage
	// @doc/fr props/global Missing @doc
	global?: boolean
};

export class OrionOverlaySetup extends SharedSetup {

	static readonly defaultProps = {};

	@Reactive private readonly state = {
		visible: false,
		parentOverflowStyle: undefined as Undef<string>,
	};

	private get activeModalUsingOverlay () { return usePopableQueue().modalQueue.filter(x => x.state.visible && x.options.overlay) }
	private get activeAsideUsingOverlay () { return usePopableQueue().asideQueue.filter(x => x.state.visible && x.options.overlay) }
	get visible () { return this.state.visible }
	get zIndex () {
		const queueLength = usePopableQueue().queueIds.length;
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

	private show () {
		this.state.visible = true;
	}

	private hide () {
		if (this.activeModalUsingOverlay.length || this.activeAsideUsingOverlay.length) return;
		this.state.visible = false;
	}

	handleClick () {
		if (this.props.global) {
			this.hide();
			forEach([
				...usePopableQueue().asideQueue,
				...usePopableQueue().modalQueue,
			], (x) => {
				if (x.state.visible && x.options.hideOnOverlayClick && x.isLastOpenedPopable()) {
					x.close();
				}
			});
		}
	}

}
