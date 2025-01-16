/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'header': "url('assets/g19.svg')"
      },
      darkMode: 'class',
      colors: {
        background: {
          DEFAULT: "#FFF0F0",
          dark: "#1B1B1B",
        },
        backdrop: {
          primary: {
            DEFAULT: "#F3E5E5",
            dark: "#232323"
          },
          secondary: {
            DEFAULT: "#E7DADA",
            dark: "#2B2B2B"
          }
        },
        highlight: {
          DEFAULT: "#EF1A2D",
          light: "#F7898F",
          dark: "#790E1C"
        }   
      }
    },
  },
  plugins: [],
}