module.exports = {
  parserOptions: { tsconfigRootDir: __dirname },

  extends: ["react-app", "prettier"],
  rules: {},
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      rules: {},
    },
  ],
};
