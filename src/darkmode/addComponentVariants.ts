import { TailwindAddComponentsOriginalPluginArgument } from "./addComponents.types"
import { _AddVariants } from "./addComponentVariants.types"

export const _addVariants: _AddVariants = (darkmodeClassname, theme, components) => {

   const result: TailwindAddComponentsOriginalPluginArgument = {}

   for (const [componentNameWithDot, variants] of Object.entries(components)) {

      const componentName = componentNameWithDot.slice(1)
      const addBaseComponentToApply = (apply: string) => `${apply} ${componentName}`

      for (const [variantName, applyOrVariant] of Object.entries(variants)) {

         let variantClassname: string
         let darkmodeVariantClassname: string
         {
            const variantFullname = `.${componentName}-${variantName}`
            variantClassname = theme ? `.${theme} ${variantFullname}` : variantFullname
            darkmodeVariantClassname = theme ? `.${darkmodeClassname}${variantClassname}` : `.${darkmodeClassname} ${variantClassname}`
         }

         // String or Array
         if (typeof applyOrVariant === 'string') {
            result[variantClassname] = { [addBaseComponentToApply(applyOrVariant)]: '' }
            continue
         }

         if (Array.isArray(applyOrVariant)) {
            if (applyOrVariant[0]) result[variantClassname] = { [addBaseComponentToApply(applyOrVariant[0])]: '' }
            if (applyOrVariant[1]) result[darkmodeVariantClassname] = { [applyOrVariant[1]]: '' }
            continue
         }

         // Object apply
         const { _apply: variantApply, ...variantCssProperties } = applyOrVariant!

         result[variantClassname] = {}
         result[darkmodeVariantClassname] = {}
         // remove ts-error for the next lines
         const resultVariant = result[variantClassname]!
         const resultDarkmodeVariant = result[darkmodeVariantClassname]!

         if (variantApply) {
            if (typeof variantApply === 'string') {
               resultVariant[addBaseComponentToApply(variantApply)] = ''
            }

            if (Array.isArray(variantApply)) {
               if (variantApply[0]) resultVariant[addBaseComponentToApply(variantApply[0])] = ''
               if (variantApply[1]) resultDarkmodeVariant[variantApply[1]] = ''
            }
         } else {
            resultVariant[`@apply ${componentName}`] = ''
         }

         // Css properties
         for (const [cssProperty, value] of Object.entries(variantCssProperties)) {
            if (typeof value === 'string') {
               resultVariant[cssProperty] = value
               continue
            }

            if (Array.isArray(value)) {
               if (value[0]) resultVariant[cssProperty] = value[0]
               if (value[1]) resultDarkmodeVariant[cssProperty] = value[1]
               continue
            }
         }
      }
   }

   return result
}
