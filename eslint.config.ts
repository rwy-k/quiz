import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    prettierConfig,
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        languageOptions: {
            globals: globals.browser,
        },
        plugins: {
            prettier: prettierPlugin,
            'react-hooks': reactHooksPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/jsx-no-bind': 'off',
            'react/jsx-props-no-multi-spaces': 'off',
            'react/jsx-closing-bracket-location': 'off',
            'react/jsx-closing-tag-location': 'off',
            'react/jsx-tag-spacing': 'off',
            'react/jsx-max-props-per-line': 'off',
            'react/jsx-first-prop-new-line': 'off',
            'react/jsx-indent': 'off',
            'react/jsx-indent-props': 'off',
            'react/jsx-max-depth': 'off',
            'react/jsx-max-lines': 'off',
            'react/jsx-max-lines-per-function': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'prettier/prettier': 'error',
        },
    },
];
