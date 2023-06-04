/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'
import { addExtensions } from './extensionsPlugin'
import { microTailwind, microTailwindExperimental } from './microTailwindPlugin'
import colors from 'tailwindcss/colors'

export default {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      color: {
         //your colors,
         ...colors // this way your custom colors appears first
      },
      extend: {
         boxShadow: {
         },
         fontFamily: {
         },
         gridTemplateRows: {
         },
         backgroundImage: {
         },
         ...addExtensions
      },
   },
   plugins: [
      plugin(microTailwind),
      plugin(microTailwindExperimental)
   ],
}

