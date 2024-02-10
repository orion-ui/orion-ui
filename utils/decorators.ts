import { reactive } from 'vue';

export function Reactive (target: undefined, ctx: ClassFieldDecoratorContext) {
	if (ctx.kind === 'field') {
		return function (initialValue: any) {
			return reactive({ ...initialValue });
		};
	}
}
