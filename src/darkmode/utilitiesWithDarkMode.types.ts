import { StrictObject } from '../utils/typeHelpers'
import { supportedAbreviationsForDarkMode } from './addUtilitesWithDarkMode'
import { PluginAPI } from "tailwindcss/types/config"

// addUtility

type SupportedAbreviationsForDarkMode = keyof typeof supportedAbreviationsForDarkMode

type ValueSupportingDarkMode = string | [string] | [string, string] | [undefined, string]
type CustomColorClassName = string
type AddUtilitySupportingDarkmodeParameter = Record<CustomColorClassName, ValueSupportingDarkMode>

type Utilities = Record<string, Record<string, string>>

type AddUtilitySupportingDarkmode = (
   abreviation: SupportedAbreviationsForDarkMode,
   values: AddUtilitySupportingDarkmodeParameter,
   options?: {
      tailwindDarkModeClass?: 'dark' | string
   }
) => Utilities


//
type OnlyApply = `@apply ${string}`

type UseApplyObject = { [K in 'apply']?: OnlyApply }
type ApplyObject = Record<OnlyApply, {}>

type NonStrictComponentStylesSupportingDarkmode = Partial<Record<SupportedAbreviationsForDarkMode, ValueSupportingDarkMode>> & UseApplyObject
type ComponentStylesSupportingDarkmode<T> = StrictObject<NonStrictComponentStylesSupportingDarkmode, T>

type RecordSupportingApply = Record<string, string> & ApplyObject
type ComponentSupportingApply = Record<string, RecordSupportingApply>

type AddComponentSupportingDarkmode = <T>(
   yourCustomComponentClassname: string,
   utilitiesToApply: ComponentStylesSupportingDarkmode<T>,
   options?: {
      tailwindDarkModeClass?: 'dark' | string
      prefixForComponent?: 'use' | string
   }
) => { utilities: Utilities, component: ComponentSupportingApply }

// type addUtilityMiddlewareType = (...args: Parameters<AddUtilitySupportingDarkmode>) => void
// type AddComponentUtilityMiddlewareType = (...args: Parameters<AddComponentSupportingDarkmode>) => void

// type AddDarkModeUtilitiesFunction = (addDarkModeUtilitiesFunction: { addUtility: addUtilityMiddlewareType, addComponentUtility: AddComponentUtilityMiddlewareType }) => void

// type AddUtilitiesWithDarkModeType = (darkModeUtilitiesFunction: AddDarkModeUtilitiesFunction) => (arg: PluginAPI) => void


///////
type StylesForComponentSupportingDarkmode = OnlyApply |
   type ComponentSupportingDarkmode = Record<string | 'DEFAULT', StylesForComponentSupportingDarkmode>
type AddComponentsSupportingDarkmode = Record<string, ComponentSupportingDarkmode>