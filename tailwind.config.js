/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0f1926",
        light: "#FBFAF5",
        gray: "#d9d9d9", 
        hover: "#9959d9",
        hover2: "#16f2dc",   
        basic: '#342359'
      },
      backgroundImage: {
        "hero": "url('/bg.png')",
        'glass': 'linear-gradient(113.9deg, rgba(255,255,255,0.03) 17.93%, rgba(255,255,255,0.05) 44.28%, rgba(255,255,255,0.05) 63.93%, rgba(255,255,255,0.03) 88.25%)'
      },
      fontFamily: {
        h1: ['IBM Plex Sans', 'sans-serif'],
        tag: ['Courier Prime', 'monospace'],
        light: ['Muli', 'sans-serif'],
        text: ['Muli', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

// 0F1926 16F2DC 342359 9959D9

