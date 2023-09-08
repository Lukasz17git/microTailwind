import { AddUtilityType, Utilities, AddComponentUtilityType, SupportedAbreviationsForDarkMode, AddUtilitiesWithDarkModeType } from './utilitiesWithDarkMode.types'

export const supportedAbreviationsForDarkMode = {
   bg: 'backgroundColor',
   tc: 'color',
   text: 'color',
   bc: 'borderColor',
   border: 'borderColor',
   fill: 'fill',
   o: 'outline',
   outline: 'outline',
} as const

const addUtility: AddUtilityType = (microtailwindAbreviation, values, options = {}) => {

   const { darkModeClass = 'dark' } = options

   const utilities: Utilities = {}

   for (const [customColorName, color] of Object.entries(values)) {
      const utilityKeyName = `.${microtailwindAbreviation}-${customColorName}`
      const cssProperty = supportedAbreviationsForDarkMode[microtailwindAbreviation]

      if (Array.isArray(color)) {
         if (color[0]) utilities[utilityKeyName] = { [cssProperty]: color[0] }
         if (color[1]) utilities[`.${darkModeClass} ${utilityKeyName}`] = { [cssProperty]: color[1] }
      } else {
         utilities[utilityKeyName] = { [cssProperty]: color }
      }
   }

   return utilities
}

const addComponentUtility: AddComponentUtilityType = (componentClassname, microtailwindStyles, options = {}) => {

   const { darkModeClass = 'dark', prefixForApplyingAllStylesAtOnce = 'component' } = options

   const allUtilitiesAtOnce = `.${prefixForApplyingAllStylesAtOnce}-${componentClassname}`
   const darkModeAllUtilitiesAtOnce = `.${darkModeClass} ${allUtilitiesAtOnce}`
   const utilities: Utilities = {
      [allUtilitiesAtOnce]: {},
      [darkModeAllUtilitiesAtOnce]: {},
   }

   for (const [supportedUtilityClassName, color] of Object.entries(microtailwindStyles)) {
      const cssProperty = supportedAbreviationsForDarkMode[supportedUtilityClassName as SupportedAbreviationsForDarkMode]
      const utilityKeyName = `.${supportedUtilityClassName}-${componentClassname}`

      if (!Array.isArray(color)) {
         utilities[utilityKeyName] = { [cssProperty]: color }
         utilities[allUtilitiesAtOnce]![cssProperty] = color
      } else {
         if (color[0]) {
            utilities[utilityKeyName] = { [cssProperty]: color[0] }
            utilities[allUtilitiesAtOnce]![cssProperty] = color[0]
         }

         if (color[1]) {
            utilities[`.${darkModeClass} ${utilityKeyName}`] = { [cssProperty]: color[1] }
            utilities[darkModeAllUtilitiesAtOnce]![cssProperty] = color[1]
         }
      }
   }

   return utilities
}


export const addUtilitesWithDarkMode: AddUtilitiesWithDarkModeType = (darkModeUtilities) => ({ addUtilities }) => {

   const addUtilityMiddleware = (...args: Parameters<AddUtilityType>) => addUtilities(addUtility(...args))

   const addClassNamedUtilityMiddleware = (...args: Parameters<AddComponentUtilityType>) => addUtilities(addComponentUtility(...args))

   darkModeUtilities({ addUtility: addUtilityMiddleware, addComponentUtility: addClassNamedUtilityMiddleware })
}
