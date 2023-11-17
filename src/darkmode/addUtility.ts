import { _AddUtility, _AddCustomUtility, TailwindAddUtilitiesOriginalPluginArgument } from "./addUtility.types"
import { ValueUsingApply } from "./middleware.types"

export const utilitiesPrefixMap = {
   bg: 'backgroundColor',
   tc: 'color',
   text: 'color',
   bc: 'borderColor',
   border: 'borderColor',
   fill: 'fill',
   o: 'outline',
   outline: 'outline',
   s: 'boxShadow',
   shadow: 'boxShadow',
} as const

const valueUsingApply: ValueUsingApply = '@apply '

export const _addUtility: _AddUtility = (darkmodeClassname, theme, utility, variants) => {

   const cssProperty = utilitiesPrefixMap[utility]

   const utilities: TailwindAddUtilitiesOriginalPluginArgument = {}

   for (const [variant, value] of Object.entries(variants)) {
      const utilityName = theme ? `.${theme} .${utility}-${variant}` : `.${utility}-${variant}`
      const darkmodeUtilityName = theme ? `.${darkmodeClassname}${utilityName}` : `.${darkmodeClassname} ${utilityName}`

      if (Array.isArray(value)) {
         if (value[0]) {
            if (value[0].startsWith(valueUsingApply)) {
               utilities[utilityName] = { [value[0]]: "" }
            } else {
               utilities[utilityName] = { [cssProperty]: value[0] }
            }
         }
         if (value[1]) {
            if (value[1].startsWith(valueUsingApply)) {
               utilities[darkmodeUtilityName] = { [value[1]]: "" }
            } else {
               utilities[darkmodeUtilityName] = { [cssProperty]: value[1] }
            }
         }
      } else {
         if (value.startsWith(valueUsingApply)) {
            utilities[utilityName] = { [value]: "" }
         } else {
            utilities[utilityName] = { [cssProperty]: value }
         }
      }
   }

   return utilities
}

export const _addCustomUtility: _AddCustomUtility = (darkmodeClassname, theme, utility, cssProperty, variants) => {

   const utilities: TailwindAddUtilitiesOriginalPluginArgument = {}

   for (const [variant, value] of Object.entries(variants)) {
      const utilityNameWithoutTheme = `.${utility}-${variant}`
      const utilityName = theme ? `.${theme} ${utilityNameWithoutTheme}` : utilityNameWithoutTheme
      const darkmodeUtilityName = theme ? `.${darkmodeClassname}${utilityName}` : `.${darkmodeClassname} ${utilityName}`

      if (Array.isArray(value)) {         
         if (value[0]) {
            if (value[0].startsWith(valueUsingApply)) {
               utilities[utilityName] = { [value[0]]: "" }
            } else {
               utilities[utilityName] = { [cssProperty]: value[0] }
            }
         }
         if (value[1]) {
            if (value[1].startsWith(valueUsingApply)) {
               utilities[darkmodeUtilityName] = { [value[1]]: "" }
            } else {
               utilities[darkmodeUtilityName] = { [cssProperty]: value[1] }
            }
         }
      } else {         
         if (value.startsWith(valueUsingApply)) {
            utilities[utilityName] = { [value]: "" }
         } else {
            utilities[utilityName] = { [cssProperty]: value }
         }
      }
   }

   return utilities
}