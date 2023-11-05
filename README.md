
# MICROTAILWIND

**TailwindCSS** extension with **usefull add-ons.**

**Includes:**

- **Shorter Classnames:** 100% compatibility with the default ones.
- **Expanded TailwindCSS Default Theme**:  pixel based values transformed into rem values automatically as dot notation.
- **Easy Dark Mode Integration**: add dark mode support to TailwindCSS utilities, default ones and custom ones.
- **Custom Themes**: creating custom themes is a breeze.
- **100% Compatibility with the rest of TailwindCSS plugins**.

**Also includes**:

- tailwind.config.example file as an example for the tailwind config setup
- Abreviations.js file which includes all microtailwind abreviations.

## Installation

```bash
 npm install -D microtailwind
```

## Configuration

```javascript
//tailwind.config.js
import { microtailwind, withMicrotailwindExtensions, themeMiddleware } from 'microtailwind'

export default {
   /** rest of the config */
   darkMode: 'class',
   theme: {
      extend: withMicrotailwindExtensions({ // extended theme
         /** your custom extended theme (merges, overrides if colision) */
      }),
   },
   plugins: [
      plugin(microtailwind), // shorter classnames
      plugin(themeMiddleware(({ addUtility, addComponents, addVariants  })=>{
         /** Utilities **/
         addUtility('bg', {
            'primary': ['aliceblue', '#161616'], // creates bg-primary utility [light, dark]
            'secondary': '#BA0021', // creates bg-secondary utility
            'slate-300': [, '#1F2933'], //adds dark mode to this class
         })
         /** Components **/
         addComponents({
            '.icon': '@apply w-24. h-24.'
            '.button': '@apply min-w-80. py-12. px-16. br-5.'
            '.button-primary': {
               _apply: '@apply .button',
               backgroundColor: ['fuchsia', 'darkmagenta'],
            }
         })
         /** Component Variants **/
         addVariants<'.button' | '.icon'>({
            '.button': { //.button class must be declared somewhere
               secondary: {
                  backgroundColor: ['lime', 'orange'],
               }
            },
            '.icon': { //.icon class must be declared somewhere
               primary: {
                  backgroundColor: ['lime', 'orange'],
               }
            }
         })
      }))
      plugin(themeMiddleware('snow',({addComponents})=> {
         /** Components with SNOW THEME **/
         addComponents({
            '.button-primary': {
               backgroundColor: ['ghostwhite', 'cornflowerblue'],
            }
         })

      }))
   ],
}
```

## Typescript Types

```typescript
import {} from 'microtailwind/types'
```

## Theme and Dark Mode

Add Dark Mode and Theme support to **already existing TailwindCSS projects.**

Any CSS and @Apply values can be:

- **string:** light and dark mode
- **tupple:** [light, dark] or [ , dark] or [light, ]

To be able to use it, you need to add the darkmode class and/or theme class to the parent element of your app.

```html
<div class=""> <!-- toggle your dark and theme class -->
      <!-- your app -->
</div>
```

### ThemeMiddleware

Middleware function to add theme and dark mode support to TailwindCSS utilities and components.

```javascript
//tailwind.config.js
import { themeMiddleware } from 'microtailwind'
import plugin from 'tailwindcss/plugin'

/** To be able to change the default darkmode classname*/
themeMiddleware.darkmodeClassname = 'custom_dark' // default is 'dark'

export default {
   /** Rest of the config */
  plugins: [
      /** without theme */
      plugin(themeMiddleware(({ addUtility, addComponents, addVariants }) => {
         /** Rest of the code */
      }))

      /** with theme */
      plugin(themeMiddleware('my_theme',({ addUtility, addComponents, addVariants }) => {
         /** Rest of the code */
      }))
   ],
}
```

### AddUtility

Used to add dark mode support to TailwindCSS Utilities, default ones or custom ones.
  
```javascript
//tailwind.config.js
import { themeMiddleware } from 'microtailwind'
import plugin from 'tailwindcss/plugin'

export default {
   /** Rest of the config */
  plugins: [
      plugin(themeMiddleware('theme',({ addUtility }) => {
         addUtility('bg', {
         /** creates/adds "bg-slate-500" color to #1F2933 in dark mode */
         'slate-500': [, '#1F2933'],
         /** creates/adds "bg-btn-main" with #002D62 color in light mode and #6699CC in dark mode  */
         'btn-main': ['#002D62', '#6699CC'],
         /** creates/adds "bg-btn-secondary" which will have the color #BA0021 in light mode and dark mode */
         'btn-secondary': '#BA0021', // or ['#BA0021']
         })
      }))
   ],
}
```

### AddCustomUtility

Used to add dark mode support to Custom TailwindCSS Utilities, **second parameter is the CSS property name.**
  
```javascript
//tailwind.config.js
import { themeMiddleware } from 'microtailwind'
import plugin from 'tailwindcss/plugin'

export default {
   /** Rest of the config */
  plugins: [
      plugin(themeMiddleware(({ addCustomUtility }) => {
         addCustomUtility('bgcolor', 'background-color', { //or backgroundColor
         /** creates/adds "bgcolor-slate-500" color to #1F2933 in dark mode */
         'slate-500': [, '#1F2933'],
         /** creates/adds "bgcolor-btn-main" with #002D62 color in light mode and #6699CC in dark mode  */
         'btn-main': ['#002D62', '#6699CC'],
         /** creates/adds "bgcolor-btn-secondary" which will have the color #BA0021 in light mode and dark mode */
         'btn-secondary': '#BA0021', // or ['#BA0021']
         })
      }))
   ],
}
```

### AddComponents

Creates TailwidCSS Components with darkmode support.

```javascript
//tailwind.config.js
import { themeMiddleware } from 'microtailwind'
import plugin from 'tailwindcss/plugin'

export default {
   /** Rest of the config */
  plugins: [
      plugin(themeMiddleware(({ addComponents }) => {
         addComponents({
            '.icon':  '@apply w-24. h-24.',
            '.label': [, '@apply tc-dark dark:tc-white'],
            '.action-icon': {
               _apply: '@apply frcc h-40. w-40. br-6. tc-red-800 dark:tc-red-600',
            },
            '.button': {
               _apply: '@apply h-40. frcc br-8. py-8. px-20. tw-semibold ts-14.', //light and dark
               backgroundColor: ['silver', 'beige'], //[light, dark]
               color: ['black', 'white'], //[light, dark]
            },
            '.button-primary': {
               _apply: [, '@apply ts-16. tw-bold'], //[light, dark]
               backgroundColor: ['blue', 'red'], //[light, dark]
               color: ['cadetblue', 'white'], //[light, dark]
            },
         })
      })),
   ],
}
```

### AddVariants

Creates TailwidCSS ComponentVariants with darkmode support.
It accepts T generic to indicate the keys of the components (to prevent typos).

```javascript
//tailwind.config.js
import { themeMiddleware } from 'microtailwind'
import plugin from 'tailwindcss/plugin'

export default {
   /** Rest of the config */
  plugins: [
      plugin(themeMiddleware(({ addVariants }) => {
         addVariants<T>({
            '.button': {
               primary: {
                  _apply: '@apply ts-16. tw-bold', //light and dark
                  backgroundColor: ['blue', 'red'], //[light, dark]
                  color: ['cadetblue', 'white'], //[light, dark]
               },
               secondary: {
                  backgroundColor: ['blue', 'red'], //[light, dark]
                  color: ['cadetblue', 'white'], //[light, dark]
               },
               tertiary: {
                  _apply: [, '@apply ts-16. tw-bold'], //[light, dark]
                  backgroundColor: ['blue', 'red'], //[light, dark]
                  color: ['cadetblue', 'white'], //[light, dark]
               },
            },
         })
      })),
   ],
}
```

## Expanded TailwindCSS Default Theme

**Expands the default TailwindCSS default theme with pixel values transformed into rems and more usefull utilities.**

```javascript
//tailwind.config.js
import { withMicrotailwindExtensions } from 'microtailwind'

export default {
   /** rest of the config */
   theme: {
      extend: withMicrotailwindExtensions({
         /** your theme (merges and overrides if colision) */
      }),
   }
}

```

```jsx
//usage example

<div className="m-a w-100% gap-16."></div> 
/** margin: auto, width: 100%, gap: 1rem (16px) */
```

Includes:

- Pixel based values transformed into rem values automatically with the dot notation.
  - Example: 2. (2px => 0.125rem)
- Expanded percentage values for the width, height, padding, margin, etc.
- Expanded "em" values for the width, height, padding, margin, etc.
- "min", "max", "fit", "a"(auto) values for the width, height, padding, margin, etc.
- More opacity values.
- More z-index values.
- And many more.

## Microtailwind Abreviations

Shorter TailwindCSS utilities fully compatible with the default ones.
Custom shorter Flexbox utilities.

```javascript
//tailwind.config.js
import { microtailwind } from 'microtailwind'
import plugin from 'tailwindcss/plugin'

export default {
   /** rest of the config */
   plugins: [
      plugin(microtailwind),
   ],
}
```

```javascript
//usage example
<div
 //tailwindcss
 className="flex flex-col justify-center items-center gap-[4px] p-[4px] text-white border-black rounded-[6px]"
 //microtailwind
 className="fccc g-[4px] p-[4px] tc-white bc-black br-[6px]"
 //microtailwind with expanded theme
 className="fccc g-4. p-4. tc-white bc-black br-6."
 ></div>
```

All available abreviations are in the file [abreviations.js](https://www.npmjs.com/package/microtailwind?activeTab=code).
