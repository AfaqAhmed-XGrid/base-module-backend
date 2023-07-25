/*
Copyright (c) 2023, Xgrid Inc, http://xgrid.co

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides: [
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'
      ],
      'extends': [
        'plugin:cypress/recommended'
      ],
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'indent': ['error', 2],
    '@typescript-eslint/no-explicit-any': 'error',
    semi: ['error', 'always'],
    // Enforce removing unused variables in Vue components.
    'vue/no-unused-vars': 'error',

    // Require default props for better maintainability and to avoid potential issues with missing props.
    'vue/require-default-prop': 'error',

    // Enforce defining prop types for better code understanding and maintainability.
    'vue/require-prop-types': 'error',

    // Ensure providing a unique :key attribute in v-for loops to optimize rendering performance.
    'vue/require-v-for-key': 'error',

    // Disallow using this keyword in templates to prevent potential performance issues.
    'vue/this-in-template': 'error',

    // Enforce using kebab-case for HTML attributes to maintain consistency
    // and avoid issues with case-sensitive attributes in some environments.
    'vue/attribute-hyphenation': 'error',

    // Enforce a specific order of component properties for better readability and maintainability.
    'vue/order-in-components': 'error',

    // Enforce using camelCase for prop names for consistency and to avoid issues with case-sensitive props in some environments.
    'vue/prop-name-casing': ['error', 'camelCase'],

    // Enforce consistent style for v-bind directives (shorthand or longhand) to maintain code consistency.
    'vue/v-bind-style': ['error', 'shorthand'],

    // Enforce consistent style for v-on directives (shorthand or longhand) to maintain code consistency.
    'vue/v-on-style': ['error', 'shorthand'],

    // Disallow side effects in computed properties to avoid unexpected behavior and improve performance.
    'vue/no-side-effects-in-computed-properties': 'error',

    // Disallow using the key attribute in <template> tags, which can lead to unintended behavior.
    'vue/no-template-key': 'error',

    // Enforce valid v-for directives for better performance and to avoid errors.
    'vue/valid-v-for': 'error',

    // Enforce valid v-if directives to avoid rendering issues and improve performance.
    'vue/valid-v-if': 'error',

    // Prevent using <template> tags without a parent element to improve maintainability.
    'vue/no-lone-template': 'error',

    // Disallow using v-if and v-for on the same element to avoid performance issues.
    'vue/no-use-v-if-with-v-for': 'error',

    // Enforce using single quotes for consistency.
    'quotes': ['error', 'single'],

    // Allow underscores in variable names (disabled).
    'no-underscore-dangle': 0,

    // Allow unused variables (disabled).
    'no-unused-vars': 0,

    // Allow reassigning function parameters (disabled).
    'no-param-reassign': 0,

    // Allow using Promise.reject() with non-Error objects (warning).
    'prefer-promise-reject-errors': 1,

    // Allow importing unresolved modules (disabled).
    'import/no-unresolved': 0,

    // Allow using await inside loops (disabled).
    'no-await-in-loop': 0,

    // Allow using constructor function calls without capitalization (disabled).
    'new-cap': 0,

    // Limit the maximum length of lines to 250 characters.
    'max-len': ['error', { 'code': 250 }],

    // Allow any linebreak style (disabled).
    'linebreak-style': 'off',

    // Require curly braces for object literals (always).
    'object-curly-spacing': ['error', 'always'],

    // Require an end-of-line at the end of files (always).
    'eol-last': ['error', 'always'],

    // Limit the maximum number of consecutive empty lines to 2 (disabled at EOF).
    'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 0 }],

    // Require JSDoc comments for functions, but not for function declarations.
    'require-jsdoc': [
      'error',
      {
        'require': {
          'FunctionDeclaration': false
        }
      }
    ],

    // Require importing 'vue' when using JSX-like templates (error).
    'vue/jsx-uses-vars': 'error',

    // Require using explicit key for template-based elements (error).
    'vue/require-explicit-emits': 'error',

    // Require component names to be in PascalCase (error).
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],

    // Enforce consistent indentation for template elements (error).
    'vue/html-indent': ['error', 2],

    // Enforce self-closing tags in templates (error).
    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'always',
        'normal': 'never',
        'component': 'always'
      },
      'svg': 'always',
      'math': 'always'
    }],
  }
};
