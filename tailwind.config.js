/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        isabelline: "#F4F0E8",
        charcoal: "#2D2D2D",
        stone: "#898681",
        "burnt-sienna": "#C65D3B",
        sage: "#D3D9D4",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        brand: ['"Syne"', "sans-serif"],
        sans: ['"Inter"', "sans-serif"],
        tech: ['"Chivo Mono"', "monospace"],
      },
      borderRadius: {
        sm: "2px", // "No hard corners. Use a subtle border-radius (rounded-sm)"
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
