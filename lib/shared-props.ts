
export type SharedPropsvModel<T> = {
    modelValue?: T,
  }

export type SharedPropsIcon = {
    icon?: Orion.Icon,
    fontIcon?: string
  }
export type SharedPropsPrefixIcon = {
    prefixIcon?: Orion.Icon,
    prefixFontIcon?: string
  }
export type SharedPropsSuffixIcon = {
    suffixIcon?: Orion.Icon,
    suffixFontIcon?: string
  }

export type SharedPropsColor = {
    color?: Orion.Color
  }

export type SharedPropsColorExtended = {
    color?: Orion.ColorExtended
  }

export type SharedPropsColorExtentedAndGreys = {
    color?: Orion.ColorExtendedAndGreys
  }

export type SharedPropsSize = {
    size?: Orion.Size
  }

export type SharedPropsNav = {
    items: Orion.NavItem[]
  }
