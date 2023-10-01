module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    "import/resolver": { node: { extensions: [".js", ".jsx", ".ts", ".tsx"] } },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "airbnb",
    "airbnb/hooks",
    // "prettier/react",
    // "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/jsx-filename-extension": 0,
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": 0,
    "react/self-closing-comp": 0,
    indent: ["error", 2],
    // quotes: ["error", "double"],
    // semi: ["error", "always"],
    "no-shadow": 0,
    "linebreak-style": ["error", "unix"],
    "no-return-await": 0,
    "class-methods-use-this": 0,
  
    "prettier/prettier": 0,
    "no-unused-vars": "off",
    "import/prefer-default-export": "off",
    "no-console": "off",
    "import/no-unresolved": "off",
    "click-events-have-key-events": "off",
    "max-classes-per-file": "off",
    "no-use-before-define": "off",
    "react-hooks/rules-of-hooks": "warn",
    "import/extensions": ["off"],
    "react/destructuring-assignment": "off",
    "react/react-in-jsx-scope": "off",


    // "@typescript-eslint/no-use-before-define": ["error"],
  },
};