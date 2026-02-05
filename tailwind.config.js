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
                    900: '#1e3a8a', // Using a dark blue for navy-900
                },
                gold: {
                    600: '#D4AF37',
                },
                // Sober, professional color palette
                primary: {
                    50: '#f5f7fa',
                    100: '#eaeef4',
                    200: '#d0dae7',
                    300: '#a7bbd3',
                    400: '#7797ba',
                    500: '#567aa3',
                    600: '#426089',
                    700: '#364e70',
                    800: '#2f425e',
                    900: '#2b3950',
                    950: '#1c2535',
                },
                accent: {
                    50: '#f0f7fb',
                    100: '#d9ebf5',
                    200: '#b3d7eb',
                    300: '#6bb5d9',
                    400: '#3d95c7',
                    500: '#1e75b5',
                    600: '#165a91',
                    700: '#0f4470',
                    800: '#0a2f52',
                    900: '#051d34',
                    950: '#031221',
                },
                neutral: {
                    50: '#f8f9fa',
                    100: '#f1f3f5',
                    200: '#e9ecef',
                    300: '#dee2e6',
                    400: '#ced4da',
                    500: '#adb5bd',
                    600: '#868e96',
                    700: '#495057',
                    800: '#343a40',
                    900: '#212529',
                    950: '#0d0f12',
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                display: ['var(--font-playfair)', 'Georgia', 'serif'],
            },
            fontSize: {
                'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
                'display-sm': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '26': '6.5rem',
                '30': '7.5rem',
            },
            maxWidth: {
                '8xl': '88rem',
                '9xl': '96rem',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-in-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'slide-down': 'slideDown 0.6s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}

export default config
