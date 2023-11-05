import { _addComponents } from "./addComponents"
import { AddComponents } from "./addComponents.types"
import { _addVariants } from "./addComponentVariants"
import { AddVariants } from "./addComponentVariants.types"
import { _addCustomUtility, _addUtility } from "./addUtility"
import { AddCustomUtility, AddUtility } from "./addUtility.types"
import { UsingThemeWithDarkmodeSupportMiddleware, DarkmodePluginCreator } from "./middleware.types"

export const themeMiddleware: UsingThemeWithDarkmodeSupportMiddleware = (themeOrThemeCreator, themeCreator) => ({ addUtilities, addComponents }) => {

   const darkmodeClassname = themeMiddleware.darkmodeClassname ?? 'dark'

   const wawThemeAdded = typeof themeOrThemeCreator === 'string'

   const theme = wawThemeAdded ? themeOrThemeCreator : ''
   const _themeCreator = wawThemeAdded ? themeCreator as DarkmodePluginCreator : themeOrThemeCreator

   const addUtilityMiddleware: AddUtility = (...args) => addUtilities(_addUtility(darkmodeClassname, theme, ...args))

   const addCustomUtilityMiddleware: AddCustomUtility = (...args) => addUtilities(_addCustomUtility(darkmodeClassname, theme, ...args))

   const addComponentsMiddleware: AddComponents = (...args) => addComponents(_addComponents(darkmodeClassname, theme, ...args))

   const addVariantsMiddleware: AddVariants = (...args) => addComponents(_addVariants(darkmodeClassname, theme, ...args))

   _themeCreator({
      addUtility: addUtilityMiddleware,
      addCustomUtility: addCustomUtilityMiddleware,
      addComponents: addComponentsMiddleware,
      addVariants: addVariantsMiddleware,
   })
}