import { PluginAPI } from "tailwindcss/types/config"
import { AddCustomUtility, AddUtility } from "./addUtility.types";
import { Properties } from 'csstype'
import { AddComponents } from "./addComponents.types";

export type CssProperties = keyof Properties

export type ValueSupportingDarkMode = string | [string] | [string, string]
export type FlexibleValueSupportingDarkMode = ValueSupportingDarkMode | [undefined, string]

export type DarkmodePluginCreator = (
   darkmodeCreator: {
      addUtility: AddUtility,
      addCustomUtility: AddCustomUtility,
      addComponents: AddComponents,
   }
) => void

export type UsingThemeWithDarkmodeSupportMiddleware = {
   (themeOrThemeCreator: DarkmodePluginCreator, themeCreator?: undefined): (arg: PluginAPI) => void;
   (themeOrThemeCreator: string, themeCreator: DarkmodePluginCreator): (arg: PluginAPI) => void;
   darkmodeClassname?: string;
};



