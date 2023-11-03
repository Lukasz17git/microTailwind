import { OmitFirstTwoArguments } from "../utils/typeHelpers"
import { CssProperties, ValueSupportingDarkMode } from "./darkmodeMiddleware.types"

export type ValueUsingApply = `@apply ${string}`
type ValueUsingApplySupportingDarkMode = ValueUsingApply | [ValueUsingApply] | [ValueUsingApply, ValueUsingApply]
type ApplyObject = { _apply: ValueUsingApplySupportingDarkMode }

export type Variant = ValueUsingApplySupportingDarkMode | Partial<ApplyObject & Record<CssProperties, ValueSupportingDarkMode>>
type VariantName = string
export type Component = ValueUsingApplySupportingDarkMode | Partial<ApplyObject & Record<VariantName, Variant>>
type ComponentName = string
export type Components = Record<ComponentName, Component>

export type TailwindAddComponentsOriginalPluginArgument = Record<string, Record<string | ValueUsingApply, string>>

export type _AddComponents = (
   darkmodeClassname: string,
   theme: string,
   components: Components
) => TailwindAddComponentsOriginalPluginArgument

export type SimplifiedAddComponentsArgs = OmitFirstTwoArguments<Parameters<_AddComponents>>
export type AddComponents = (...args: SimplifiedAddComponentsArgs) => void
