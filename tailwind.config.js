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
        background: "rgba(var(--background))",
        /*backgroundGradient: "var(--background-gradient)", nem ide kell*/
        backdropPrimary: "rgba(var(--backdrop-primary))",
        backdropSecondary: "rgba(var(--backdrop-secondary))",
        highlightPrimary: "rgba(var(--highlight-primary))",
        highlightSecondary: "rgba(var(--highlight-secondary))",
        textColor: "rgba(var(--text-color))"
      },
    },
  },
}