
/*

type AddUtilitiesArgument = ({ addUtility }: { addUtility: AddUtilityType }) => void
type AddUtilityType = typeof addUtility

export const addUtilitesWithDarkMode = (utilities: AddUtilitiesArgument) => ({ addUtilities }) => {
   const addUtilityMiddleware = (...args: Parameters<typeof addUtility>) => addUtilities(addUtility(...args))
   utilities({ addUtility: addUtilityMiddleware })
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

   console.log(utilities)

   return utilities
}

export default addUtilitesWithDarkMode

*/

export const addUtilitesWithDarkMode = (utilities) => ({ addUtilities }) => {
   const addUtilityMiddleware = (...args) => addUtilities(addUtility(...args))
   utilities({ addUtility: addUtilityMiddleware })
}

const addUtility = (abreviation, cssProperty, values, darkModeClass = 'dark') => {

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

   console.log(utilities)

   return utilities
}

export default addUtilitesWithDarkMode