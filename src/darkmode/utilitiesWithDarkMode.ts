import { AddComponentUtilityType, AddUtilitiesWithDarkModeType, AddUtilityType, SupportedAbreviationsForDarkMode, Utilities, RecordSupportingApply, ComponentSupportingApply } from './utilitiesWithDarkMode.types'

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

   const { tailwindDarkModeClass = 'dark' } = options

   const utilities: Utilities = {}

   for (const [customColorName, color] of Object.entries(values)) {
      const utilityKeyName = `.${microtailwindAbreviation}-${customColorName}`
      const cssProperty = supportedAbreviationsForDarkMode[microtailwindAbreviation]

      if (Array.isArray(color)) {
         if (color[0]) utilities[utilityKeyName] = { [cssProperty]: color[0] }
         if (color[1]) utilities[`.${tailwindDarkModeClass} ${utilityKeyName}`] = { [cssProperty]: color[1] }
      } else {
         utilities[utilityKeyName] = { [cssProperty]: color }
      }
   }

   return utilities
}

const addComponentUtility: AddComponentUtilityType = (componentClassname, microtailwindStyles, options = {}) => {

   const { tailwindDarkModeClass = 'dark', prefixForComponent = 'use' } = options

   const utilities: Utilities = {}

   const tailwindComponentClassname = `.${prefixForComponent}-${componentClassname}`
   const darkModeTailwindComponentClassname = `.${tailwindDarkModeClass} ${tailwindComponentClassname}`

   const { apply, ...microtailwindStylesWithoutUseApply } = microtailwindStyles

   const component: ComponentSupportingApply = {
      [tailwindComponentClassname]: {},
      [darkModeTailwindComponentClassname]: {},
   }

   if (apply) {
      component[tailwindComponentClassname] = { [apply]: {} } as RecordSupportingApply //needed to remove the error of ts that the provided key is not a string and rather a ApplyValue
   }

   for (const [supportedUtilityClassName, color] of Object.entries(microtailwindStylesWithoutUseApply)) {
      const cssProperty = supportedAbreviationsForDarkMode[supportedUtilityClassName as SupportedAbreviationsForDarkMode]
      if (!cssProperty) continue
      const utilityKeyName = `.${supportedUtilityClassName}-${componentClassname}`

      if (!Array.isArray(color)) {
         utilities[utilityKeyName] = { [cssProperty]: color }
         component[tailwindComponentClassname]![cssProperty] = color
      } else {
         if (color[0]) {
            utilities[utilityKeyName] = { [cssProperty]: color[0] }
            component[tailwindComponentClassname]![cssProperty] = color[0]
         }

         if (color[1]) {
            utilities[`.${tailwindDarkModeClass} ${utilityKeyName}`] = { [cssProperty]: color[1] }
            component[darkModeTailwindComponentClassname]![cssProperty] = color[1]
         }
      }
   }

   return { utilities, component }
}


export const addUtilitesWithDarkMode: AddUtilitiesWithDarkModeType = (darkModeUtilities) => ({ addUtilities, addComponents }) => {

   const addUtilityMiddleware = (...args: Parameters<AddUtilityType>) => addUtilities(addUtility(...args))

   const addComponentMiddleware = (...args: Parameters<AddComponentUtilityType>) => {
      const { utilities, component } = addComponentUtility(...args)
      addUtilities(utilities)
      addComponents(component)
   }

   darkModeUtilities({ addUtility: addUtilityMiddleware, addComponentUtility: addComponentMiddleware })
}
