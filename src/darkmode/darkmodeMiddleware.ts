import { addCustomUtility, addUtility } from "./addUtility"
import { SimplifiedAddCustomUtilityArgs, SimplifiedAddUtilityArgs } from "./addUtility.types"
import { ThemeWithDarkmodeSupportMiddleware, DarkmodePluginCreator } from "./darkmodeMiddleware.types"


const themeMiddleware: ThemeWithDarkmodeSupportMiddleware = (themeOrThemeCreator, themeCreator) => ({ addUtilities, addComponents }) => {

   const darkmodeClassname = themeMiddleware.darkmodeClassname ?? 'dark'

   const wawThemeAdded = typeof themeOrThemeCreator === 'string'

   const theme = wawThemeAdded ? themeOrThemeCreator : ''
   const _themeCreator = wawThemeAdded ? themeCreator as DarkmodePluginCreator : themeOrThemeCreator

   const addUtilityMiddleware = (...args: SimplifiedAddUtilityArgs) => addUtilities(addUtility(darkmodeClassname, theme, ...args))

   const addCustomUtilityMiddleware = (...args: SimplifiedAddCustomUtilityArgs) => addUtilities(addCustomUtility(darkmodeClassname, theme, ...args))

   const addComponentsMiddleware = (...args: SimplifiedAddComponentsArgs) => {
      const { utilities, component } = addComponentUtility(...args)
      addUtilities(utilities)
      addComponents(component)
   }

   _themeCreator({
      addUtility: addUtilityMiddleware,
      addCustomUtility: addCustomUtilityMiddleware,
      addComponents: addComponentsMiddleware
   })
}