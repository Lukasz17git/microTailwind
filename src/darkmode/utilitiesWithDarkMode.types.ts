import { StrictObject } from '../utils/typeHelpers'
import { supportedAbreviationsForDarkMode } from './utilitiesWithDarkMode'
import { PluginAPI } from "tailwindcss/types/config"

export type SupportedAbreviationsForDarkMode = keyof typeof supportedAbreviationsForDarkMode

type StringColor = string

type CustomColorClassName = string

type ColorSupportingDarkMode = StringColor | [StringColor] | [StringColor, StringColor] | [undefined, StringColor]

export type Utilities = Record<string, Record<string, string>>

export type RecordOfCustomColorClassNames = Record<CustomColorClassName, ColorSupportingDarkMode>

export type AddUtilityType = (
   abreviation: SupportedAbreviationsForDarkMode,
   values: RecordOfCustomColorClassNames,
   options?: {
      darkModeClass?: 'dark' | string
   }
) => Record<string, Record<string, string>>
type addUtilityMiddlewareType = (...args: Parameters<AddUtilityType>) => void


type MicrotailwindStyles = Partial<Record<SupportedAbreviationsForDarkMode, ColorSupportingDarkMode>>

export type AddComponentUtilityType = <T>(
   yourCustomComponentClassname: string,
   utilitiesToApply: StrictObject<MicrotailwindStyles, T>,
   options?: {
      darkModeClass?: 'dark' | string
      prefixForApplyingAllStylesAtOnce?: 'complete' | string
   }
) => Record<string, Record<string, string>>

type AddComponentUtilityMiddlewareType = (...args: Parameters<AddComponentUtilityType>) => void

type AddDarkModeUtilitiesFunction = (addDarkModeUtilitiesFunction: { addUtility: addUtilityMiddlewareType, addComponentUtility: AddComponentUtilityMiddlewareType }) => void

export type AddUtilitiesWithDarkModeType = (darkModeUtilitiesFunction: AddDarkModeUtilitiesFunction) => (arg: { addUtilities: PluginAPI['addUtilities'] }) => void


