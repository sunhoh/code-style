const { RuleTester } = require('eslint');
const rule = require('./boundaries');

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    'boundaries/elements': [
      { type: 'app', pattern: 'src/app/**' },
      { type: 'pages', pattern: 'src/pages/**' },
      { type: 'widgets', pattern: 'src/widgets/**' },
      { type: 'features', pattern: 'src/features/**' },
      { type: 'entities', pattern: 'src/entities/**' },
      { type: 'shared', pattern: 'src/shared/**' },
    ],
  },
});

ruleTester.run('boundaries/element-types', rule.rules['boundaries/element-types'], {
  valid: [
    {
      code: `import SharedComponent from 'src/shared/Component';`,
      filename: 'src/pages/Page.js',
      options: [
        {
          rules: [
            {
              from: ['pages'],
              allow: ['shared'],
            },
          ],
        },
      ],
    },
  ],
  invalid: [
    {
      code: `import AppComponent from 'src/app/Component';`,
      filename: 'src/shared/Component.js',
      options: [
        {
          rules: [
            {
              from: ['shared'],
              disallow: ['app', 'widgets'], // 금지된 타입
            },
          ],
        },
      ],
      errors: [
        {
          message: 'shared is not allowed to import app',
          type: 'ImportDeclaration',
        },
      ],
    },
  ],
});
