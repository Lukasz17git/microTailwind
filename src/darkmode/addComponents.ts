
const addComponentUtility: AddComponentSupportingDarkmode = (componentClassname, microtailwindStyles, options = {}) => {

   const { tailwindDarkModeClass = 'dark', prefixForComponent = '' } = options

   const utilities: Utilities = {}

   const tailwindComponentClassname = prefixForComponent ? `.${prefixForComponent}-${componentClassname}` : `.${componentClassname}`
   const darkModeTailwindComponentClassname = `.${tailwindDarkModeClass} ${tailwindComponentClassname}`

   const { apply, ...microtailwindStylesWithoutUseApply } = microtailwindStyles

   const component: ComponentSupportingApply = {
      [tailwindComponentClassname]: {},
      [darkModeTailwindComponentClassname]: {},
   }

   if (apply) {
      component[tailwindComponentClassname]![apply] = {}
   }

   for (const [supportedUtilityClassName, color] of Object.entries(microtailwindStylesWithoutUseApply)) {
      const cssProperty = supportedAbreviationsForDarkMode[supportedUtilityClassName as SupportedAbreviationsForDarkMode]
      if (!cssProperty) continue
      const utilityKeyName = `.${supportedUtilityClassName}-${componentClassname}`

      if (!Array.isArray(color)) {
         utilities[utilityKeyName] = { [cssProperty]: color }
         component[tailwindComponentClassname]![cssProperty] = color
      } else {
         if (color[0]) {
            utilities[utilityKeyName] = { [cssProperty]: color[0] }
            component[tailwindComponentClassname]![cssProperty] = color[0]
         }

         if (color[1]) {
            utilities[`.${tailwindDarkModeClass} ${utilityKeyName}`] = { [cssProperty]: color[1] }
            component[darkModeTailwindComponentClassname]![cssProperty] = color[1]
         }
      }
   }

   return { utilities, component }
}


const addComponents: _AddComponents = (darkmodeClassname, theme, components) => {

   for (const [component, variants] of Object.entries(components)) {
      
   }


}