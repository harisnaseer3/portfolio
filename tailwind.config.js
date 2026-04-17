import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#6366F1', // Indigo/Blue from screenshot
                    hover: '#4F46E5',
                    light: '#818CF8',
                },
                secondary: {
                    DEFAULT: '#A855F7', // Purple accent
                    light: '#C084FC',
                },
                'text-main': '#0F172A', // Slate 900
                'text-muted': '#64748B', // Slate 500
                'accent-blue-soft': '#F5F7FF', // Lavender-ish background
                'border-main': '#E2E8F0', // Slate 200
            },
            fontFamily: {
                sans: ['Outfit', 'Inter', ...defaultTheme.fontFamily.sans],
            },
            boxShadow: {
                'premium': '0 20px 50px -12px rgba(99, 102, 241, 0.15)',
                'card': '0 10px 30px -5px rgba(0, 0, 0, 0.04)',
            }
        },
    },

    plugins: [forms],
};
