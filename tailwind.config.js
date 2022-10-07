module.exports = {
  presets: [
    require('tailwindcss/defaultConfig'), require('xtendui/tailwind.preset'),
  ],
  // put other content e.g.: './src/**/*.{html,js}'
  content: ['./node_modules/xtendui/src/*.mjs'],
}