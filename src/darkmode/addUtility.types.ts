import { OmitFirstTwoArguments } from "../utils/typeHelpers";
import { utilitiesPrefixMap } from "./addUtility";
import { CssProperties, FlexibleValueSupportingDarkMode } from "./darkmodeMiddleware.types";

type UtilitiesPrefix = keyof typeof utilitiesPrefixMap
export type TailwindAddUtilitiesOriginalPluginArgument = Record<string, Record<string, string>>

type VariantName = string
export type UtilityVariants = Record<VariantName, FlexibleValueSupportingDarkMode>

export type _AddUtility = (
   darkmodeClassname: string,
   theme: string,
   utility: UtilitiesPrefix,
   variants: UtilityVariants,
) => TailwindAddUtilitiesOriginalPluginArgument

export type _AddCustomUtility = (
   darkmodeClassname: string,
   theme: string,
   utility: UtilitiesPrefix,
   cssProperty: CssProperties,
   variants: UtilityVariants,
) => TailwindAddUtilitiesOriginalPluginArgument


export type SimplifiedAddUtilityArgs = OmitFirstTwoArguments<Parameters<_AddUtility>>
export type AddUtility = (...args: SimplifiedAddUtilityArgs) => void

export type SimplifiedAddCustomUtilityArgs = OmitFirstTwoArguments<Parameters<_AddCustomUtility>>
export type AddCustomUtility = (...args: SimplifiedAddCustomUtilityArgs) => void