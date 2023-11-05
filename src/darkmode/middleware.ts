import { _addComponents } from "./addComponents"
import { SimplifiedAddComponentsArgs } from "./addComponents.types"
import { _addComponentsWithVariants } from "./addComponentsWithVariants"
import { SimplifiedAddComponentsWithVariantsArgs } from "./addComponentsWithVariants.types"
import { _addCustomUtility, _addUtility } from "./addUtility"
import { SimplifiedAddCustomUtilityArgs, SimplifiedAddUtilityArgs } from "./addUtility.types"
import { UsingThemeWithDarkmodeSupportMiddleware, DarkmodePluginCreator } from "./middleware.types"

export const themeMiddleware: UsingThemeWithDarkmodeSupportMiddleware = (themeOrThemeCreator, themeCreator) => ({ addUtilities, addComponents }) => {

   const darkmodeClassname = themeMiddleware.darkmodeClassname ?? 'dark'

   const wawThemeAdded = typeof themeOrThemeCreator === 'string'

   const theme = wawThemeAdded ? themeOrThemeCreator : ''
   const _themeCreator = wawThemeAdded ? themeCreator as DarkmodePluginCreator : themeOrThemeCreator

   const addUtilityMiddleware = (...args: SimplifiedAddUtilityArgs) => addUtilities(_addUtility(darkmodeClassname, theme, ...args))

   const addCustomUtilityMiddleware = (...args: SimplifiedAddCustomUtilityArgs) => addUtilities(_addCustomUtility(darkmodeClassname, theme, ...args))

   const addComponentsMiddleware = (...args: SimplifiedAddComponentsArgs) => addComponents(_addComponents(darkmodeClassname, theme, ...args))

   const addComponentsWithVariantsMiddleware = (...args: SimplifiedAddComponentsWithVariantsArgs) => addComponents(_addComponentsWithVariants(darkmodeClassname, theme, ...args))

   _themeCreator({
      addUtility: addUtilityMiddleware,
      addCustomUtility: addCustomUtilityMiddleware,
      addComponents: addComponentsMiddleware,
      addComponentsWithVariants: addComponentsWithVariantsMiddleware,
   })
}