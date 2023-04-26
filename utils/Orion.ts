import { App, AppContext, createVNode, render } from 'vue';
import FloatingVue from 'floating-vue';

import { handleTouchDevice, initThemeMode } from './tools';
import useDocument from '../services/DocumentService';
import { OrionOverlay } from '../packages/Overlay';
import { OrionLoader } from '../packages/Loader';
import OrionComponentsPlugin from '../packages';
import Log from './Log';
import { getAppLang, setAppLang } from 'services/LangService';


export class OrionAppService {
	private app!: App;
	private context!: AppContext;
	private config!: Orion.AppServiceConfig;

	get appContext () { return this.context; }
	get appLang () { return getAppLang(); }
	get appConfig () { return this.config; }
	get appUse () { return this.config.use; }
	get appPrefix () { return this.config.prefix; }
	get appRouter () { return this.config.router; }

	get popableAnimationHooks () { return this.config.popableAnimationHooks ?? {}; };


	init (app: App, config: Orion.AppServiceConfig) {
		Log.orion('•• START •• Orion initializer');
		Log.orion(`prefix | ${config.prefix}`);
		Log.orion(`use    | ${config.use}`);

		if (!app) throw `Parameter "app" is missing in Orion initializer`;

		this.app = app;
		this.context = app._context;
		this.config = config;

		setAppLang(config.lang);

		this.preventVuePrefixWarning();

		if (this.appUse.includes('components')) {
			this.app.use(FloatingVue, {
				themes: {
					'orion': {
						$extend: 'dropdown',
						arrowPadding: 15,
					},
					'orion-select': { $extend: 'orion' },
					'orion-pop-confirm': { $extend: 'orion' },
					'orion-editor-toolbar': {
						$extend: 'orion',
						placement: 'top',
						disposeTimeout: 100,
						handleResize: false,
					},
				},
			});
			// this.app.use(directives);

			this.createPopableWrapper();
			this.createMainOverlay();
			this.createMainLoader();
			this.registerGlobalComponents();
		}

		// this.createCssVar(config);
		initThemeMode();
		handleTouchDevice();

		Log.orion('••  END  •• Orion initializer');
	}

	private preventVuePrefixWarning (): void {
		this.app.config.warnHandler = (msg) => {
			// Remove warning about property's name returned to template
			// Orion use :
			//    _el      for template ref
			if (msg.includes(`reserved prefixes`)) return;
		};
	}

	private registerGlobalComponents (): void {
		if (!this.appPrefix) throw `key "prefix" is missing in config`;

		OrionComponentsPlugin.install?.(this.app, this.appPrefix);
	}

	private createPopableWrapper () {
		const container = useDocument()?.createElement('div');
		if (container) {
			container.id = 'orion-popable-wrapper';
			useDocument()?.body.appendChild(container);
		}
	}

	private createMainOverlay (): void {
		const container = useDocument()?.createElement('div');
		if (container) {
			const vnode = createVNode(OrionOverlay, { global: true });
			vnode.appContext = this.appContext;
			render(vnode, container);
			useDocument()?.body.appendChild(vnode.el as Node);
		}
	}

	private createMainLoader (): void {
		const container = useDocument()?.createElement('div');
		if (container) {
			const vnode = createVNode(OrionLoader, {
				global: true,
				size: 'lg',
			});
			vnode.appContext = this.appContext;
			render(vnode, container);
			useDocument()?.body.appendChild(vnode.el as Node);
		}
	}
}

const orionAppService = new OrionAppService();

export default orionAppService;
