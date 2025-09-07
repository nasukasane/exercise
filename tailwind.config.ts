import colors from 'tailwindcss/colors';
import { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
    './problem/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'slide-in-fade': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0px)', opacity: '1' },
        },
        'shake-x': {
          '0%': { opacity: '0' },
          '5%': { transform: 'translateX(10px)', opacity: '0.5' },
          '10': { transform: 'translateX(0px)', opacity: '1' },
          '15%': { transform: 'translateX(-10px)', opacity: '1' },
          '25%': { transform: 'translateX(10px)', opacity: '1' },
          '30%': { transform: 'translateX(0px)', opacity: '1' },
          '100%': { transform: 'translateX(0px)', opacity: '1' },
        },
      },
      animation: {
        'slide-in-fade': 'slide-in-fade 1s ease-out forwards', // forwardsで最終状態を維持
        'shake-x': 'shake-x 1s forwards', 
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
} satisfies Config;