/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default { 
  content: ['./src/**/*.{html,js,jsx,ts,tsx}',"./index.html" ,' flowbite.content(),'],
  theme: {
    extend: {},
  },
  plugins: [       require('flowbite/plugin')],
}

