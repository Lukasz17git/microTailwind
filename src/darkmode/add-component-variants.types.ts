import { TailwindAddComponentsOriginalPluginArgument } from "./add-components.types"
import { ApplyObject, FlexibleValueUsingApplySupportingDarkMode, ValueSupportingDarkMode } from "./middleware.types"
import { CssProperties, OmitFirstTwoArguments } from "../utils/typeHelpers"

type Variant = FlexibleValueUsingApplySupportingDarkMode | Partial<ApplyObject & Record<CssProperties, ValueSupportingDarkMode>>
type VariantName = string
export type Variants = FlexibleValueUsingApplySupportingDarkMode | Record<VariantName, Variant>
type ComponentName = `.${string}`
export type ComponentsVariants<T> = T extends string ? Record<T, Variants> : Record<`.${string}`, Variants>

export type _AddVariants<T = unknown> = (
   darkmodeClassname: string,
   theme: string,
   variants: ComponentsVariants<T>
) => TailwindAddComponentsOriginalPluginArgument

type SimplifiedAddComponentVariantsArgs<T> = OmitFirstTwoArguments<Parameters<_AddVariants<T>>>
/**
 * @description Add tailwindcss variants for components with darkmode support
 */
export type AddVariants = <T extends ComponentName | unknown = unknown>(...args: SimplifiedAddComponentVariantsArgs<T>) => void
