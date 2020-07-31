const defaultConfig = {
  env: {
    es6: true,
  },
  extends: ['@blue-tomato'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
};

module.exports = {
  ...defaultConfig,
  root: true,
  overrides: [
    {
      ...defaultConfig,
      files: ['*.ts'],
      extends: [
        ...defaultConfig.extends,
        'prettier/@typescript-eslint',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ...defaultConfig.parserOptions,
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        'new-cap': 'off',
      },
    },
  ],
};
