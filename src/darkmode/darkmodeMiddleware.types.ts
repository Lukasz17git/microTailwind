import { PluginAPI } from "tailwindcss/types/config"
import { AddCustomUtility, AddUtility } from "./addUtility.types";
import { Properties } from 'csstype'

export type CssProperties = keyof Properties

export type StrictValueSupportingDarkMode = string | [string] | [string, string]
export type ValueSupportingDarkMode = StrictValueSupportingDarkMode | [undefined, string]
export type ValueUsingApply = `@apply ${string}`
type ValueUsingApplySupportingDarkMode = ValueUsingApply | [ValueUsingApply] | [ValueUsingApply, ValueUsingApply] | [undefined, ValueUsingApply]

export type DarkmodePluginCreator = (
   darkmodeCreator: {
      addUtility: AddUtility,
      addCustomUtility: AddCustomUtility,
      addComponents: AddComponents,
   }
) => void

// export type DarkmodeMiddleware = (themeOrThemeCreator: DarkmodePluginCreator, themeCreator: undefined) => (arg: PluginAPI) => void
// export type DarkmodeMiddlewareWithTheme = (themeOrThemeCreator: string, themeCreator: DarkmodePluginCreator) => (arg: PluginAPI) => void

export type ThemeWithDarkmodeSupportMiddleware = {
   (themeOrThemeCreator: DarkmodePluginCreator, themeCreator: undefined): (arg: PluginAPI) => void;
   (themeOrThemeCreator: string, themeCreator: DarkmodePluginCreator): (arg: PluginAPI) => void;
   darkmodeClassname?: string;
};



