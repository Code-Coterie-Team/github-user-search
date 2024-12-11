/** @type {import('tailwindcss').Config} */
export default {
  darkMode:"selector",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      colors:{
       
        purpledo:"#635fc7",
        purplelight:'rgba(99, 95, 199, 0.5)',
        buttoncolor:'#f0effa',
        bgmain:'#F4F7FD',
        dark: {
        primary: {
          100:"rgb(43, 44, 55)",
          200: "#20212C",
          300: "",
        },},
      },
      fontSize: {
        responsive: 'clamp(1.2rem, 3vw, 1.5rem)',
      },
      
    }
      
  },
  plugins: [],
}

