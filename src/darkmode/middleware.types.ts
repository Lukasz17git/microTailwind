import { PluginAPI } from "tailwindcss/types/config"
import { AddCustomUtility, AddUtility } from "./add-utility.types";
import { AddComponents } from "./add-components.types";
import { AddVariants } from "./add-component-variants.types";

export type ValueSupportingDarkMode = string | [string] | [string, string]
export type FlexibleValueSupportingDarkMode = ValueSupportingDarkMode | [undefined, string]

export type ValueUsingApply = `@apply ${string}`
type ValueUsingApplySupportingDarkMode = ValueUsingApply | [ValueUsingApply] | [ValueUsingApply, ValueUsingApply]
export type FlexibleValueUsingApplySupportingDarkMode = ValueUsingApplySupportingDarkMode | [undefined, ValueUsingApply]
export type ApplyObject = { _apply: FlexibleValueUsingApplySupportingDarkMode }

export type DarkmodePluginCreator = (
   darkmodeCreator: {
      addUtility: AddUtility,
      addCustomUtility: AddCustomUtility,
      addComponents: AddComponents,
      addVariants: AddVariants,
   }
) => void

export type UsingThemeWithDarkmodeSupportMiddleware = {
   (themeOrThemeCreator: DarkmodePluginCreator, themeCreator?: undefined): (arg: PluginAPI) => void;
   (themeOrThemeCreator: string, themeCreator: DarkmodePluginCreator): (arg: PluginAPI) => void;
   darkmodeClassname?: string;
};



