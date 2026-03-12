/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './public/index.html',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--color-primary)',       // green-800 deep forest
                    foreground: 'var(--color-primary-foreground)', // white
                },
                secondary: {
                    DEFAULT: 'var(--color-secondary)',     // brown-700 earth
                    foreground: 'var(--color-secondary-foreground)', // white
                },
                accent: {
                    DEFAULT: 'var(--color-accent)',        // lime-500 vibrant
                    foreground: 'var(--color-accent-foreground)', // black
                },
                background: 'var(--color-background)',   // gray-50 green undertone
                foreground: 'var(--color-foreground)',   // gray-900
                card: {
                    DEFAULT: 'var(--color-card)',          // gray-50 surface
                    foreground: 'var(--color-card-foreground)', // gray-800
                },
                popover: {
                    DEFAULT: 'var(--color-popover)',       // gray-50
                    foreground: 'var(--color-popover-foreground)', // gray-800
                },
                muted: {
                    DEFAULT: 'var(--color-muted)',         // green-50 muted
                    foreground: 'var(--color-muted-foreground)', // green-gray-600
                },
                success: {
                    DEFAULT: 'var(--color-success)',       // forest-green-700
                    foreground: 'var(--color-success-foreground)', // white
                },
                warning: {
                    DEFAULT: 'var(--color-warning)',       // goldenrod
                    foreground: 'var(--color-warning-foreground)', // black
                },
                error: {
                    DEFAULT: 'var(--color-error)',         // firebrick
                    foreground: 'var(--color-error-foreground)', // white
                },
                destructive: {
                    DEFAULT: 'var(--color-destructive)',   // firebrick
                    foreground: 'var(--color-destructive-foreground)', // white
                },
                border: 'var(--color-border)',           // primary/15
                input: 'var(--color-input)',             // white
                ring: 'var(--color-ring)',               // lime-500
                'text-primary': 'var(--color-text-primary)',     // gray-900
                'text-secondary': 'var(--color-text-secondary)', // green-gray-600
            },
            fontFamily: {
                heading: ['Outfit', 'sans-serif'],
                body: ['Source Sans 3', 'sans-serif'],
                caption: ['IBM Plex Sans', 'sans-serif'],
                data: ['JetBrains Mono', 'monospace'],
                sans: ['Source Sans 3', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            fontSize: {
                'h1': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
                'h2': ['1.875rem', { lineHeight: '1.25', fontWeight: '600' }],
                'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
                'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
                'h5': ['1.125rem', { lineHeight: '1.5', fontWeight: '500' }],
                'caption': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.025em' }],
            },
            borderRadius: {
                'sm': '6px',
                'md': '12px',
                'lg': '18px',
                'xl': '24px',
                DEFAULT: '12px',
            },
            boxShadow: {
                'sm': '0 2px 4px rgba(45, 90, 61, 0.1)',
                'md': '0 4px 12px rgba(45, 90, 61, 0.15)',
                'lg': '0 6px 20px rgba(45, 90, 61, 0.2)',
                'xl': '0 12px 32px rgba(45, 90, 61, 0.25)',
                '2xl': '0 25px 50px -12px rgba(45, 90, 61, 0.3)',
                'card': '0 2px 8px rgba(45, 90, 61, 0.08)',
                'card-hover': '0 6px 20px rgba(45, 90, 61, 0.18)',
                'nav': '0 2px 12px rgba(45, 90, 61, 0.12)',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '88': '22rem',
                '128': '32rem',
            },
            transitionTimingFunction: {
                'natural': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            },
            transitionDuration: {
                '250': '250ms',
            },
            zIndex: {
                'navigation': '100',
                'dropdown': '50',
                'modal': '200',
                'notification': '300',
                'overlay': '250',
            },
            animation: {
                'shimmer': 'shimmer 1.5s infinite',
                'count-up': 'countUp 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                'card-reveal': 'cardReveal 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
                'fade-in': 'fadeIn 250ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
                'slide-down': 'slideDown 250ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
                'slide-up': 'slideUp 250ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
                "pulse-slow": "pulse-slow 3s ease-in-out infinite",
            },
            keyframes: {
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                countUp: {
                    'from': { opacity: '0', transform: 'translateY(10px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                cardReveal: {
                    'from': { opacity: '0', transform: 'translateY(16px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    'from': { opacity: '0' },
                    'to': { opacity: '1' },
                },
                slideDown: {
                    'from': { opacity: '0', transform: 'translateY(-8px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    'from': { opacity: '0', transform: 'translateY(8px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                "pulse-slow": {
                    '0%, 100%': { transform: 'translateX(-100%)' },
                    '50%': { transform: 'translateX(100%)' },
                },
            },
            maxWidth: {
                'prose': '70ch',
            },
            height: {
                'nav': '64px',
                'brand': '48px',
                'touch': '44px',
            },
            minHeight: {
                'touch': '44px',
            },
            minWidth: {
                'touch': '44px',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('tailwindcss-animate'),
    ],
};