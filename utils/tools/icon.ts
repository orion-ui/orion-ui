import { useDocument } from 'services/DocumentService';
import { useLocalStorage } from 'services/LocalStorageService';
import { Log } from '../Log';
import { capitalizeFirstLetter } from './string';

export function getIconStyle () : Orion.IconStyle {
	const iconStyle = useLocalStorage()?.getItem('data-orion-icon-style') as Orion.IconStyle;
	return iconStyle ?? 'outlined';
}

export function setIconStyle (style?: Orion.IconStyle) {
	const iconStyle = style ?? getIconStyle();
	useLocalStorage()?.setItem('data-orion-icon-style', iconStyle);
	useDocument()?.documentElement.setAttribute('data-orion-icon-style', iconStyle);

	loadMaterialIconsCSS(iconStyle);
}

function loadMaterialIconsCSS (style: Orion.IconStyle) {
	try {
		const existingLinks = useDocument()?.querySelectorAll('link[data-material-icons], style[data-material-icons]');
		existingLinks?.forEach(link => link.remove());

		const link = useDocument()?.createElement('link');
		const styleElement = useDocument()?.createElement('style');

		if (link && styleElement && useDocument()) {
			const fontName = `Material Symbols ${capitalizeFirstLetter(style)}`;

			link.rel = 'stylesheet';
			link.setAttribute('data-material-icons', style);
			link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}`;
			useDocument()?.head.appendChild(link);
		}
	} catch {
		Log.error('Failed to load Material Icons CSS');
	}
}
