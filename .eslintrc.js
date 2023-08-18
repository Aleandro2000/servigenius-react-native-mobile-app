module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "react",
    "no-comments",
  ],
  rules: {
    "linebreak-style": 0,
    "global-require": 0,
    "max-len": 0,
    "dot-notation": 0,
    "import/no-import-module-exports": 0,
    "react/no-unstable-nested-components": 0,
    "react/prop-types": 0,
    "react/prefer-stateless-function": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-no-constructed-context-values": 0,
    "react/jsx-one-expression-per-line": 0,
    "import/no-unresolved": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "import/extensions": 0,
    "import/prefer-default-export": 0,
    "import/no-dynamic-require": 0,
    "prefer-destructuring": 0,
    "no-undef": 0,
    "no-underscore-dangle": [0, {
      allowAfterThis: true,
    }],
    "no-bitwise": 0,
    "no-mixed-operators": 0,
    "no-nested-ternary": 0,
    "no-restricted-syntax": 0,
    "no-comments/disallowComments": [
      2,
      {
        allow: ["TODO", "FIXME", "NOTE", "DEBUG"],
      },
    ],
    "no-unused-vars": ["error", {
      vars: "all", args: "after-used", ignoreRestSiblings: true, caughtErrors: "none",
    }],
    "no-unused-expressions": 0,
    "no-plusplus": 0,
    camelcase: 0,
    "class-methods-use-this": 0,
    "react/forbid-prop-types": [0, {
      forbid: ["object"],
    }],
    "react/jsx-filename-extension": [2, {
      extensions: [".js",
        ".jsx"],
    }],
    quotes: ["error",
      "double", {
        allowTemplateLiterals: true,
      },
    ],
  },
};
