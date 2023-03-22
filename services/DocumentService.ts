// To be SSR friendly
export default function useDocument () {
	if (typeof document !== 'undefined') return document;
}
