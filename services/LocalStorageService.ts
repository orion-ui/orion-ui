// To be SSR friendly
export default function useLocalStorage () {
	if (typeof localStorage !== 'undefined') return localStorage;
}
