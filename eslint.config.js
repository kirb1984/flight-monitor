import css from '@eslint/css'
import { tailwindSyntax } from '@eslint/css/syntax'
import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  { ignores: ['.react-router/**'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    ...js.configs.recommended,
  },
  {
    files: ['**/*.css'],
    language: 'css/css',
    languageOptions: { customSyntax: tailwindSyntax },
    ...css.configs.recommended,
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  eslintConfigPrettier,
])
