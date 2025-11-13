
import { describe, expect, it } from 'vitest';
import { sizes, colors, colorsAlt, colorsExtended, greys, colorsExtendedAndGreys } from '../../../../utils/mockup';

describe('Shared Constants', () => {
	it('should export the correct sizes', () => {
		const expectedSizes: Orion.Size[] = ['xl', 'lg', 'md', 'sm', 'xs'];
		expect(sizes).toEqual(expectedSizes);
		expect(sizes).toHaveLength(5);
	});

	it('should export the correct colors', () => {
		const expectedColors: Orion.Color[] = ['default', 'brand', 'success', 'info', 'warning', 'danger', 'pink', 'inverse'];
		expect(colors).toEqual(expectedColors);
		expect(colors).toHaveLength(8);
	});

	it('should export the correct alt colors', () => {
		const expectedColorsAlt: Orion.ColorExtended[] = ['brand-alt', 'success-alt', 'info-alt', 'warning-alt', 'danger-alt', 'pink-alt'];
		expect(colorsAlt).toEqual(expectedColorsAlt);
		expect(colorsAlt).toHaveLength(6);
	});

	it('should export the correct extended colors', () => {
		const expectedColorsExtended: Orion.ColorExtended[] = [
			'default',
			'brand',
			'success',
			'info',
			'warning',
			'danger',
			'pink',
			'inverse',
			'brand-alt',
			'success-alt',
			'info-alt',
			'warning-alt',
			'danger-alt',
			'pink-alt',
		];
		expect(colorsExtended).toEqual(expectedColorsExtended);
		expect(colorsExtended).toHaveLength(14);
		expect(colorsExtended).toEqual([...colors, ...colorsAlt]);
	});

	it('should export the correct greys', () => {
		const expectedGreys: Orion.Grey[] = ['grey-darker', 'grey-dark', 'grey', 'grey-light', 'grey-lighter'];
		expect(greys).toEqual(expectedGreys);
		expect(greys).toHaveLength(5);
	});

	it('should export the correct extended colors and greys', () => {
		const expectedColorsExtendedAndGreys: Orion.ColorExtendedAndGreys[] = [
			'default',
			'brand',
			'success',
			'info',
			'warning',
			'danger',
			'pink',
			'inverse',
			'brand-alt',
			'success-alt',
			'info-alt',
			'warning-alt',
			'danger-alt',
			'pink-alt',
			'grey-darker',
			'grey-dark',
			'grey',
			'grey-light',
			'grey-lighter',
		];
		expect(colorsExtendedAndGreys).toEqual(expectedColorsExtendedAndGreys);
		expect(colorsExtendedAndGreys).toHaveLength(19);
		expect(colorsExtendedAndGreys).toEqual([...colorsExtended, ...greys]);
	});
});
