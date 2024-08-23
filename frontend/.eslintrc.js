module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended'
    ],
    plugins: ['@typescript-eslint'],
    env: {
      browser: true,
      node: true,
      es6: true
    },
    rules: {
    }
};