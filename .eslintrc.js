module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
        '@vue/prettier/@typescript-eslint',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'no-console': 0,
        'no-debugger': 0,
        'no-async-promise-executor': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)',
            ],
            env: {
                jest: true,
            },
        },
    ],
};
