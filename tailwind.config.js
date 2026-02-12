/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#C9A24D',
                'primary-dark': '#B8952F',
                'background-light': '#F8F9FA',
                'background-dark': '#0B1E36',
                'card-light': '#FFFFFF',
                'card-dark': '#132742',
                'card-darker': '#161B26',
                'input-dark': '#162C4B',
                'text-header-light': '#0B1E36',
                'text-header-dark': '#F3F4F6',
                'text-body-light': '#4B5563',
                'text-body-dark': '#9CA3AF',
                'border-dark': '#1E3A5F',
                'imi-dark-blue': '#0B1E36',
                imi: {
                    50: '#F7F8FA',
                    100: '#ECEEF2',
                    200: '#D0D5DE',
                    300: '#A0AABB',
                    400: '#6B83A0',
                    500: '#59718C',
                    600: '#3C495D',
                    700: '#2E2E3A',
                    800: '#282834',
                    900: '#23232D',
                },
                navy: {
                    50: '#F7F8FA',
                    100: '#ECEEF2',
                    200: '#D0D5DE',
                    300: '#A0AABB',
                    400: '#6B83A0',
                    500: '#59718C',
                    600: '#3C495D',
                    700: '#2E2E3A',
                    800: '#282834',
                    900: '#23232D',
                },
                accent: {
                    400: '#E5C158',
                    500: '#D4AF37',
                    600: '#B8952F',
                },
                gold: {
                    400: '#E5C158',
                    500: '#D4AF37',
                    600: '#B8952F',
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
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'card': '0 2px 8px rgba(0, 0, 0, 0.04)',
                'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                'header': '0 1px 3px rgba(0,0,0,0.05)',
                'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                'glow': '0 0 15px rgba(201, 162, 77, 0.2)',
                'nav': '0 -4px 20px -2px rgba(0, 0, 0, 0.05)',
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
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}

export default config
