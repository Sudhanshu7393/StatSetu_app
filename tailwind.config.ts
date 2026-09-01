import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "hsl(224, 71%, 97%)",
          100: "hsl(224, 71%, 93%)",
          200: "hsl(224, 71%, 85%)",
          300: "hsl(224, 71%, 74%)",
          400: "hsl(224, 71%, 62%)",
          500: "hsl(224, 71%, 51%)",
          600: "hsl(224, 71%, 40%)",  // primary — trustworthy indigo-blue
          700: "hsl(224, 71%, 32%)",
          800: "hsl(224, 71%, 24%)",
          900: "hsl(224, 71%, 16%)",
          950: "hsl(224, 71%, 10%)",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        subtle:  "0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px 0 rgba(15, 23, 42, 0.04)",
        card:    "0 2px 8px -2px rgba(15, 23, 42, 0.08), 0 1px 4px -1px rgba(15, 23, 42, 0.04)",
        hover:   "0 8px 20px -4px rgba(15, 23, 42, 0.10), 0 4px 8px -2px rgba(15, 23, 42, 0.06)",
        elevated:"0 16px 32px -8px rgba(15, 23, 42, 0.12)",
        focus:   "0 0 0 3px rgba(37, 99, 235, 0.15)",
      },
      borderRadius: {
        "xs":  "0.375rem",
        "sm":  "0.5rem",
        DEFAULT: "0.75rem",
        "md":  "0.75rem",
        "lg":  "1rem",
        "xl":  "1.25rem",
        "2xl": "1.5rem",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
