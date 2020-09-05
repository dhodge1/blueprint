module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/react",
  ],
  globals: {
    Atomics: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "linebreak-style": ["error", "unix"],
    semi: ["error", "always"],
    "react/prop-types": [
      2,
      {
        ignore: ["children", "Component", "dehydratedState", "pageProps"],
      },
    ],
    "react/react-in-jsx-scope": "off",
  },
};
