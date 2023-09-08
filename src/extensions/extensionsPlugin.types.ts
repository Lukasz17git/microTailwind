import { PluginAPI } from 'tailwindcss/types/config'
import { Config } from 'tailwindcss/types/config'
import { microtailwindExtensions } from './extensionsPlugin'

export type ExtensionSizeThemeParameter = { theme: PluginAPI['theme'] }

export type Extensions = NonNullable<NonNullable<Config['theme']>['extend']>

export type ExtendedThemeConfig = { minHeight: any, minWidth: any, maxWidth: any }

export type MicrotailwindExtendedExtensionsConfig = Partial<Record<`disable_${keyof typeof microtailwindExtensions}`, boolean>>

export type extendedExtensions = Extensions & Partial<ExtendedThemeConfig>