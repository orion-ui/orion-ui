import { onBeforeMount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Bus } from 'utils/Bus';
import { getUid } from 'utils/tools';
import orionAppService from 'utils/Orion';
import useDocument from 'services/DocumentService';
import useLang from 'services/LangService';
import useResponsive from 'services/ResponsiveService';
import useWindow from 'services/WindowService';
import useUi from 'services/UiService';

export default abstract class SharedSetupService<P> {
	props = {} as P;

	private defaultRouter = useRouter();
	readonly responsive = useResponsive();
	readonly window = useWindow();
	readonly document = useDocument();
	readonly ui = useUi();

	readonly Bus = Bus;
	readonly getUid = getUid;

	readonly _el = ref<HTMLElement>();

	get router () { return orionAppService.appRouter ?? this.defaultRouter; }
	get lang () { return useLang(); }

	get publicInstance (): Record<string, any> & { _el?: () => HTMLElement | undefined } {
		return { _el: () => this._el.value };
	}


	constructor (props?: P) {
		this.props = props ?? {} as P;

		onBeforeMount(() => {
			this.onBeforeMount();
		});

		onMounted(() => {
			this.onMounted();
		});

		onBeforeUpdate(() => {
			this.onBeforeUpdate();
		});

		onUpdated(() => {
			this.onUpdated();
		});

		onUnmounted(() => {
			this.onUnmounted();
		});
	}


	protected async onBeforeMount () {}
	protected onMounted () {}
	protected onBeforeUpdate () {}
	protected onUpdated () {}
	protected onUnmounted () {}
}
