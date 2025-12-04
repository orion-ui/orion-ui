import FloatingVue from 'floating-vue';
import { App, createVNode, render } from 'vue';

import { OrionComponentsPlugin } from '../packages';
import { OrionLoader } from '../packages/Loader';
import { OrionOverlay } from '../packages/Overlay';
import { useDocument } from '../services/DocumentService';
import { setAppLang } from '../services/LangService';
import { Log } from './Log';
import { handleTouchDevice, initThemeMode, setIconStyle } from './tools';


export class OrionAppService {
	private _app!: App;
	private config!: Orion.AppServiceConfig;

	get app () { return this._app; }
	get appContext () { return this._app._context; }
	get appInstance () { return this._app._instance; }
	get appConfig () { return this.config; }
	get appUse () { return this.config.use; }
	get appPrefix () { return this.config.prefix; }
	get appRouter () { return this.config.router; }

	init (app: App, config: Orion.AppServiceConfig) {
		Log.orion('•• START •• Orion initializer');
		Log.orion(`prefix | ${config.prefix}`);
		Log.orion(`use    | ${config.use}`);

		if (!app) throw `Parameter "app" is missing in Orion initializer`;

		this._app = app;
		this.config = config;

		setAppLang(config.lang);

		this.preventVuePrefixWarning();

		if (this.appUse.includes('components')) {
			this._app.use(FloatingVue, {
				themes: {
					'orion': {
						$extend: 'dropdown',
						arrowPadding: 15,
					},
					'orion-select': { $extend: 'orion' },
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
			// this.app.use(directives);

			this.createPopableWrapper();
			this.createMainOverlay();
			this.createMainLoader();
			this.registerGlobalComponents();
		}

		initThemeMode();
		setIconStyle(this.appConfig.iconStyle);
		handleTouchDevice();

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
