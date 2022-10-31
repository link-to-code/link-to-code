/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsc,tsx,ts}", "node_modules/@link-to-code/ui/**/*.{js,jsc,tsx,ts}"],
  ...require("@link-to-code/ui/config/tailwind"),
};
