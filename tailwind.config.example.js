/** @type {import('tailwindcss').Config} */

import { microtailwind, addUtilitesWithDarkMode, withMicrotailwindExtensions } from 'microtailwind'
import plugin from 'tailwindcss/plugin'

export default {
   /** rest of the config */
   theme: {
      extend: withMicrotailwindExtensions({
         /** your custom extended theme (merges and overrides if colision the default and microtailwind extended themes) */
      }),
   },
   plugins: [
      plugin(microtailwind),
      plugin(addUtilitesWithDarkMode(({ addUtility, addComponentUtility }) => {
         addUtility('bg', {
            /**custom color className: [colorLightMode, colorDarkMode] */
            'blue': ['#002D62', '#6699CC'], // will generate "bg-blue" with darkmode support
            'red': ['#EF0107', '#BA0021'], // will generate "bg-red" with darkmode support
         })
         /** custom component name */
         addComponentUtility('btn-main', {
            'bg': ['yellow', 'red'], // will generate "bg-btn-main", yellow for lightmode and red for darkmode
            'border': ['red', 'yellow'], // will generate "bg-btn-main", red for lightmode and yellow for darkmode
         })
      })),
   ],
}

