const { screens } = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/main/webapp/app/**/*.{js,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: 'rgb(var(--color-primary)) ',
                secondary: 'rgb(var(--color-secondary)) ',
                nl: '#fc7422',
            },
            gridTemplateColumns: {
                '2-1': '2fr 1fr',
                '3-2': '3fr 2fr',
            },
            transitionProperty: {
                filter: 'filter',
            },
            minHeight: {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
            },
        },
        screens: {
            '2xs': '300px',
            xs: '475px',
            xssm: '558px',
            mdlg: '896px',
            lgxl: '1152px',
            '3xl': '1600px',
            ...screens,
        },
    },
};
