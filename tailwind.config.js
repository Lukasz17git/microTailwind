/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'
import { extendOpacity, extendScreens, extendZIndex, heightSpacing, widthSpacing } from './extensionsPlugin'
import { microTailwind, microTailwindExperimental } from './microTailwindPlugin'
import colors from 'tailwindcss/colors'
import { pixelSpacing } from './pixelSizesPlugin'

export default {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         colors: {
            'main': 'var(--color-main)',
            'white': 'var(--color-white)',
         },
         boxShadow: {
            'modal': 'rgba(50, 50, 93, 0.25) 0px 0px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px 0px'
         },
         fontFamily: {
            'regular': 'var(--text-regular)'
         },
         screens: extendScreens,
         opacity: extendOpacity,
         zIndex: extendZIndex
      },
      colors: colors,
      spacing: pixelSpacing,
      height: heightSpacing,
      maxHeight: heightSpacing,
      minHeight: heightSpacing,
      width: widthSpacing,
      maxWidth: widthSpacing,
      minWidth: widthSpacing,
   },
   plugins: [
      plugin(microTailwind),
      plugin(microTailwindExperimental)
   ],
}

