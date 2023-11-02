import { CssProperties, StrictValueSupportingDarkMode, ValueUsingApply } from "./darkmodeMiddleware.types"

type CssPropertiesSupportingDarkmode = Partial<Record<CssProperties, StrictValueSupportingDarkMode>>

type ComponentVariant = { APPLY?: ValueUsingApply } & CssPropertiesSupportingDarkmode | ValueUsingApply
type ComponentVariants = Record<string, ComponentVariant> & { DEFAULT: ComponentVariant }

type Components = Record<string, ValueUsingApply | ComponentVariant | ComponentVariants>

type RecordSupportingApply = Record<string, string> & { [x: ValueUsingApply]: {} }
type TailwindAddComponentsOriginalPluginArgument = Record<string, RecordSupportingApply>

type _AddComponents = (
   darkmodeClassname: string,
   theme: string,
   components: Components
) => TailwindAddComponentsOriginalPluginArgument

const components: Components = {
   'button': '@apply bg-blue-500 text-white font-bold py-2 px-4',
   'icon': '@apply w-24 h-24',
   'badge': {
      _base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      _light: 'tc-black bg-red-200',
      _dark: 'tc-white bg-red-600',
      primary: [
         'bg-blue-500 text-white font-bold py-2 px-4 rounded',
         'bg-blue-800 text-grey'
      ]
   },
   'badge2': {
      _default: {
         _apply: '@apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800',
         backgroundColor: ['red', 'blue'],
      }
   }
}

