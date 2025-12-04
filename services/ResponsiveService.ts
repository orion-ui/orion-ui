import { debounce } from 'lodash-es';
import { Log } from 'utils/Log';
import { reactive } from 'vue';
import { useWindow } from './WindowService';

type ResponsiveServiceOptions = {
  BPtablet?: number;
  BPtabletLandscape?: number;
  BPdesktop?: number;
  BPdesktopXL?: number;
}

export class ResponsiveService {
	BPtablet = 768;
	BPtabletLandscape = 1024;
	BPdesktop = 1280;
	BPdesktopXL = 1536;

	private state = reactive({
		windowSize: {
			width: 0,
			height: 0,
		},
	});

	get ww () { return this.state.windowSize.width; }
	get wh () { return this.state.windowSize.height; }
	get onPhone () { return this.ww < this.BPtablet; }
	get onTablet () { return this.ww >= this.BPtablet; }
	get onTabletOnly () { return this.ww >= this.BPtablet && this.ww < this.BPdesktop; }
	get onTabletPortrait () { return this.ww >= this.BPtablet; }
	get onTabletPortraitOnly () { return this.ww >= this.BPtablet && this.ww < this.BPtabletLandscape; }
	get onTabletLandscape () { return this.ww >= this.BPtabletLandscape; }
	get onTabletLandscapeOnly () { return this.ww >= this.BPtabletLandscape && this.ww < this.BPdesktop; }
	get onDesktop () { return this.ww >= this.BPdesktop; }
	get onDesktopOnly () { return this.ww >= this.BPdesktop && this.ww < this.BPdesktopXL; }
	get onDesktopXL () { return this.ww >= this.BPdesktopXL; }


	constructor (options?: ResponsiveServiceOptions) {
		Log.orion(`ResponsiveService activated`);

		if (options) {
			Object.assign(this, options);
		}

		this.setWindowSize();

		useWindow()?.addEventListener('resize', debounce(() => {
			this.setWindowSize();
		}, 50));
	}


	setWindowSize () {
		this.state.windowSize.width = useWindow()?.innerWidth ?? 0;
		this.state.windowSize.height = useWindow()?.innerHeight ?? 0;
	}
}

// @tree-shaking lazy initialization
let responsiveServiceSingleton: ResponsiveService;

export function useResponsive () {
	if (!responsiveServiceSingleton) {
		responsiveServiceSingleton = new ResponsiveService();
	}
	return responsiveServiceSingleton;
};
