// @ts-check

import js from '@eslint/js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import packageJson from 'eslint-plugin-package-json'
import perfectionist from 'eslint-plugin-perfectionist'
import reactDom from 'eslint-plugin-react-dom'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactX from 'eslint-plugin-react-x'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', './src/routeTree.gen.ts', '.nitro', '.output', '.tanstack'] },
  { linterOptions: { reportUnusedDisableDirectives: 'error' } },
  js.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  ...pluginQuery.configs['flat/recommended'],
  {
    extends: [packageJson.configs.recommended],
    files: ['**/package.json']
  },
  {
    extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      perfectionist,
      'react-dom': reactDom,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-x': reactX,
      unicorn: eslintPluginUnicorn
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactX.configs['recommended-typescript'].rules,
      ...reactDom.configs.recommended.rules,
      ...eslintPluginUnicorn.configs.recommended.rules,
      ...perfectionist.configs['recommended-natural'].rules,
      '@typescript-eslint/only-throw-error': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowBoolean: true,
          allowNullish: true,
          allowNumber: true
        }
      ],
      'logical-assignment-operators': ['error', 'always', { enforceForIfStatements: true }],
      'no-useless-rename': 'error',
      'object-shorthand': 'error',
      'operator-assignment': 'error',
      'perfectionist/sort-imports': [
        'error',
        {
          tsconfigRootDir: '.'
        }
      ],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: ['README.md']
        }
      ],
      'unicorn/no-null': 'off',
      'unicorn/prefer-query-selector': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prevent-abbreviations': 'off'
    },
    settings: {
      perfectionist: { partitionByComment: true, type: 'natural' },
      react: {
        version: 'detect'
      }
    }
  },
  {
    files: ['./src/contexts/**/*.tsx', './src/components/ui/**/*.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off'
    }
  }
)
