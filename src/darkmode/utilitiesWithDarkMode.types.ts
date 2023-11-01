import { StrictObject } from '../utils/typeHelpers'
import { supportedAbreviationsForDarkMode } from './utilitiesWithDarkMode'
import { PluginAPI } from "tailwindcss/types/config"

export type SupportedAbreviationsForDarkMode = keyof typeof supportedAbreviationsForDarkMode

type StringColor = string
type ValueSupportingDarkMode = StringColor | [StringColor] | [StringColor, StringColor] | [undefined, StringColor]
type CustomColorClassName = string
export type AddUtilitySupportingDarkmodeParameter = Record<CustomColorClassName, ValueSupportingDarkMode>

export type Utilities = Record<string, Record<string, string>>

export type AddUtilitySupportingDarkmode = (
   abreviation: SupportedAbreviationsForDarkMode,
   values: AddUtilitySupportingDarkmodeParameter,
   options?: {
      tailwindDarkModeClass?: 'dark' | string
   }
) => Utilities

export type ApplyFormat = `@apply ${string}`

type UseApplyObject = { [K in 'apply']?: ApplyFormat }
type ApplyObject = Record<ApplyFormat, {}>

type MicrotailwindStyles = Partial<Record<SupportedAbreviationsForDarkMode, ValueSupportingDarkMode>> & UseApplyObject
export type AddComponentSupportingDarkmodeParameter<T> = StrictObject<MicrotailwindStyles, T>

export type RecordSupportingApply = Record<string, string> & ApplyObject
export type ComponentSupportingApply = Record<string, RecordSupportingApply>

export type AddComponentSupportingDarkmode = <T>(
   yourCustomComponentClassname: string,
   utilitiesToApply: AddComponentSupportingDarkmodeParameter<T>,
   options?: {
      tailwindDarkModeClass?: 'dark' | string
      prefixForComponent?: 'use' | string
   }
) => { utilities: Utilities, component: ComponentSupportingApply }

type addUtilityMiddlewareType = (...args: Parameters<AddUtilitySupportingDarkmode>) => void
type AddComponentUtilityMiddlewareType = (...args: Parameters<AddComponentSupportingDarkmode>) => void

type AddDarkModeUtilitiesFunction = (addDarkModeUtilitiesFunction: { addUtility: addUtilityMiddlewareType, addComponentUtility: AddComponentUtilityMiddlewareType }) => void

export type AddUtilitiesWithDarkModeType = (darkModeUtilitiesFunction: AddDarkModeUtilitiesFunction) => (arg: PluginAPI) => void