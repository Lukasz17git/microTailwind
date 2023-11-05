/** @type {import('tailwindcss').Config} */

import { microtailwind, microtailwindExperimental, withMicrotailwindExtensions, themeMiddleware } from 'microtailwind'
import plugin from 'tailwindcss/plugin'

// themeMiddleware.darkmodeClassname = 'dark'

export default {
   darkmode: 'class',
   theme: {
      // extend: withMicrotailwindExtensions(),
      extend: withMicrotailwindExtensions({
         /** your theme */
      }),
   },
   plugins: [
      plugin(microtailwind),
      plugin(microtailwindExperimental),
      plugin(themeMiddleware(({ addUtility, addComponents }) => {
         addUtility('bg', {
            'primary': ['aliceblue', '#161616']
         })
         addUtility('tc', {
            'primary': ['black', 'white'],
         })
         addComponents({
            '.icon': '@apply w-24. h-24.',
            '.button': '@apply min-h-40. frcc br-8. py-8. px-20. tw-semibold ts-15. min-w-120. max-w-100% bg-slate-300',
            '.button-primary': {
               _apply: '@apply button',
               backgroundColor: ['blue', 'red'],
               color: ['cadetblue', 'white'],
            },
         })
         addComponentsWithVariants({
            'button': {
               secondary: {
                  backgroundColor: ['lime', 'orange'],
                  color: ['orange', 'lime'],
               }
            }
         })
      })),
   ],
}

