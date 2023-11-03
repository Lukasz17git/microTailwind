import { TailwindAddComponentsOriginalPluginArgument, _AddComponents } from "./addComponents.types"

export const _addComponents: _AddComponents = (darkmodeClassname, theme, components) => {

   const result: TailwindAddComponentsOriginalPluginArgument = {}

   for (const [componentName, valueOrVariants] of Object.entries(components)) {
      const componentClassname = theme ? `.${theme} .${componentName}` : `.${componentName}`
      const darkmodeComponentClassname = `.${darkmodeClassname} ${componentClassname}`

      // String or Array
      if (typeof valueOrVariants === 'string') {
         result[componentClassname] = { [valueOrVariants]: '' }
         continue
      }

      if (Array.isArray(valueOrVariants)) {
         if (valueOrVariants[0]) result[componentClassname] = { [valueOrVariants[0]]: '' }
         if (valueOrVariants[1]) result[darkmodeComponentClassname] = { [valueOrVariants[1]]: '' }
         continue
      }

      // Object
      const { _apply, ...variants } = valueOrVariants

      if (_apply) {
         if (typeof _apply === 'string') {
            result[componentClassname] = { [_apply]: '' }
         }

         if (Array.isArray(_apply)) {
            if (_apply[0]) result[componentClassname] = { [_apply[0]]: '' }
            if (_apply[1]) result[darkmodeComponentClassname] = { [_apply[1]]: '' }
         }
      }

      // Variants of the component
      for (const [variantName, variant] of Object.entries(variants)) {

         let variantClassname: string
         let darkmodeVariantClassname: string
         {
            const variantFullname = `.${componentName}-${variantName}`
            variantClassname = theme ? `.${theme} ${variantFullname}` : variantFullname
            darkmodeVariantClassname = `.${darkmodeClassname} ${variantClassname}`
         }

         // String or Array
         if (typeof variant === 'string') {
            const applyWithBaseComponent = _apply ? `${variant} .${componentName}` : variant
            result[variantClassname] = { [variant]: '' }
            continue
         }

         if (Array.isArray(variant)) {
            if (variant[0]) result[variantClassname] = { [variant[0]]: '' }
            if (variant[1]) result[darkmodeVariantClassname] = { [variant[1]]: '' }
            continue
         }

         // Object apply
         const { _apply: variantApply, ...variantCssProperties } = variant!

         result[variantClassname] = {}
         result[darkmodeVariantClassname] = {}

         if (typeof variantApply === 'string') {
            result[variantClassname]![variantApply] = ''
         }

         if (Array.isArray(variantApply)) {
            if (variantApply[0]) {
               result[variantClassname]![variantApply[0]] = ''
            }
            if (variantApply[1]) {
               result[darkmodeVariantClassname]![variantApply[1]] = ''
            }
         }

         // Css properties
         for (const [cssProperty, value] of Object.entries(variantCssProperties)) {
            if (typeof value === 'string') {
               result[variantClassname]![cssProperty] = value
               continue
            }

            if (Array.isArray(value)) {
               if (value[0]) result[variantClassname]![cssProperty] = value[0]
               if (value[1]) result[darkmodeVariantClassname]![cssProperty] = value[1]
               continue
            }
         }
      }
   }

   return result
}
