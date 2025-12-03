// To be SSR friendly
export function useWindow () {
	if (typeof window !== 'undefined') return window;
}
