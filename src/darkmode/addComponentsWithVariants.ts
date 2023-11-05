import { TailwindAddComponentsOriginalPluginArgument } from "./addComponents.types"
import { _AddComponentsWithVariants } from "./addComponentsWithVariants.types"


// nesesito poder poner undefined, y también tengo que comprobar el darkmode "circundad"

export const _addComponentsWithVariants: _AddComponentsWithVariants = (darkmodeClassname, theme, components) => {

   const result: TailwindAddComponentsOriginalPluginArgument = {}

   for (const [componentName, applyOrVariants] of Object.entries(components)) {
      const componentClassname = theme ? `.${theme} .${componentName}` : `.${componentName}`
      const darkmodeComponentClassname = theme ? `.${darkmodeClassname}${componentClassname}` : `.${darkmodeClassname} ${componentClassname}`

      // String
      if (typeof applyOrVariants === 'string') {
         result[componentClassname] = { [applyOrVariants]: '' }
         continue
      }

      // Array
      if (Array.isArray(applyOrVariants)) {
         if (applyOrVariants[0]) result[componentClassname] = { [applyOrVariants[0]]: '' }
         if (applyOrVariants[1]) result[darkmodeComponentClassname] = { [applyOrVariants[1]]: '' }
         continue
      }

      // Object
      const { _apply: componentApply, ...variants } = applyOrVariants

      if (componentApply) {
         if (typeof componentApply === 'string') {
            result[componentClassname] = { [componentApply]: '' }
         }

         if (Array.isArray(componentApply)) {
            result[componentClassname] = componentApply[0] ? { [componentApply[0]]: '' } : {}
            if (componentApply[1]) result[darkmodeComponentClassname] = { [componentApply[1]]: '' }
         }
      }

      const addBaseComponentToApply = (variantApply: string) => componentApply ? `${variantApply} ${componentName}` : variantApply
      // necesito añadir el darkmode base component solamente al darkmode variant

      // Variants of the component
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
         } else if (componentApply) {
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
