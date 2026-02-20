import FloatingVue from 'floating-vue';
import { type App, createVNode, render } from 'vue';

import { OrionComponentsPlugin } from '../packages';
import { OrionLoader } from '../packages/Loader';
import { OrionOverlay } from '../packages/Overlay';
import { useDocument } from '../services/DocumentService';
import { setAppLang } from '../services/LangService';
import { Log } from './Log';
import { handleTouchDevice, initThemeMode, setIconStyle } from './tools';

export class OrionAppService {

	private _app!: App;
	private _config!: Orion.AppServiceConfig;

	get app () { return this._app }
	get appContext () { return this._app._context }
	get appInstance () { return this._app._instance }
	get appConfig () { return this._config }
	get appUse () { return this._config.use }
	get appPrefix () { return this._config.prefix }
	get appRouter () { return this._config.router }

	init (app: App, config: Orion.AppServiceConfig) {
		Log.orion('•• START •• Orion initializer');
		Log.orion(`prefix | ${config.prefix}`);
		Log.orion(`use    | ${config.use.join(', ')}`);

		if (!app) throw `Parameter "app" is missing in Orion initializer`;

		this._app = app;
		this._config = config;

		initThemeMode();
		handleTouchDevice();

		setAppLang(config.lang);
		setIconStyle(config.iconStyle);

		this.preventVuePrefixWarning();

		if (this.appUse.includes('components')) {
			this._app.use(FloatingVue, {
				themes: {
					'orion': {
						$extend: 'dropdown',
						distance: -4,
					},
					'orion-select': {
						$extend: 'orion',
						autoSize: 'min',
						distance: -2,
					},
					'orion-select-searchable': { $extend: 'orion' },
					'orion-pop-confirm': { $extend: 'orion' },
					'orion-editor-toolbar': {
						$extend: 'orion',
						placement: 'top',
						disposeTimeout: 100,
						handleResize: false,
					},
				},
			});

			this.createPopableWrapper();
			this.createMainOverlay();
			this.createMainLoader();
			this.registerGlobalComponents();
		}

		Log.orion('••  END  •• Orion initializer');
	}

	private preventVuePrefixWarning (): void {
		this._app.config.warnHandler = (msg) => {
			// Remove warning about property's name returned to template
			// Orion use :
			//    _el      for template ref
			if (msg.includes(`reserved prefixes`)) return;
		};
	}

	private registerGlobalComponents (): void {
		if (!this.appPrefix) throw `key "prefix" is missing in config`;

		OrionComponentsPlugin.install?.(this._app, this.appPrefix);
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

export const orionAppService = new OrionAppService();
