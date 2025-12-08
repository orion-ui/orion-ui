// To be SSR friendly
export function useDocument () {
	if (typeof document !== 'undefined') return document;
}
