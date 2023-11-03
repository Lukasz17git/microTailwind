import { _AddUtility, _AddCustomUtility, TailwindAddUtilitiesOriginalPluginArgument } from "./addUtility.types"


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


/**
 * @description Add or override a tailwind utility with darkmode support
 */
export const _addUtility: _AddUtility = (darkmodeClassname, theme, utility, variants) => {

   const cssProperty = utilitiesPrefixMap[utility]

   const utilities: TailwindAddUtilitiesOriginalPluginArgument = {}

   for (const [variant, value] of Object.entries(variants)) {
      const utilityNameWithoutTheme = `.${utility}-${variant}`
      const fullUtilityName = theme ? `.${theme} ${utilityNameWithoutTheme}` : utilityNameWithoutTheme

      if (Array.isArray(value)) {
         if (value[0]) utilities[fullUtilityName] = { [cssProperty]: value[0] }
         if (value[1]) utilities[`.${darkmodeClassname} ${fullUtilityName}`] = { [cssProperty]: value[1] }
      } else {
         utilities[fullUtilityName] = { [cssProperty]: value }
      }
   }

   return utilities
}


/**
 * @description Add or override ANY tailwind utility with darkmode support
 */
export const _addCustomUtility: _AddCustomUtility = (darkmodeClassname, theme, utility, cssProperty, variants) => {

   const utilities: TailwindAddUtilitiesOriginalPluginArgument = {}

   for (const [variant, value] of Object.entries(variants)) {
      const utilityNameWithoutTheme = `.${utility}-${variant}`
      const fullUtilityName = theme ? `.${theme} ${utilityNameWithoutTheme}` : utilityNameWithoutTheme

      if (Array.isArray(value)) {
         if (value[0]) utilities[fullUtilityName] = { [cssProperty]: value[0] }
         if (value[1]) utilities[`.${darkmodeClassname} ${fullUtilityName}`] = { [cssProperty]: value[1] }
      } else {
         utilities[fullUtilityName] = { [cssProperty]: value }
      }
   }

   return utilities
}