const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    safeList: [],
    content: [
      "./index.html",
      "./src/**/*.jsx",
      "./src/**/*.tsx",
      "./src/**/*.js",
      "./src/**/*.ts",
    ],
  },
  theme: {
    extend: {
      fontWeight: ["hover", "focus"],
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [],
};
