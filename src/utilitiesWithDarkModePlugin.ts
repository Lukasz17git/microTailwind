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