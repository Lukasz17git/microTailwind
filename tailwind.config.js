/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'
import { addExtensions } from './extensionsPlugin'
import { microTailwind, microTailwindExperimental } from './microTailwindPlugin'
import colors from 'tailwindcss/colors'
import addUtilitesWithDarkMode from './utilitiesWithDarkModePlugin'
// import { twTransform, tw } from 'tailwind-multi-class'

export default {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
   // content: {
   //    files: [
   //       "./index.html",
   //       "./src/**/*.{js,ts,jsx,tsx}",
   //    ],
   //    transform: {
   //       DEFAULT: twTransform(tw)
   //    }
   // },
   darkMode: 'class',
   theme: {
      colors: {
         //your colors,
         ...colors
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
      plugin(microTailwindExperimental),
      plugin(addUtilitesWithDarkMode(({ addUtility }) => {
         addUtility('tc', 'color', {
            black: ['#222222', '#eee']
         })
      })),
      plugin(({ addComponents, addBase }) => {
         // base styling
         addBase({
            svg: {
               '@apply h-24 w-24': {}
            }
         });
         // fonts
         addComponents({
            '.tf-app-light': {
               '@apply tf-app tw-light': {}
            },
            '.tf-app-regular': {
               '@apply tf-app tw-regular': {}
            },
            '.tf-app-semibold': {
               '@apply tf-app tw-semibold': {}
            },
            '.tf-app-extrabold': {
               '@apply tf-app tw-extrabold': {}
            },
         });
         // base components
         addComponents({
         });
      })
   ],
}

