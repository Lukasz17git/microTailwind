import { colorWithOpacity } from "../utils/colorWithOpacity"
import { _AddUtility, _AddCustomUtility, TailwindAddUtilitiesOriginalPluginArgument } from "./addUtility.types"
import { ValueUsingApply } from "./middleware.types"

const applyBackgroundWithColorOpacity = (value: string) => colorWithOpacity(value, '--tw-bg-opacity', color => ({ backgroundColor: color }))
const applyTextColorWithColorOpacity = (value: string) => colorWithOpacity(value, '--tw-text-opacity', color => ({ color: color }))
const applyBorderColorWithColorOpacity = (value: string) => colorWithOpacity(value, '--tw-border-opacity', color => ({ borderColor: color }))
const applyOutlineWithColorOpacity = (value: string) => colorWithOpacity(value, '--tw-outline-opacity', color => ({ outlineColor: color }))

export const utilitiesPrefixMap = {
   bg: applyBackgroundWithColorOpacity,
   text: applyTextColorWithColorOpacity,
   tc: applyTextColorWithColorOpacity,
   border: applyBorderColorWithColorOpacity,
   bc: applyBorderColorWithColorOpacity,
   outline: applyOutlineWithColorOpacity,
   o: applyOutlineWithColorOpacity,
   fill: 'fill',
   shadow: 'boxShadow',
   s: 'boxShadow'
}

const valueUsingApply: ValueUsingApply = '@apply '

export const _addUtility: _AddUtility = (darkmodeClassname, theme, utility, variants) => {

   const cssPropertyOrApplyFunction = utilitiesPrefixMap[utility]

   const utilities: TailwindAddUtilitiesOriginalPluginArgument = {}

   for (const [variant, value] of Object.entries(variants)) {
      const utilityName = theme ? `.${theme} .${utility}-${variant}` : `.${utility}-${variant}`
      const darkmodeUtilityName = theme ? `.${darkmodeClassname}${utilityName}` : `.${darkmodeClassname} ${utilityName}`

      if (Array.isArray(value)) {
         if (value[0]) {
            if (value[0].startsWith(valueUsingApply)) {
               utilities[utilityName] = { [value[0]]: "" }
            } else {
               utilities[utilityName] = typeof cssPropertyOrApplyFunction === 'string' ? { [cssPropertyOrApplyFunction]: value[0] } : cssPropertyOrApplyFunction(value[0])
            }
         }
         if (value[1]) {
            if (value[1].startsWith(valueUsingApply)) {
               utilities[darkmodeUtilityName] = { [value[1]]: "" }
            } else {
               utilities[darkmodeUtilityName] = typeof cssPropertyOrApplyFunction === 'string' ? { [cssPropertyOrApplyFunction]: value[1] } : cssPropertyOrApplyFunction(value[1])

            }
         }
      } else {
         if (value.startsWith(valueUsingApply)) {
            utilities[utilityName] = { [value]: "" }
         } else {
            utilities[utilityName] = typeof cssPropertyOrApplyFunction === 'string' ? { [cssPropertyOrApplyFunction]: value } : cssPropertyOrApplyFunction(value)
            
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