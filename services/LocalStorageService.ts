// To be SSR friendly
export function useLocalStorage () {
	if (typeof localStorage !== 'undefined') return localStorage;
}
