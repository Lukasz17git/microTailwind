import { StrictObject } from '../utils/typeHelpers'
import { supportedAbreviationsForDarkMode } from './utilitiesWithDarkMode'
import { PluginAPI } from "tailwindcss/types/config"

export type SupportedAbreviationsForDarkMode = keyof typeof supportedAbreviationsForDarkMode

type StringColor = string

type CustomColorClassName = string

type ColorSupportingDarkMode = StringColor | [StringColor] | [StringColor, StringColor] | [undefined, StringColor]

export type Utilities = Record<string, Record<string, string>>

type RecordOfCustomColorClassNames = Record<CustomColorClassName, ColorSupportingDarkMode>

export type AddUtilityType = (
   abreviation: SupportedAbreviationsForDarkMode,
   values: RecordOfCustomColorClassNames,
   options?: {
      tailwindDarkModeClass?: 'dark' | string
   }
) => Utilities

type addUtilityMiddlewareType = (...args: Parameters<AddUtilityType>) => void

type UseApplyKey = 'apply'
type ApplyValue = `@apply ${string}`

type UseApplyObject = { [K in UseApplyKey]?: ApplyValue }
type ApplyObject = Record<ApplyValue, {}>

export type RecordSupportingApply = Record<string, string> & ApplyObject
export type ComponentSupportingApply = Record<string, RecordSupportingApply>

type MicrotailwindStyles = Partial<Record<SupportedAbreviationsForDarkMode, ColorSupportingDarkMode>> & UseApplyObject

export type AddComponentUtilityType = <T>(
   yourCustomComponentClassname: string,
   utilitiesToApply: StrictObject<MicrotailwindStyles, T>,
   options?: {
      tailwindDarkModeClass?: 'dark' | string
      prefixForComponent?: 'use' | string
   }
) => { utilities: Utilities, component: ComponentSupportingApply }

type AddComponentUtilityMiddlewareType = (...args: Parameters<AddComponentUtilityType>) => void

type AddDarkModeUtilitiesFunction = (addDarkModeUtilitiesFunction: { addUtility: addUtilityMiddlewareType, addComponentUtility: AddComponentUtilityMiddlewareType }) => void

export type AddUtilitiesWithDarkModeType = (darkModeUtilitiesFunction: AddDarkModeUtilitiesFunction) => (arg: PluginAPI) => void