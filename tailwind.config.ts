import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/swiper/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        'modal-slide-up': {
          '0%': { transform: 'translateY(10px) scale(0.95)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        }
      },
      animation: {
        'modal-slide-up': 'modal-slide-up 0.3s ease-out forwards',
      },
    },
  },
  safelist: [
    'swiper',
    'swiper-wrapper',
    'swiper-slide',
    'swiper-pagination',
    'swiper-button-next',
    'swiper-button-prev',
    'swiper-pagination-bullet',
    'swiper-pagination-bullet-active',
  ],
  plugins: [],
} satisfies Config;
