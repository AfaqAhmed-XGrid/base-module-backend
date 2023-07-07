module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': 'google',
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  'rules': {
    'no-underscore-dangle': 0,
    'no-unused-vars': 0,
    'no-param-reassign': 0,
    'prefer-promise-reject-errors': 1,
    'import/no-unresolved': 0,
    'no-await-in-loop': 0,
    'new-cap': 0,
    'max-len': ['error', { 'code': 250 }],
    'linebreak-style': 'off',
    'object-curly-spacing': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 0 }],
  },
};
