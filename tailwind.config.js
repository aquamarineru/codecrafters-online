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
        dark: "#030303",
        light: "#ffffff",
        gray: "#d9d9d9",
        blue: "#284b63",
        hover: '#3c6e71'
      },
      backgroundImage: {
        "hero": "url('/bg.png')",
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
