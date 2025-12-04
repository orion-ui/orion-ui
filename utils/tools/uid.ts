const uidGeneratorFunction = function* () {
	let index = 1;
	while (true)
		yield index++;
};
let uidGenerator: Generator<number, number, unknown> | undefined;

export const getUid = () => {
	if (!uidGenerator) {
		uidGenerator = uidGeneratorFunction();
	}
	return uidGenerator.next().value;
};
