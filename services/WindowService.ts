// To be SSR friendly
export default function useWindow () {
	if (typeof window !== 'undefined') return window;
}
