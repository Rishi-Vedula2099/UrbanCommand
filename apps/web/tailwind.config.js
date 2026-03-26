/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        city: {
          bg: "#060B14",
          panel: "#0C1425",
          border: "#1A2744",
          cyan: "#00E5FF",
          indigo: "#6366F1",
          emerald: "#10B981",
          amber: "#F59E0B",
          rose: "#F43F5E",
          muted: "#4B6080",
          surface: "#0F1C35",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-in-right": "slideInRight 0.35s ease-out",
        glow: "glow 2s ease-in-out infinite alternate",
        scanner: "scanner 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(0, 229, 255, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(0, 229, 255, 0.8), 0 0 40px rgba(0, 229, 255, 0.3)" },
        },
        scanner: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0, 229, 255, 0.3)",
        "glow-indigo": "0 0 20px rgba(99, 102, 241, 0.4)",
        "glow-emerald": "0 0 20px rgba(16, 185, 129, 0.3)",
        "glow-rose": "0 0 20px rgba(244, 63, 94, 0.4)",
        panel: "0 4px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
