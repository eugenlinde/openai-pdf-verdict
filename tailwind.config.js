/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'primary-brown': '#a26e4d',
                'secondary-brown': '#ca8a5f',
                'tertiary-brown': '#f8f4e3',
            },
        },
    },
    plugins: [],
};
