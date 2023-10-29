const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        screens: {
            'xl': '1440px',
        },
        extend: {
            backgroundImage: (theme) => ({
                disabled: `url('../img/disabled.svg')`,
            }),
            fontFamily: {
                sans: ['Rubik', ...defaultTheme.fontFamily.sans],
            },
            boxShadow: {
                block: `0px 1px 8px rgba(20, 46, 110, 0.1)`,
                bb: `0px 1px 8px rgba(0, 0, 0, 0.1)`
            },
            zIndex: {
                100: 100,
                200: 200,
                300: 300
            },
            gridRow: {
                'span-6': 'span 6 / span 6',
                'span-7': 'span 7 / span 7',
                'span-8': 'span 8 / span 8',
            },
            colors: {
                blue: {
                    20: "#99A1A6",
                    50: "#FAFBFD",
                    70: "#d8ecee",
                    80: "#ECF6F7",
                    200: "#A2C0D4",
                    400: "#3A9EAA",
                    500: "#0276FF"
                },
                pink: {
                    70: "#faf4ff"
                },
                yellow: {
                    700: "#AA9F3A"
                },
                red: {
                    70: "#f6ebeb",
                    350: "#d19999",
                    500: "#ED0423",
                    600: "#C24242",
                    700: "#AA3A3A"
                },
                orange: {
                    500: "#F17105",
                },
                violet: {
                    200: "#C8C1CD",
                    500: "#56326E",
                    600: "#6665DD"
                },
                gray: {
                    50: "#F4F4F4",
                    70: "#AFB2B2",
                    100: "#B1B6B9",
                    200: "#919399",
                    300: "#828282",
                    350: "#7a8084",
                    400: "#DCE2E8",
                    600: "#636D73",
                    700: "#2C2D2E",
                    800: "#414D55",
                    900: "#00103D"
                }
            }
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography')
    ],
};
