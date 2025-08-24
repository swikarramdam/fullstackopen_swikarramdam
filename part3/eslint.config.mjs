import globals from "globals";
import js from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";

export default [
  // 1) Start with ESLint’s recommended base
  js.configs.recommended,

  // 2) Our backend (Node + CommonJS) rules
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node },
      ecmaVersion: "latest",
    },
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      // stylistic
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/linebreak-style": ["error", "unix"],
      "@stylistic/js/quotes": ["error", "single"],
      "@stylistic/js/semi": ["error", "never"],

      // extra quality rules from the exercise text
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],

      // turn off console warnings for backend logging
      "no-console": "off",
    },
  },

  // 3) Ignore the frontend build
  {
    ignores: ["dist/**"],
  },
];
