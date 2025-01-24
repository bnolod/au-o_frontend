/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'header': "url('assets/g19.svg')",
        'backgroundGradient': "var(--background-gradient)"
      },
      darkMode: 'class',
      colors: {
        /*Color codes in index.css*/
        background: "var(--background)",
        /*backgroundGradient: "var(--background-gradient)", nem ide kell*/
        backdropPrimary: "var(--backdrop-primary)",
        backdropSecondary: "var(--backdrop-secondary)",
        highlightPrimary: "var(--highlight-primary)",
        highlightSecondary: "var(--highlight-secondary)",
        textColor: "var(--text-color)"
      },
    },
  },
  plugins: [],
}