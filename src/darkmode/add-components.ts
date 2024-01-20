import { TailwindAddComponentsOriginalPluginArgument, _AddComponents } from "./add-components.types"


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

      result[componentClassname] = {}
      result[darkmodeComponentClassname] = {}
      //remove ts-error for the next lines
      const resultComponent = result[componentClassname]!
      const resultDarkmodeComponent = result[darkmodeComponentClassname]!

      if (apply) {
         if (typeof apply === 'string') {
            resultComponent[apply] = ''
         }

         if (Array.isArray(apply)) {
            if (apply[0]) resultComponent[apply[0]] = ''
            if (apply[1]) resultDarkmodeComponent[apply[1]] = ''
         }
      }


      // Css properties
      for (const [cssProperty, supportingDarkmodeValue] of Object.entries(cssProperties)) {
         if (typeof supportingDarkmodeValue === 'string') {
            resultComponent[cssProperty] = supportingDarkmodeValue
            continue
         }

         if (Array.isArray(supportingDarkmodeValue)) {
            if (supportingDarkmodeValue[0]) resultComponent[cssProperty] = supportingDarkmodeValue[0]
            if (supportingDarkmodeValue[1]) resultDarkmodeComponent[cssProperty] = supportingDarkmodeValue[1]
            continue
         }
      }
   }

   return result
}

