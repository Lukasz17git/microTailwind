
export const heightSpacing = ({ theme }) => ({
   ...theme('spacing'),
   '100vh': '100vh',
   min: 'min-content',
   max: 'max-content',
   fit: 'fit-content',
})

export const widthSpacing = ({ theme }) => ({
   ...theme('spacing'),
   '100vw': '100vw',
   min: 'min-content',
   max: 'max-content',
   fit: 'fit-content',
})

export const extendScreens = {
   'xsm': '372px'
}

export const extendOpacity = {
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

export const extendZIndex = {
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
