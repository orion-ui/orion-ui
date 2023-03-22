import { Extension } from '@tiptap/core';
import '@tiptap/extension-text-style';

type TextBackgroundOptions = {
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    background: {
      setTextBackground: (background: string) => ReturnType,
      getTextBackground: () => () => string,
      unsetTextBackground: () => ReturnType,
    }
  }
}

export const TextBackground = Extension.create<TextBackgroundOptions>({
	name: 'background',

	addOptions: () => ({ types: ['textStyle'] }),

	addGlobalAttributes () {
		return [
			{
				types: this.options.types,
				attributes: {
					background: {
						default: null,
						renderHTML: attributes => attributes.background ? { style: `background: ${attributes.background}` } : {},
						parseHTML: element => element.style.background,
					},
				},
			},
		];
	},

	addCommands () {
		return {
			setTextBackground: background => ({ chain }) => {
				return chain()
					.setMark('textStyle', { background })
					.run();
			},
			getTextBackground: () => () => {
				return this.editor.getAttributes('textStyle').background ?? '';
			},
			unsetTextBackground: () => ({ chain }) => {
				return chain()
					.setMark('textStyle', { background: null })
					.removeEmptyTextStyle()
					.run();
			},
		};
	},
});

export default TextBackground;
