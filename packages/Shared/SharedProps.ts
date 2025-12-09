import { MaterialIcon } from 'material-icons';

export type SharedPropsIcon = {
	// @doc props/icon the icon of the component
	// @doc/fr props/icon définit l'icône
	icon?: MaterialIcon,
	// @doc props/fontIcon the icon of the component, from the imported font library
	// @doc/fr props/fontIcon l'icône du composant, de la librairie de police importée
	fontIcon?: string
}

export type SharedPropsPrefixIcon = {
	// @doc props/prefixIcon the prefix icon
	// @doc/fr props/prefixIcon définit l'icône de préfixe
	prefixIcon?: MaterialIcon,
	// @doc props/prefixFontIcon the prefix icon from the imported font library
	// @doc/fr props/prefixFontIcon définit l'icône de préfixe à partir de la librairie de police importée
	prefixFontIcon?: string
}
export type SharedPropsSuffixIcon = {
	// @doc props/suffixIcon the suffix icon
		// @doc/fr props/suffixIcon définit l'icône de suffixe
	suffixIcon?: MaterialIcon,
	// @doc props/suffixFontIcon the suffix icon from the imported font library
	// @doc props/suffixFontIcon définit l'icône de suffixe à partir de la librairie de police importée
	suffixFontIcon?: string
}

export type SharedPropsColor = {
	// @doc props/color defines the color
	// @doc/fr props/color définit la couleur
	color?: Orion.Color
}

export type SharedPropsColorExtended = {
	// @doc props/color defines the color
	// @doc/fr props/color définit la couleur
	color?: Orion.ColorExtended
}

export type SharedPropsColorExtentedAndGreys = {
	// @doc props/color defines the color
	// @doc/fr props/color définit la couleur
	color?: Orion.ColorExtendedAndGreys
}

export type SharedPropsSize = {
	// @doc props/size define the size
	// @doc/fr props/size définit la taille
	size?: Orion.Size
}

export type SharedPropsNav = {
	items?: Orion.NavItem[]
}


export default class SharedProps {

	static readonly color = { color: 'neutral' as Orion.Color };

	static readonly colorExtented : SharedPropsColorExtended = { color: 'default' as Orion.ColorExtended };

	static readonly colorExtendedAndGreys = { color: 'neutral' as Orion.ColorExtendedAndGreys };

	static readonly size = { size: 'md' as Orion.Size };

	static readonly navDefault = { items: () => [] as Orion.NavItem[] };
}

