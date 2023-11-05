import { OmitFirstTwoArguments } from "../utils/typeHelpers"
import { ApplyObject, CssProperties, FlexibleValueUsingApplySupportingDarkMode, ValueSupportingDarkMode, ValueUsingApply } from "./middleware.types"

export type Component = FlexibleValueUsingApplySupportingDarkMode | Partial<ApplyObject & Record<CssProperties, ValueSupportingDarkMode>>
type ComponentName = `.${string}`
export type Components = Record<ComponentName, Component>

export type TailwindAddComponentsOriginalPluginArgument = Record<string, Record<string | ValueUsingApply, string>>

export type _AddComponents = (
   darkmodeClassname: string,
   theme: string,
   components: Components
) => TailwindAddComponentsOriginalPluginArgument

export type SimplifiedAddComponentsArgs = OmitFirstTwoArguments<Parameters<_AddComponents>>
export type AddComponents = (...args: SimplifiedAddComponentsArgs) => void