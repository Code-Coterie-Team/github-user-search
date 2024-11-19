/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      colors:{
        purple:"#635fc7",
        buttoncolor:'#f0effa',
      },
      fontFamily:{
          'sans':['Plus Jakarta Sans', 'sans-serif'],
      }
      ,
     

    }
      
  },
  plugins: [],
}

