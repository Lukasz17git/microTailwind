import { colorWithOpacity } from "../utils/colorWithOpacity"
import { _AddUtility, _AddCustomUtility, TailwindAddUtilitiesOriginalPluginArgument, UtilityVariants } from "./add-utility.types"
import { ValueUsingApply } from "./middleware.types"

const applyBackgroundWithColorOpacity = (value: string) => colorWithOpacity(value, '--tw-bg-opacity', color => ({ backgroundColor: color }))

const applyTextColorWithColorOpacity = (value: string) => colorWithOpacity(value, '--tw-text-opacity', color => ({ color: color }))

const applyOutlineWithColorOpacity = (value: string) => colorWithOpacity(value, '--tw-outline-opacity', color => ({ outlineColor: color }))

const applyBorderColorWithColorOpacity = (value: string) => colorWithOpacity(value, '--tw-border-opacity', color => ({ borderColor: color }))

const applyBorderYColorWithColorOpacity = (value: string) => colorWithOpacity(value, '--tw-border-opacity', color => ({ borderTopColor: color, borderBottomColor: color }))
const applyBorderXColorWithColorOpacity = (value: string) => colorWithOpacity(value, '--tw-border-opacity', color => ({ borderRightColor: color, borderLeftColor: color }))
const applyBorderTopColorWithColorOpacity = (value: string) => colorWithOpacity(value, '--tw-border-opacity', color => ({ borderTopColor: color }))
const applyBorderRightColorWithColorOpacity = (value: string) => colorWithOpacity(value, '--tw-border-opacity', color => ({ borderRightColor: color }))
const applyBorderBottomColorWithColorOpacity = (value: string) => colorWithOpacity(value, '--tw-border-opacity', color => ({ borderBottomColor: color }))
const applyBorderLeftColorWithColorOpacity = (value: string) => colorWithOpacity(value, '--tw-border-opacity', color => ({ borderLeftColor: color }))

export const utilitiesPrefixMap = {
   bg: applyBackgroundWithColorOpacity,
   tc: applyTextColorWithColorOpacity,
   oc: applyOutlineWithColorOpacity,
   bc: applyBorderColorWithColorOpacity,
   byc: applyBorderYColorWithColorOpacity,
   bxc: applyBorderXColorWithColorOpacity,
   btc: applyBorderTopColorWithColorOpacity,
   brc: applyBorderRightColorWithColorOpacity,
   bbc: applyBorderBottomColorWithColorOpacity,
   blc: applyBorderLeftColorWithColorOpacity,
   fill: 'fill',
   stroke: 'stroke',
   shadow: 'boxShadow',
   s: 'boxShadow'
}

export const comboUtilitiesPrefixMap = {
   combo_text: ['tc', 'stroke', 'fill'],
   combo_border: ['bc', 'byc', 'bxc', 'btc', 'brc', 'bbc', 'blc']
} as const satisfies Record<string, readonly (keyof typeof utilitiesPrefixMap)[]>

const valueUsingApply: ValueUsingApply = '@apply '

const comboReplace = (
   utilityToBeReplaced: 'tc' | 'bc',
   replace: typeof comboUtilitiesPrefixMap[keyof typeof comboUtilitiesPrefixMap][number],
   variants: UtilityVariants
) => {
   const copy = { ...variants }
   for (const [key, value] of Object.entries(copy)) {
      if (typeof value === 'string' && value.startsWith(valueUsingApply)) {
         copy[key] = value.replace(`${utilityToBeReplaced}-`, `${replace}-`)
      } else if (Array.isArray(value)) {
         const valueArrayCopy: typeof value = [...value]
         valueArrayCopy.forEach((value, index) => {
            if (value && value.startsWith(valueUsingApply)) {
               valueArrayCopy[index] = valueArrayCopy[index]?.replace(`${utilityToBeReplaced}-`, `${replace}-`)
            }
         })
         copy[key] = valueArrayCopy
      }
   }
   return copy
}

export const _addUtility: _AddUtility = (darkmodeClassname, theme, utility, variants) => {

   const utilities: TailwindAddUtilitiesOriginalPluginArgument = {}

   if (utility === 'combo_text' || utility === 'combo_border') {
      const utilitiesToCombine = comboUtilitiesPrefixMap[utility]
      utilitiesToCombine.forEach(utility => {
         const singleUtility = _addUtility(darkmodeClassname, theme, utility, comboReplace(utilitiesToCombine[0], utility, variants))
         Object.assign(utilities, singleUtility)
      })
      return utilities
   }

   const cssPropertyOrApplyFunction = utilitiesPrefixMap[utility]

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