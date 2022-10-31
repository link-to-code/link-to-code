# @link-to-code/ui

link-to-code main ui package, made of tailwind css, daisyui and radix-ui.

## Getting started

To use this library you need to install `postcss`, `tailwindcss` and `daisyui` first.

`pnpm add postcss autoprefixer tailwindcss @tailwindcss/typography daisyui @link-to-code/ui`

You can then add the following to your `postcss.config.js`:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

And the following to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsc,tsx,ts}", "node_modules/@link-to-code/ui/**/*.{js,jsc,tsx,ts}"],
  ...require("@link-to-code/ui/config/tailwind"),
};
```

Don't forget to include this in your app's css, before anything else:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

```

You're done!
