/**
 * Default export is the react-specific eslint config
 * ======
 * NOTE:
 * __DO NOT__ put any styling-rules in this file.
 *
 * If you wish to enforce opinionated styling preferences,
 * please enforce them in your prettier configuration.
 *
 * This config has been specifically implemented to play
 * nicely with prettier.
 * ======
 */
module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  plugins: ["react"],
  parserOptions: {
    // project: "tsconfig.eslint.json",
    // tsconfigRootDir: __dirname,
    projectFolderIgnoreList: ["pages", "dist", "docs"],
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  parser: "@typescript-eslint/parser",
  rules: {
    "no-sparse-arrays": 0,
    "no-return-assign": 0,
    indent: 0,
    // These rules are no longer needed since react@17.x
    // @see https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
    //
    // We're still going to use them, however
    // because it provides assurances that rollup/esbuild/vite
    // will all play nicely together in the build process
    //
    // If we can guarantee that this is unnecessary
    // we can remove it in the future. However, right now (09/21)
    // many open-source-libraries are keeping it turned off
    // for compatibility reasons.
    //
    "react/jsx-uses-react": 0,
    "react/react-in-jsx-scope": 0,
    // Preferential rule adjustments
    "@typescript-eslint/no-redeclare": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/member-naming": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/typedef": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/member-ordering": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/naming-convention": 0,
    "@typescript-eslint/no-floating-promises": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/ban-types": 0,
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-expect-error": "allow-with-description",
        "ts-ignore": true,
        "ts-nocheck": true,
        "ts-check": false,
        minimumDescriptionLength: 3,
      },
    ],

    "react/jsx-no-bind": 0,
    "react/display-name": 0,
    "react/prop-types": 0,
  },
};
