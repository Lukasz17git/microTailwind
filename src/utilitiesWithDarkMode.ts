import { PluginAPI } from "tailwindcss/types/config"
import type { PropertiesHyphen } from 'csstype'

type CssProperty = keyof PropertiesHyphen
type UtilityValues = Record<string, string | [string, string]>

const addUtility = (cssClassAbreviation: string, cssProperty: CssProperty, values: UtilityValues, darkModeClass = 'dark') => {

   const utilities: Record<string, Record<string, string>> = {}

   for (const value of Object.keys(values)) {
      const color = values[value]!
      const isColorAnArray = Array.isArray(color)
      const utilityKeyName = `.${cssClassAbreviation}-${value}`
      utilities[utilityKeyName] = { [cssProperty]: isColorAnArray ? color[0] : color }
      if (isColorAnArray && color[1]) {
         utilities[`.${darkModeClass} ${utilityKeyName}`] = { [cssProperty]: color[1] }
      }
   }

   return utilities
}

type AddUtilityType = (...args: Parameters<typeof addUtility>) => void
type AddUtilitiesArgument = ({ addUtility }: { addUtility: AddUtilityType }) => void

export const addUtilitesWithDarkMode = (utilities: AddUtilitiesArgument) => ({ addUtilities }: { addUtilities: PluginAPI['addUtilities'] }) => {
   const addUtilityMiddleware = (...args: Parameters<typeof addUtility>) => addUtilities(addUtility(...args))
   utilities({ addUtility: addUtilityMiddleware })
}

export default addUtilitesWithDarkMode


















type AddUtilitiesArgument = ({ addUtility, addClassNamedUtility }: { addUtility: AddUtilityType, addClassNamedUtility: AddClassNamedUtilityType }) => void
type AddUtilityType = typeof addUtility
type AddClassNamedUtilityType = typeof addClassNamedUtility

export const addUtilitesWithDarkMode = (utilities: AddUtilitiesArgument) => ({ addUtilities }) => {
   const addUtilityMiddleware = (...args: Parameters<AddUtilityType>) => addUtilities(addUtility(...args))
   const addClassNamedUtilityMiddleware = (...args: Parameters<AddClassNamedUtilityType>) => addUtilities(addClassNamedUtility(...args))
   utilities({ addUtility: addUtilityMiddleware, addClassNamedUtility: addClassNamedUtilityMiddleware })
}

const addUtility = (abreviation: string, cssProperty: string, values: Record<string, string | [string, string]>, darkModeClass = 'dark') => {

   const utilities = {}

   for (const value of Object.keys(values)) {
      const color = values[value]
      const isColorAnArray = Array.isArray(color)
      const utilityKeyName = `.${abreviation}-${value}`
      utilities[utilityKeyName] = { [cssProperty]: isColorAnArray ? color[0] : color }
      if (isColorAnArray && color[1]) {
         utilities[`.${darkModeClass} ${utilityKeyName}`] = { [cssProperty]: color[1] }
      }
   }

   return utilities
}

type AvailableMixedUtilityStyles = 'color' | 'backgroundColor' | 'borderColor' | 'fill' | 'outline'

type MappedStyles = { [key in AvailableMixedUtilityStyles]: string }

const addClassNamedUtility = (name: string, cssStyles: Partial<Record<AvailableMixedUtilityStyles, string | [string, string]>>, darkModeClass = 'dark') => {

   const allUtilitiesAtOnce = `.${name}-allStyles`
   const darkModeAllUtilitiesAtOnce = `.${darkModeClass} ${allUtilitiesAtOnce}`
   const utilities: Record<string, Record<string, string>> = {
      [allUtilitiesAtOnce]: {},
      [darkModeAllUtilitiesAtOnce]: {},
   }

   const classNameMap: MappedStyles = {
      color: 'tc',
      backgroundColor: 'bg',
      borderColor: 'bc',
      fill: 'fill',
      outline: 'o'
   }

   for (const cssProperty of Object.keys(cssStyles)) {
      const color = cssStyles[cssProperty]
      const isColorAnArray = Array.isArray(color)
      const utilityKeyName = `.${name}-${classNameMap[cssProperty]}`
      utilities[utilityKeyName] = { [cssProperty]: isColorAnArray ? color[0] : color }
      utilities[allUtilitiesAtOnce][cssProperty] = isColorAnArray ? color[0] : color
      if (isColorAnArray && color[1]) {
         utilities[`.${darkModeClass} ${utilityKeyName}`] = { [cssProperty]: color[1] }
         utilities[darkModeAllUtilitiesAtOnce][cssProperty] = color[1]
      }
   }

   return utilities
}

export default addUtilitesWithDarkMode