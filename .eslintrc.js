module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-use-before-define": "off",
    "no-console": "off",
    "no-param-reassign": "off",
    "no-restricted-syntax": "off",
    "no-await-in-loop": "off"
  },
};
