/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      colors:{
        purpledo:"#635fc7",
        buttoncolor:'#f0effa',
        bgmain:'#F4F7FD',
        
      },
      fontFamily:{
          'sans':['Plus Jakarta Sans', 'sans-serif'],
      }
      ,
     

    }
      
  },
  plugins: [],
}

