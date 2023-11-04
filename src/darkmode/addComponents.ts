import { TailwindAddComponentsOriginalPluginArgument, _AddComponents } from "./addComponents.types"

// Estaria guay que en el componente pueda meter un type string,
// el cual indique como debe de empezar la key el value, [.${start}]: `@apply ${start}`

export const _addComponents: _AddComponents = (darkmodeClassname, theme, components) => {

   const result: TailwindAddComponentsOriginalPluginArgument = {}

   for (const [componentName, applyOrComponent] of Object.entries(components)) {
      const componentClassname = theme ? `.${theme} ${componentName}` : componentName
      const darkmodeComponentClassname = theme ? `.${darkmodeClassname}${componentClassname}` : `.${darkmodeClassname} ${componentClassname}`

      // Apply as String
      if (typeof applyOrComponent === 'string') {
         result[componentClassname] = { [applyOrComponent]: '' }
         continue
      }

      // Apply as Array
      if (Array.isArray(applyOrComponent)) {
         if (applyOrComponent[0]) result[componentClassname] = { [applyOrComponent[0]]: '' }
         if (applyOrComponent[1]) result[darkmodeComponentClassname] = { [applyOrComponent[1]]: '' }
         continue
      }

      // Apply as Object
      const { _apply: apply, ...cssProperties } = applyOrComponent

      if (apply) {
         if (typeof apply === 'string') {
            result[componentClassname] = { [apply]: '' }
            result[darkmodeComponentClassname] = {}
         }

         if (Array.isArray(apply)) {
            if (apply[0]) result[componentClassname] = { [apply[0]]: '' }
            if (apply[1]) result[darkmodeComponentClassname] = { [apply[1]]: '' }
         }
      } else {
         result[componentClassname] = {}
         result[darkmodeComponentClassname] = {}
      }


      // Css properties
      for (const [cssProperty, supportingDarkmodeValue] of Object.entries(cssProperties)) {
         if (typeof supportingDarkmodeValue === 'string') {
            result[componentClassname]![cssProperty] = supportingDarkmodeValue
            continue
         }

         if (Array.isArray(supportingDarkmodeValue)) {
            if (supportingDarkmodeValue[0]) result[componentClassname]![cssProperty] = supportingDarkmodeValue[0]
            if (supportingDarkmodeValue[1]) result[darkmodeComponentClassname]![cssProperty] = supportingDarkmodeValue[1]
            continue
         }
      }
   }

   return result
}

