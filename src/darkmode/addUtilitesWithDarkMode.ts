import {
   AddUtilitySupportingDarkmode, AddUtilitiesWithDarkModeType, AddComponentSupportingDarkmode,
   SupportedAbreviationsForDarkMode, Utilities, ComponentSupportingApply
} from './utilitiesWithDarkMode.types'

export const supportedAbreviationsForDarkMode = {
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

const addUtility: AddUtilitySupportingDarkmode = (microtailwindAbreviation, values, options = {}) => {

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



///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////

// esta forma no está nada mal
const components = {
   '.button': {
      DEFAULT: '@apply h-40. frcc br-8. py-8. px-20. tw-semibold ts-14. min-w-120. max-w-100%',
      primary: {
         tc: ['black', 'white'],
         bg: ['white', 'black'],
         s: ['0 0 0 1px rgba(0, 0, 0, 0.5)', '0 0 0 1px rgba(244, 244, 244, 0.8)'],
      },
      'primary-hover': {
         tc: ['white', 'black'],
         bg: ['black', 'white'],
      },
   },
   '.icon': '@apply w-24. h-24.',
   '.action-icon': '@apply pos-r frcc h-40. w-40. br-6.',
   //y puede que añadir todo el typo de addComponents para usar estilos css
   
}
///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////

const addComponentUtility: AddComponentSupportingDarkmode = (componentClassname, microtailwindStyles, options = {}) => {

   const { tailwindDarkModeClass = 'dark', prefixForComponent = '' } = options

   const utilities: Utilities = {}

   const tailwindComponentClassname = prefixForComponent ? `.${prefixForComponent}-${componentClassname}` : `.${componentClassname}`
   const darkModeTailwindComponentClassname = `.${tailwindDarkModeClass} ${tailwindComponentClassname}`

   const { apply, ...microtailwindStylesWithoutUseApply } = microtailwindStyles

   const component: ComponentSupportingApply = {
      [tailwindComponentClassname]: {},
      [darkModeTailwindComponentClassname]: {},
   }

   if (apply) {
      component[tailwindComponentClassname]![apply] = {}
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

   const addUtilityMiddleware = (...args: Parameters<AddUtilitySupportingDarkmode>) => addUtilities(addUtility(...args))

   const addComponentMiddleware = (...args: Parameters<AddComponentSupportingDarkmode>) => {
      const { utilities, component } = addComponentUtility(...args)
      addUtilities(utilities)
      addComponents(component)
   }

   darkModeUtilities({ addUtility: addUtilityMiddleware, addComponentUtility: addComponentMiddleware })
}


const result = addComponentUtility('button', {
   apply: '@apply text-red-500',
})

console.log('result', result)