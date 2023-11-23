/** @type {import('tailwindcss').Config} */
export default {
  plugins: ["prettier-plugin-tailwindcss"],
  content: ["./src/**/*.{jsx,tsx,html,js,ts}", "./index.html"],
  darkMode: "class", //allows for dark:style inline
  theme: {
    fontFamily: {
      sans: ['"Segoe UI"', "Roboto", "sans-serif"],
    },
  }
}

