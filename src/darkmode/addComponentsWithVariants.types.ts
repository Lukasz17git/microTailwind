import { TailwindAddComponentsOriginalPluginArgument } from "./addComponents.types"
import { ApplyObject, CssProperties, FlexibleValueUsingApplySupportingDarkMode, ValueSupportingDarkMode } from "./middleware.types"
import { OmitFirstTwoArguments } from "../utils/typeHelpers"

type Variant = FlexibleValueUsingApplySupportingDarkMode | Partial<ApplyObject & Record<CssProperties, ValueSupportingDarkMode>>
type VariantName = string
export type ComponentWithVariants = FlexibleValueUsingApplySupportingDarkMode | Partial<ApplyObject & Record<VariantName, Variant>>
type ComponentWithVariantName = `.${string}`
export type ComponentsWithVariants = Record<ComponentWithVariantName, ComponentWithVariants>

export type _AddComponentsWithVariants = (
   darkmodeClassname: string,
   theme: string,
   componentsWithVariants: ComponentsWithVariants
) => TailwindAddComponentsOriginalPluginArgument

export type SimplifiedAddComponentsWithVariantsArgs = OmitFirstTwoArguments<Parameters<_AddComponentsWithVariants>>
export type AddComponentsWithVariants = (...args: SimplifiedAddComponentsWithVariantsArgs) => void
