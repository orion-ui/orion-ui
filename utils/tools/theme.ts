import { useDocument } from 'services/DocumentService';
import { useLocalStorage } from 'services/LocalStorageService';
import { useWindow } from 'services/WindowService';


function darkThemeMediaQuery () {
	return useWindow()?.matchMedia('(prefers-color-scheme: dark)');
}

function themeMediaQueryListEventHandler (e: MediaQueryListEvent) {
	const targetTheme = e.matches ? 'dark' : 'light';
	useDocument()?.documentElement.setAttribute('data-orion-theme', targetTheme);
}

export function getThemeMode () {
	return useLocalStorage()?.getItem('orion-theme') as Orion.Theme ?? 'auto';
}

export function setThemeMode (mode: Orion.Theme) {
	if (mode === 'dark' || mode === 'light') {
		useLocalStorage()?.setItem('orion-theme', mode);
		useDocument()?.documentElement.setAttribute('data-orion-theme', mode);

		if (typeof darkThemeMediaQuery()?.removeEventListener === 'function') {
			darkThemeMediaQuery()?.removeEventListener('change', themeMediaQueryListEventHandler);
		}
	} else {
		useLocalStorage()?.removeItem('orion-theme');
		if (darkThemeMediaQuery()?.matches) {
			useDocument()?.documentElement.setAttribute('data-orion-theme', 'dark');
		} else {
			useDocument()?.documentElement.setAttribute('data-orion-theme', 'light');
		}

		if (typeof darkThemeMediaQuery()?.addEventListener === 'function') {
			darkThemeMediaQuery()?.addEventListener('change', themeMediaQueryListEventHandler);
		}
	}

	// devtool?.sendInspectorState(devtoolId);
}

export function initThemeMode () {
	setThemeMode(getThemeMode());
}

export function isDarkMode () {
	return useWindow()?.matchMedia && useWindow()?.matchMedia('(prefers-color-scheme: dark)').matches;
}
