import { ExtensionSizeThemeParameter, Extensions, ExtensionsConfig, extendedExtensions } from './extensionsPlugin.types';

const pixelSpacingExtension = {
   "0.": '0px',
   "1.": '0.0625rem',
   "2.": '0.125rem',
   "3.": '0.1875rem',
   "4.": '0.25rem',
   "5.": '0.3125rem',
   "6.": '0.375rem',
   "7.": '0.4375rem',
   "8.": '0.5rem',
   "9.": '0.5625rem',
   "10.": '0.625rem',
   "11.": '0.6875rem',
   "12.": '0.75rem',
   "13.": '0.8125rem',
   "14.": '0.875rem',
   "15.": '0.9375rem',
   "16.": '1rem',
   "17.": '1.0625rem',
   "18.": '1.125rem',
   "19.": '1.1875rem',
   "20.": '1.25rem',
   "21.": '1.3125rem',
   "22.": '1.375rem',
   "23.": '1.4375rem',
   "24.": '1.5rem',
   "25.": '1.5625rem',
   "26.": '1.625rem',
   "27.": '1.6875rem',
   "28.": '1.75rem',
   "29.": '1.8125rem',
   "30.": '1.875rem',
   "31.": '1.9375rem',
   "32.": '2rem',
   "34.": '2.125rem',
   "36.": '2.25rem',
   "38.": '2.375rem',
   "40.": '2.5rem',
   "42.": '2.625rem',
   "44.": '2.75rem',
   "46.": '2.875rem',
   "48.": '3rem',
   "50.": '3.125rem',
   "52.": '3.25rem',
   "54.": '3.375rem',
   "56.": '3.5rem',
   "58.": '3.625rem',
   "60.": '3.75rem',
   "62.": '3.875rem',
   "64.": '4rem',
   "66.": '4.125rem',
   "68.": '4.25rem',
   "70.": '4.375rem',
   "72.": '4.5rem',
   "74.": '4.625rem',
   "76.": '4.75rem',
   "78.": '4.875rem',
   "80.": '5rem',
   "82.": '5.125rem',
   "84.": '5.25rem',
   "86.": '5.375rem',
   "88.": '5.5rem',
   "90.": '5.625rem',
   "92.": '5.75rem',
   "94.": '5.875rem',
   "96.": '6rem',
   "98.": '6.125rem',
   "100.": '6.25rem',
   "102.": '6.375rem',
   "104.": '6.5rem',
   "106.": '6.625rem',
   "108.": '6.75rem',
   "110.": '6.875rem',
   "112.": '7rem',
   "114.": '7.125rem',
   "116.": '7.25rem',
   "118.": '7.375rem',
   "120.": '7.5rem',
   "122.": '7.625rem',
   "124.": '7.75rem',
   "126.": '7.875rem',
   "128.": '8rem',
   "130.": '8.125rem',
   "132.": '8.25rem',
   "134.": '8.375rem',
   "136.": '8.5rem',
   "138.": '8.625rem',
   "140.": '8.75rem',
   "142.": '8.875rem',
   "144.": '9rem',
   "146.": '9.125rem',
   "148.": '9.25rem',
   "150.": '9.375rem',
   "152.": '9.5rem',
   "154.": '9.625rem',
   "156.": '9.75rem',
   "158.": '9.875rem',
   "160.": '10rem',
   "162.": '10.125rem',
   "164.": '10.25rem',
   "166.": '10.375rem',
   "168.": '10.5rem',
   "170.": '10.625rem',
   "172.": '10.75rem',
   "174.": '10.875rem',
   "176.": '11rem',
   "178.": '11.125rem',
   "180.": '11.25rem',
   "182.": '11.375rem',
   "184.": '11.5rem',
   "186.": '11.625rem',
   "188.": '11.75rem',
   "190.": '11.875rem',
   "192.": '12rem',
   "194.": '12.125rem',
   "196.": '12.25rem',
   "198.": '12.375rem',
   "200.": '12.5rem',
   "210.": '13.125rem',
   "220.": '13.75rem',
   "230.": '14.375rem',
   "240.": '15rem',
   "250.": '15.625rem',
   "260.": '16.25rem',
   "270.": '16.875rem',
   "280.": '17.5rem',
   "290.": '18.125rem',
   "300.": '18.75rem',
   "310.": '19.375rem',
   "320.": '20rem',
   "330.": '20.625rem',
   "340.": '21.25rem',
   "350.": '21.875rem',
   "360.": '22.5rem',
   "370.": '23.125rem',
   "380.": '23.75rem',
   "390.": '24.375rem',
   "400.": '25rem',
   "410.": '25.625rem',
   "420.": '26.25rem',
   "430.": '26.875rem',
   "440.": '27.5rem',
   "450.": '28.125rem',
   "460.": '28.75rem',
   "470.": '29.375rem',
   "480.": '30rem',
   "490.": '30.625rem',
   "500.": '31.25rem',
   "510.": '31.875rem',
   "520.": '32.5rem',
   "530.": '33.125rem',
   "540.": '33.75rem',
   "550.": '34.375rem',
   "560.": '35rem',
   "570.": '35.625rem',
   "580.": '36.25rem',
   "590.": '36.875rem',
   "600.": '37.5rem',
   "610.": '38.125rem',
   "620.": '38.75rem',
   "630.": '39.375rem',
   "640.": '40rem',
   "650.": '40.625rem',
   "660.": '41.25rem',
   "670.": '41.875rem',
   "680.": '42.5rem',
   "690.": '43.125rem',
   "700.": '43.75rem',
   "710.": '44.375rem',
   "720.": '45rem',
   "730.": '45.625rem',
   "740.": '46.25rem',
   "750.": '46.875rem',
   "760.": '47.5rem',
   "770.": '48.125rem',
   "780.": '48.75rem',
   "790.": '49.375rem',
   "800.": '50rem',
   "900.": '56.25rem',
   "1000.": '62.5rem',
   "1100.": '68.75rem',
   "1200.": '75rem'
};


const spacingExtension = {
   // percentages
   a: 'auto',
   '10%': '10%',
   '20%': '20%',
   '25%': '25%',
   '30%': '30%',
   '40%': '40%',
   '50%': '50%',
   '60%': '60%',
   '70%': '70%',
   '75%': '75%',
   '80%': '80%',
   '90%': '90%',
   '100%': '100%',
   // ems
   "0.5em": '0.5em',
   "0.6em": '0.6em',
   "0.7em": '0.7em',
   "0.8em": '0.8em',
   "0.9em": '0.9em',
   "1em": '1em',
   "1.1em": '1.1em',
   "1.2em": '1.2em',
   "1.3em": '1.3em',
   "1.4em": '1.4em',
   "1.5em": '1.5em',
   "1.6em": '1.6em',
   "1.7em": '1.7em',
   "1.8em": '1.8em',
   "1.9em": '1.9em',
   "2em": '2em',
}

const heightExtension = {
   '100vh': '100vh',
   min: 'min-content',
   max: 'max-content',
   fit: 'fit-content'
}

const widthExtension = {
   '100vw': '100vw',
   min: 'min-content',
   max: 'max-content',
   fit: 'fit-content',
}

const screensExtension = {
   'xsm': '372px'
}

const opacityExtension = {
   1: '0.01',
   2: '0.02',
   3: '0.03',
   4: '0.04',
   6: '0.06',
   7: '0.07',
   8: '0.08',
   9: '0.09',
   11: '0.11',
   12: '0.12',
   13: '0.13',
   14: '0.14',
   15: '0.15',
   16: '0.16',
   17: '0.17',
   18: '0.18',
   19: '0.19',
};

const zIndexExtension = {
   1: '1',
   2: '2',
   3: '3',
   60: '60',
   70: '70',
   80: '80',
   90: '90',
   99: '99',
   100: '100',
   101: '101',
   102: '102',
   999: '999',
   1000: '1000',
   1001: '1001',
   9999: '9999',
}

const fontWeightExtension = {
   regular: '400'
}

const scaleExtension = {
   5: '.05',
   10: '.1',
   15: '.15',
   20: '.2',
   25: '.25',
   30: '.3',
   35: '.35',
   40: '.4',
   45: '.45',
   55: '.55',
   60: '.6',
   65: '.65',
   70: '.7',
   80: '.8',
   85: '.85',
   115: '1.15',
   120: '1.2',
   130: '1.3',
   135: '1.35',
   140: '1.4',
   145: '1.45',
   155: '1.55',
   160: '1.6',
   165: '1.65',
   170: '1.7',
   175: '1.75',
   180: '1.8',
   185: '1.85',
   190: '1.9',
   195: '1.95',
   200: '2'
};

const spacing = { ...spacingExtension, ...pixelSpacingExtension }
const height = heightExtension
const width = widthExtension
const maxHeight = heightExtension
const minHeight = ({ theme }: ExtensionSizeThemeParameter) => ({ ...theme('spacing'), ...heightExtension })
const maxWidth = ({ theme }: ExtensionSizeThemeParameter) => ({ ...theme('spacing'), ...widthExtension })
const minWidth = ({ theme }: ExtensionSizeThemeParameter) => ({ ...theme('spacing'), ...widthExtension })
const screens = screensExtension
const opacity = opacityExtension
const zIndex = zIndexExtension
const fontWeight = fontWeightExtension
const scale = scaleExtension

export const microtailwindExtensions = {
   spacing,
   height,
   width,
   maxHeight,
   minHeight,
   maxWidth,
   minWidth,
   screens,
   opacity,
   zIndex,
   fontWeight,
   scale
}

export const withMicrotailwindExtensions = (customExtensions: Extensions = {}, config: ExtensionsConfig = {}) => {

   const extendedExtensions: extendedExtensions = { ...customExtensions }

   for (const [extensionName, microtailwindExtension] of Object.entries(microtailwindExtensions)) {
      const configKey = `disable_${extensionName}` as keyof ExtensionsConfig
      if (config[configKey]) continue
      const customExtension: object | ((args: ExtensionSizeThemeParameter) => object) | undefined = customExtensions[extensionName]      //this can be an object or a function
      
      const isCustomExtensionFunction = typeof customExtension === 'function'
      const isMicrotailwindExtensionFunction = typeof microtailwindExtension === 'function'

      if (isCustomExtensionFunction && isMicrotailwindExtensionFunction) {
         extendedExtensions[extensionName] = (args: ExtensionSizeThemeParameter) => ({ ...microtailwindExtension(args), ...customExtension(args) })
         continue
      }
      if (isMicrotailwindExtensionFunction) {
         extendedExtensions[extensionName] = (args: ExtensionSizeThemeParameter) => ({ ...microtailwindExtension(args), ...customExtension })
         continue
      }
      if (isCustomExtensionFunction) {
         extendedExtensions[extensionName] = (args: ExtensionSizeThemeParameter) => ({ ...microtailwindExtension, ...customExtension(args) })
         continue
      }
      extendedExtensions[extensionName] = { ...microtailwindExtension, ...customExtension }
   }
   
   return extendedExtensions
}