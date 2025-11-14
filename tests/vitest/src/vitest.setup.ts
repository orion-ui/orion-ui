import { vi } from 'vitest';

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation(query => ({
		matches: false, // Valeur par défaut sûre
		media: query,
		onchange: null,
		addListener: vi.fn(), // Déprécié mais peut être utilisé par des bibliothèques
		removeListener: vi.fn(), // Déprécié
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

console.log(`${__filename} loaded!`);
