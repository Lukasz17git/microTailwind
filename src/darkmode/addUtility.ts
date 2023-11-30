import { colorWithOpacity } from "../utils/colorWithOpacity"
import { _AddUtility, _AddCustomUtility, TailwindAddUtilitiesOriginalPluginArgument, UtilityVariants } from "./addUtility.types"
import { FlexibleValueSupportingDarkMode, FlexibleValueUsingApplySupportingDarkMode, ValueUsingApply } from "./middleware.types"

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
   stroke: 'stroke',
   shadow: 'boxShadow',
   s: 'boxShadow'
}

const valueUsingApply: ValueUsingApply = '@apply '
type ComboTextUtilities = 'fill' | 'stroke'
const comboReplace = (replace: ComboTextUtilities, variants: UtilityVariants) => {
   const copy = { ...variants }
   for (const [key, value] of Object.entries(copy)) {
      if (typeof value === 'string' && value.startsWith(valueUsingApply)) {
         copy[key] = value.replace('tc-', `${replace}-`)
      } else if (Array.isArray(value)) {
         const valueArrayCopy: typeof value = [...value]
         valueArrayCopy.forEach((value, index) => {
            if (value && value.startsWith(valueUsingApply)) {
               valueArrayCopy[index] = valueArrayCopy[index]?.replace('tc-', `${replace}-`)
            }
         })
         copy[key] = valueArrayCopy
      }
   }
   return copy
}

export const _addUtility: _AddUtility = (darkmodeClassname, theme, utility, variants) => {

   if (utility === 'combo_tc') {
      const tcUtilities = _addUtility(darkmodeClassname, theme, 'tc', variants)
      const strokeUtilities = _addUtility(darkmodeClassname, theme, 'stroke', comboReplace('stroke', variants))
      const fillUtilities = _addUtility(darkmodeClassname, theme, 'fill', comboReplace('fill', variants))
      return {
         ...tcUtilities,
         ...strokeUtilities,
         ...fillUtilities
      }
   }

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