import { PropType } from 'vue';

export default class SharedProps {

	static color = (defaultValue: Orion.Color = 'default') => ({
		// @doc props/color defines the color
		// @doc/fr props/color définit la couleur
		color: {
			type: String as PropType<Orion.Color>,
			default: defaultValue,
		},
	});

	static colorExtended = (defaultValue: Orion.ColorExtended = 'default') => ({
		// @doc props/color defines the color
		// @doc/fr props/color définit la couleur
		color: {
			type: String as PropType<Orion.ColorExtended>,
			default: defaultValue,
		},
	});

	static colorExtendedAndGreys = (defaultValue: Orion.ColorExtendedAndGreys = 'default') => ({
		// @doc props/color defines the color
		// @doc/fr props/color définit la couleur
		color: {
			type: String as PropType<Orion.ColorExtendedAndGreys>,
			default: defaultValue,
		},
	});

	static size = (defaultValue: Orion.Size = 'md') => ({
		// @doc props/size define the size
		// @doc/fr props/size définit la taille
		size: {
			type: String as PropType<Orion.Size>,
			default: defaultValue,
		},
	});

	static icon = (defaultValue?: Orion.Icon) => ({
		// @doc props/icon the icon of the component
		// @doc/fr props/icon définit l'icône
		icon: {
			type: String as PropType<Orion.Icon>,
			default: defaultValue,
		},
		// @doc props/fontIcon the icon of the component, from the imported font library
		// @doc/fr props/fontIcon l'icône du composant, de la librairie de police importée
		fontIcon: {
			type: String,
			default: undefined,
		},
	});

	static prefixIcon = (defaultValue?: Orion.Icon) => ({
		// @doc props/prefixIcon the prefix icon
		// @doc/fr props/prefixIcon définit l'icône de préfixe
		prefixIcon: {
			type: String as PropType<Orion.Icon>,
			default: defaultValue,
		},
		// @doc props/prefixFontIcon the prefix icon from the imported font library
		// @doc/fr props/prefixFontIcon définit l'icône de préfixe à partir de la librairie de police importée
		prefixFontIcon: {
			type: String,
			default: undefined,
		},
	});

	static suffixIcon = (defaultValue?: Orion.Icon) => ({
		// @doc props/suffixIcon the suffix icon
		// @doc/fr props/suffixIcon définit l'icône de suffixe
		suffixIcon: {
			type: String as PropType<Orion.Icon>,
			default: defaultValue,
		},
		// @doc props/suffixFontIcon the suffix icon from the imported font library
		// @doc props/suffixFontIcon définit l'icône de suffixe à partir de la librairie de police importée
		suffixFontIcon: {
			type: String,
			default: undefined,
		},
	});

	/* 	static nav = () => ({
		items: {
			type: Array as PropType<Orion.NavItem[]>,
			default: () => [],
		},
	}); */
	static nav = () => ({ items: [] as Orion.NavItem[] });
}

