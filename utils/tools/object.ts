/**
 * @desc checks if the value is different from undefined, null or false
 * @param {any} val value to check
 * @return boolean
 */
export function isDefineOrTrue (val: any) {
	return val !== undefined && val !== null && val !== false;
}

/**
 * @desc checks if the item contains the prop given in parameter
 * @param {Record<string, any>} item item to check
 * @param {any} prop prop to search
 * @return boolean
 */
export function itemHas <P extends string> (item: Record<string, any>, prop: P): item is Record<P, any> {
	return prop in item;
}

/**
 * @desc checks if the item is of the given type by checking the existance of one or more keys
 * @param {Record<string, any>} item item to check
 * @param {string[]} validationKeys keys to look for in the object
 * @return boolean
 */
export function itemIs<T extends Record<string, any>> (item: Record<string, any>, ...validationKeys: (keyof T)[]): item is T {
	return validationKeys.filter(k => k in item).length === validationKeys.length;
}

/**
 * @desc returns a copy of the object in the first argument with only the properties specified in the second argument
 * @param {T extends Record<string, any>} target the object on which to extract keys
 * @param {(K extends keyof T)[]} keys the keys to extract
 * @return Pick<T, K>
 */
export function pickFrom <T extends object, K extends keyof T> (target: T, keys: K[]): Pick<T, K> {
	const res = {} as Pick<T, K>;
	keys.forEach((k) => {
		res[k] = target[k];
	});
	return res;
}
