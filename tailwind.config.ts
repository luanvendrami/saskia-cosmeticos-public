import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/swiper/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      forcedColorAdjust: "none",
      keyframes: {
        "modal-slide-up": {
          "0%": { transform: "translateY(10px) scale(0.95)", opacity: "0" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-text": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.7", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "float-micro": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-3px)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        shine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-150%)" },
          "100%": { transform: "translateX(150%)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
        "twinkle-delay": {
          "0%, 100%": { opacity: "0.1", transform: "scale(0.9)" },
          "60%": { opacity: "0.8", transform: "scale(1.15)" },
        },
        "twinkle-slow": {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.95)" },
          "50%": { opacity: "0.9", transform: "scale(1.05)" },
        },
        butterfly: {
          "0%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-5px) rotate(5deg)" },
          "50%": { transform: "translateY(-8px) rotate(0deg)" },
          "75%": { transform: "translateY(-3px) rotate(-5deg)" },
          "100%": { transform: "translateY(0) rotate(0deg)" },
        },
        "butterfly-delay": {
          "0%": { transform: "translateY(-5px) rotate(5deg)" },
          "25%": { transform: "translateY(-8px) rotate(0deg)" },
          "50%": { transform: "translateY(-3px) rotate(-5deg)" },
          "75%": { transform: "translateY(0) rotate(0deg)" },
          "100%": { transform: "translateY(-5px) rotate(5deg)" },
        },
        "expand-line": {
          "0%": { width: "0%", opacity: "0" },
          "100%": { width: "100%", opacity: "0.8" },
        },
        "fade-in-out": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "50%": { opacity: "0.7", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.8)" },
        },
        "fade-in-out-delay": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "30%": { opacity: "0.7", transform: "scale(1)" },
          "70%": { opacity: "0.7", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.8)" },
        },
        "product-float": {
          "0%": { transform: "translateY(0) rotate(0deg) scale(1)" },
          "20%": { transform: "translateY(-10px) rotate(-5deg) scale(1.05)" },
          "40%": { transform: "translateY(0) rotate(0deg) scale(1)" },
          "60%": { transform: "translateY(-5px) rotate(5deg) scale(1.02)" },
          "80%": { transform: "translateY(-8px) rotate(0deg) scale(1.03)" },
          "100%": { transform: "translateY(0) rotate(0deg) scale(1)" },
        },
        "product-rotate": {
          "0%": { transform: "rotate(0deg) translateX(0)" },
          "25%": { transform: "rotate(10deg) translateX(5px)" },
          "50%": { transform: "rotate(0deg) translateX(0)" },
          "75%": { transform: "rotate(-8deg) translateX(-3px)" },
          "100%": { transform: "rotate(0deg) translateX(0)" },
        },
        "slide-in-out": {
          "0%": { transform: "translateX(-100%) rotate(-10deg)", opacity: "0" },
          "20%": { transform: "translateX(0) rotate(0deg)", opacity: "0.8" },
          "80%": { transform: "translateX(0) rotate(0deg)", opacity: "0.8" },
          "100%": { transform: "translateX(100%) rotate(10deg)", opacity: "0" },
        },
        "enter-left": {
          "0%": {
            transform: "translateX(-100%) rotate(-5deg) scale(0.9)",
            opacity: "0",
          },
          "15%": {
            transform: "translateX(-50%) rotate(-3deg) scale(0.95)",
            opacity: "0.5",
          },
          "30%": {
            transform: "translateX(0) rotate(0deg) scale(1)",
            opacity: "1",
          },
          "70%": {
            transform: "translateX(0) rotate(0deg) scale(1)",
            opacity: "1",
          },
          "85%": {
            transform: "translateX(50%) rotate(3deg) scale(0.95)",
            opacity: "0.5",
          },
          "100%": {
            transform: "translateX(100%) rotate(5deg) scale(0.9)",
            opacity: "0",
          },
        },
        "enter-right": {
          "0%": {
            transform: "translateX(100%) rotate(5deg) scale(0.9)",
            opacity: "0",
          },
          "15%": {
            transform: "translateX(50%) rotate(3deg) scale(0.95)",
            opacity: "0.5",
          },
          "30%": {
            transform: "translateX(0) rotate(0deg) scale(1)",
            opacity: "1",
          },
          "70%": {
            transform: "translateX(0) rotate(0deg) scale(1)",
            opacity: "1",
          },
          "85%": {
            transform: "translateX(-50%) rotate(-3deg) scale(0.95)",
            opacity: "0.5",
          },
          "100%": {
            transform: "translateX(-100%) rotate(-5deg) scale(0.9)",
            opacity: "0",
          },
        },
        "enter-top": {
          "0%": {
            transform: "translateY(-100%) rotate(-5deg) scale(0.9)",
            opacity: "0",
          },
          "15%": {
            transform: "translateY(-50%) rotate(-3deg) scale(0.95)",
            opacity: "0.5",
          },
          "30%": {
            transform: "translateY(0) rotate(0deg) scale(1)",
            opacity: "1",
          },
          "70%": {
            transform: "translateY(0) rotate(0deg) scale(1)",
            opacity: "1",
          },
          "85%": {
            transform: "translateY(50%) rotate(3deg) scale(0.95)",
            opacity: "0.5",
          },
          "100%": {
            transform: "translateY(100%) rotate(5deg) scale(0.9)",
            opacity: "0",
          },
        },
        "enter-bottom": {
          "0%": {
            transform: "translateY(100%) rotate(5deg) scale(0.9)",
            opacity: "0",
          },
          "15%": {
            transform: "translateY(50%) rotate(3deg) scale(0.95)",
            opacity: "0.5",
          },
          "30%": {
            transform: "translateY(0) rotate(0deg) scale(1)",
            opacity: "1",
          },
          "70%": {
            transform: "translateY(0) rotate(0deg) scale(1)",
            opacity: "1",
          },
          "85%": {
            transform: "translateY(-50%) rotate(-3deg) scale(0.95)",
            opacity: "0.5",
          },
          "100%": {
            transform: "translateY(-100%) rotate(-5deg) scale(0.9)",
            opacity: "0",
          },
        },
        "diagonal-top-left": {
          "0%": {
            transform: "translate(-100%, -100%) rotate(-5deg) scale(0.9)",
            opacity: "0",
          },
          "15%": {
            transform: "translate(-50%, -50%) rotate(-3deg) scale(0.95)",
            opacity: "0.5",
          },
          "30%": {
            transform: "translate(0, 0) rotate(0deg) scale(1)",
            opacity: "1",
          },
          "70%": {
            transform: "translate(0, 0) rotate(0deg) scale(1)",
            opacity: "1",
          },
          "85%": {
            transform: "translate(50%, 50%) rotate(3deg) scale(0.95)",
            opacity: "0.5",
          },
          "100%": {
            transform: "translate(100%, 100%) rotate(5deg) scale(0.9)",
            opacity: "0",
          },
        },
        "diagonal-top-right": {
          "0%": {
            transform: "translate(100%, -100%) rotate(5deg) scale(0.9)",
            opacity: "0",
          },
          "15%": {
            transform: "translate(50%, -50%) rotate(3deg) scale(0.95)",
            opacity: "0.5",
          },
          "30%": {
            transform: "translate(0, 0) rotate(0deg) scale(1)",
            opacity: "1",
          },
          "70%": {
            transform: "translate(0, 0) rotate(0deg) scale(1)",
            opacity: "1",
          },
          "85%": {
            transform: "translate(-50%, 50%) rotate(-3deg) scale(0.95)",
            opacity: "0.5",
          },
          "100%": {
            transform: "translate(-100%, 100%) rotate(-5deg) scale(0.9)",
            opacity: "0",
          },
        },
        "ping-slow": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        "ping-delay": {
          "0%, 35%": { transform: "scale(1)", opacity: "1" },
          "85%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        "ping-fast": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "65%, 100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "pulse-delay": {
          "0%, 30%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "60%": { opacity: "0.3", transform: "scale(1.05)" },
        },
        "pulse-width": {
          "0%": { width: "100%" },
          "50%": { width: "70%" },
          "100%": { width: "100%" },
        },
        "pulse-height": {
          "0%": { height: "100%" },
          "50%": { height: "70%" },
          "100%": { height: "100%" },
        },
        "spin-very-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "width-expand": {
          "0%": { width: "0%", opacity: "0.4" },
          "100%": { width: "100%", opacity: "1" },
        },
        "border-pulse": {
          "0%": {
            borderColor: "rgba(236, 72, 153, 0.3)",
            transform: "scale(0.9)",
          },
          "50%": {
            borderColor: "rgba(236, 72, 153, 0.6)",
            transform: "scale(1.1)",
          },
          "100%": {
            borderColor: "rgba(236, 72, 153, 0.3)",
            transform: "scale(0.9)",
          },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-50px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(50px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-bottom": {
          "0%": { transform: "translateY(50px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-top": {
          "0%": { transform: "translateY(-50px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "rotate-pulse": {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.1)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        expand: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "modal-slide-up": "modal-slide-up 0.3s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "pulse-text": "pulse-text 2s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "pulse-delay": "pulse-delay 5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "float-micro": "float-micro 3s ease-in-out infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        shine: "shine 2.5s linear infinite",
        shimmer: "shimmer 3.5s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        "twinkle-delay": "twinkle-delay 4s ease-in-out infinite",
        "twinkle-slow": "twinkle-slow 5s ease-in-out infinite",
        butterfly: "butterfly 8s ease-in-out infinite",
        "butterfly-delay": "butterfly-delay 8s ease-in-out infinite",
        "expand-line": "expand-line 1.5s ease-out forwards 0.5s",
        "fade-in-out": "fade-in-out 7s ease-in-out infinite",
        "fade-in-out-delay": "fade-in-out-delay 9s ease-in-out infinite",
        "product-float": "product-float 12s ease-in-out infinite",
        "product-rotate": "product-rotate 10s ease-in-out infinite",
        "slide-in-out": "slide-in-out 15s ease-in-out infinite",
        "enter-left": "enter-left 12s ease-in-out infinite",
        "enter-right": "enter-right 14s ease-in-out infinite",
        "enter-top": "enter-top 13s ease-in-out infinite",
        "enter-bottom": "enter-bottom 15s ease-in-out infinite",
        "diagonal-top-left": "diagonal-top-left 16s ease-in-out infinite",
        "diagonal-top-right": "diagonal-top-right 17s ease-in-out infinite",
        "ping-slow": "ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "ping-delay": "ping-delay 4s cubic-bezier(0, 0, 0.2, 1) infinite",
        "ping-fast": "ping-fast 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "pulse-width": "pulse-width 8s ease-in-out infinite",
        "pulse-height": "pulse-height 7s ease-in-out infinite",
        "spin-very-slow": "spin-very-slow 20s linear infinite",
        "width-expand": "width-expand 1.2s ease-out forwards",
        "border-pulse": "border-pulse 3s ease-in-out infinite",
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
        "slide-in-bottom": "slide-in-bottom 0.5s ease-out forwards",
        "slide-in-top": "slide-in-top 0.5s ease-out forwards",
        "rotate-pulse": "rotate-pulse 10s ease-in-out infinite",
        "bounce-slow": "bounce-slow 4s ease-in-out infinite",
        expand: "expand 0.4s ease-out forwards",
        gradient: "gradient 15s ease infinite",
      },
      boxShadow: {
        glow: "0 0 15px rgba(255, 255, 255, 0.5)",
      },
    },
  },
  safelist: [
    "swiper",
    "swiper-wrapper",
    "swiper-slide",
    "swiper-pagination",
    "swiper-button-next",
    "swiper-button-prev",
    "swiper-pagination-bullet",
    "swiper-pagination-bullet-active",
  ],
  plugins: [
    function ({
      addUtilities,
    }: {
      addUtilities: (utilities: Record<string, Record<string, string>>) => void;
    }) {
      const newUtilities = {
        ".glow-text-white": {
          textShadow:
            "0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3)",
        },
        ".blur-3xl": {
          filter: "blur(64px)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
} satisfies Config;
