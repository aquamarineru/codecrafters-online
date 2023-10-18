/* module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
} */
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' && require('@fullhuman/postcss-purgecss')({
      content: [
        'src/**/*.html',
        'src/**/*.js',
        'src/**/*.jsx',
        'src/styles/global.css',
        // Or if using `src` directory structure
        // './src/**/*.{js,jsx,ts,tsx}',
        'public/**/*.html',
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    }),
  ].filter(Boolean),
};
