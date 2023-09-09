
# MICROTAILWIND

**TailwindCSS** with **usefull add-ons.**

**Includes:**

- **Shorter** utility **classnames** fully compatible with the default ones
- **Expanded Theme**, with stuff like pixel based values transformed into rem values automatically as dot notation
- Default and easy **Dark Mode** setup, for new and existing projects without **refactoring**
- **100% compatibility** with TailwindCSS, its add-ons and any kind of third party plugins

**Also includes**:

- Config file as an example for the tailwind.config setup
- Abreviations file to show all the abreviations that are included in the { microtailwind } section of this package.

## Installation

```bash
 npm install microtailwind
```

## Dark Mode

**Can quickly add Dark Mode support to already existing TailwindCSS projects without refactoring neither creating CSS variables.**

100% compatible with TailwindCSS projects, its fully independent of the other utilities of this package.

It has two functions, **addUtility** and **addComponentUtility**, both of them are used to add dark mode support to TailwindCSS utilities.

**AddUtility** is used to add dark mode support to TailwindCSS utilities, default ones and custom ones.

**AddComponentUtility** is used to create dark mode support to more than one utility with the same custom value name. (for example bg-btn-man, border-btn-main, text-btn-main)

### Dark Mode - AddUtility

Create new utilites with dark mode support or add dark mode support to already defined ones by using the **addUtility** function, where the parameters are:

- First parameter: the base TailwindCSS utility name or base Microtailwind utility name.
- Second parameter: an object where the keys are the rest of the tailwind utility name, and the values being an array/string with ["lightmode", "darkmode"] colors.
- Third parameter: config.
  
```javascript
//tailwind.config.js
import { addUtilitesWithDarkMode } from 'microtailwind'
import plugin from 'tailwindcss/plugin'

export default {
   /** Rest of the config */
  plugins: [
      plugin(addUtilitesWithDarkMode(({ addUtility }) => {
         addUtility('bg', {
         'slate-500': [, '#1F2933'],
         /** will change the color of "bg-slate-500" to #1F2933 in dark mode  */
         'btn-main': ['#002D62', '#6699CC'],
         /** will create/overwrite "bg-btn-main" which will have the color #002D62 in light mode and #6699CC in dark mode  */
         'btn-secondary': '#BA0021', // or ['#BA0021']
         /** will create/overwrite "bg-btn-secondary" which will have the color #BA0021 in light mode and dark mode */
         })
      }))
   ],
}
```

### Dark Mode - AddComponentUtility

Create multiple tailwind utilities with Dark Mode support sharing the same custom name by using the **addComponentUtility** function, where the parameters are:

- First parameter: the custom name.
- Second parameter: object with the keys being th ebase TailwindCSS utility name or base Microtailwind utility name, and the value being an array/string with the color for light mode and the color for dark mode.
- Third parameter: config.

```javascript
//tailwind.config.js
import { addUtilitesWithDarkMode } from 'microtailwind'
import plugin from 'tailwindcss/plugin'

export default {
   /** Rest of the config */
  plugins: [
      plugin(addUtilitesWithDarkMode(({ addComponentUtility }) => {
               /** custom component name: btn-main */
         addComponentUtility('btn-main', {
            'bg': ['yellow', 'red'], 
            // will create/overwrite "bg-btn-main" which uses yellow for lightmode and red for darkmode
            'border': ['#002D62', '#6699CC'], 
            // will create/overwrite "border-btn-main" which uses #002D62 for lightmode and #6699CC for darkmode
            'text': ['#000', '#fff']
            // will create/overwrite "text-btn-main" which uses #000 for lightmode and #fff for darkmode
         })
         // also generates the "component-btn-main" which has all the styles already applied
      })),
   ],
}
```

**Also the <u>addComponentUtility</u> function will create the <u>"component-CUSTOM_NAME"</u> utility which <u>applies all the styles at the same time.</u>**

## Expanded Theme

Expands the default TailwindCSS theme with pixel values transformed into rems and more usefull values, like:

- Pixel based values transformed into rem values automatically with the dot notation.
  - Example: 2. (2px => 0.125rem)
- More percentage values for the width, height, padding, margin, etc.
- More "em" values for the width, height, padding, margin, etc.
- "min", "max", "fit", "a"(auto) values for the width, height, padding, margin, etc.
- More opacity values.
- More z-index values.
- And so on...

```javascript
//tailwind.config.js

import { withMicrotailwindExtensions } from 'microtailwind'

export default {
   /** rest of the config */
   theme: {
      extend: withMicrotailwindExtensions({
         /** your custom extended theme (merges and overrides if colision the default and microtailwind extended themes) */
      }),
   }
}

```

```jsx
//usage example

<div className="m-a w-100% gap-16."></div> 
/** margin: auto, width: 100%, gap: 1rem (16px) */
```

## Microtailwind Utilities

Adds new utilities which are abreviations of the default TailwindCSS utilities and 100% compatible with the default TailwindCSS utilities, including all the add-ons and features that TailwindCSS provides.

All available abreviations are in the **abreviations file**.

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
 className="flex flex-col justify-center items-center gap-[4px] p-[4px] text-white border-black rounded-[6px]" // tailwindcss

 className="fccc g-[4px] p-[4px] tc-white bc-black br-[6px]" // microtailwind

 className="fccc g-4. p-4. tc-white bc-black br-6." // microtailwind with expanded theme
 ></div>
```
