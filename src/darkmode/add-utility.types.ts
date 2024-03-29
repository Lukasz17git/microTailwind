import { CssProperties, OmitFirstTwoArguments } from "../utils/typeHelpers";
import { comboUtilitiesPrefixMap, utilitiesPrefixMap } from "./add-utility";
import { FlexibleValueSupportingDarkMode, FlexibleValueUsingApplySupportingDarkMode } from "./middleware.types";

type UtilitiesPrefix = keyof typeof utilitiesPrefixMap
type UtilitiesComboPrefix = keyof typeof comboUtilitiesPrefixMap
export type TailwindAddUtilitiesOriginalPluginArgument = Record<string, Record<string, string>>

type VariantName = string
export type UtilityVariants = Record<VariantName, FlexibleValueSupportingDarkMode | FlexibleValueUsingApplySupportingDarkMode>

export type _AddUtility = (
   darkmodeClassname: string,
   theme: string,
   utility: UtilitiesPrefix | UtilitiesComboPrefix,
   variants: UtilityVariants,
) => TailwindAddUtilitiesOriginalPluginArgument

export type _AddCustomUtility = (
   darkmodeClassname: string,
   theme: string,
   utility: string,
   cssProperty: CssProperties,
   variants: UtilityVariants,
) => TailwindAddUtilitiesOriginalPluginArgument


type SimplifiedAddUtilityArgs = OmitFirstTwoArguments<Parameters<_AddUtility>>
/**
 * @description Add or override a tailwindcss utility with darkmode support
 */
export type AddUtility = (...args: SimplifiedAddUtilityArgs) => void

type SimplifiedAddCustomUtilityArgs = OmitFirstTwoArguments<Parameters<_AddCustomUtility>>
/**
 * @description Add or override ANY tailwindcss utility with darkmode support
 */
export type AddCustomUtility = (...args: SimplifiedAddCustomUtilityArgs) => void