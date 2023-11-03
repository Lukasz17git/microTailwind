import { _addComponents } from "./addComponents"
import { SimplifiedAddComponentsArgs } from "./addComponents.types"
import { _addCustomUtility, _addUtility } from "./addUtility"
import { SimplifiedAddCustomUtilityArgs, SimplifiedAddUtilityArgs } from "./addUtility.types"
import { UsingThemeWithDarkmodeSupportMiddleware, DarkmodePluginCreator } from "./darkmodeMiddleware.types"


export const usingThemeMiddleware: UsingThemeWithDarkmodeSupportMiddleware = (themeOrThemeCreator, themeCreator) => ({ addUtilities, addComponents }) => {

   const darkmodeClassname = usingThemeMiddleware.darkmodeClassname ?? 'dark'

   const wawThemeAdded = typeof themeOrThemeCreator === 'string'

   const theme = wawThemeAdded ? themeOrThemeCreator : ''
   const _themeCreator = wawThemeAdded ? themeCreator as DarkmodePluginCreator : themeOrThemeCreator

   const addUtilityMiddleware = (...args: SimplifiedAddUtilityArgs) => addUtilities(_addUtility(darkmodeClassname, theme, ...args))

   const addCustomUtilityMiddleware = (...args: SimplifiedAddCustomUtilityArgs) => addUtilities(_addCustomUtility(darkmodeClassname, theme, ...args))

   const addComponentsMiddleware = (...args: SimplifiedAddComponentsArgs) => addComponents(_addComponents(darkmodeClassname, theme, ...args))

   _themeCreator({
      addUtility: addUtilityMiddleware,
      addCustomUtility: addCustomUtilityMiddleware,
      addComponents: addComponentsMiddleware
   })
}