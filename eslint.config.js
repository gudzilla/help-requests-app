import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import checkFile from 'eslint-plugin-check-file';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'check-file': checkFile,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // NAMING RULES
      'check-file/filename-naming-convention': [
        'error',
        {
          'src/**/!({index,main,router}).{jsx,tsx}': 'PASCAL_CASE',
          'src/**/{index,main,router}.{jsx,tsx}': 'CAMEL_CASE',
          // 'src/**/!({vite-env}).{js,ts}': 'CAMEL_CASE', // <-- УДАЛИТЬ ЭТУ СТРОКУ
          'src/**/{vite-env}.{d.ts}': 'KEBAB_CASE',
        },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': [
        'error',
        { 'src/**/!(__tests__)': 'CAMEL_CASE' },
      ],
    },
  }
);
