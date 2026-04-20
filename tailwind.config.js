import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
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
                    DEFAULT: '#6366F1',
                    hover: '#4F46E5',
                    light: '#818CF8',
                },
                secondary: {
                    DEFAULT: '#A855F7',
                    light: '#C084FC',
                },
                'text-main': 'var(--text-main)',
                'text-muted': 'var(--text-muted)',
                'accent-blue-soft': 'var(--accent-soft)',
                'border-main': 'var(--border-main)',
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
