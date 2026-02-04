import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    600: '#1E40AF',
                    700: '#1E3A8A',
                    800: '#172554',
                },
                gold: {
                    500: '#D4AF37',
                    600: '#B8972D',
                },
                offwhite: '#FAFAFA',
                primary: {
                    50: '#f5f7fa',
                    100: '#eaeef4',
                    200: '#d0dae7',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif', 'var(--font-inter)'],
                display: ['Playfair Display', 'serif', 'var(--font-playfair)'],
            },
            boxShadow: {
                soft: '0 4px 30px rgba(0, 0, 0, 0.05)',
                glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
}

export default config
