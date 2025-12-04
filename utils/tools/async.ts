/**
 * @desc resolves a promise after the number of milliseconds given in parameters
 * @param {number} milliseconds time to wait
 * @return Promise
 */
export async function sleep (milliseconds: number) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}
