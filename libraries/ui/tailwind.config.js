/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsc,tsx,ts}", "./stories/**/*.mdx"],
  ...require("./config/tailwind"),
};
