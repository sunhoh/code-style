const { RuleTester } = require('eslint');
const rule = require('../rules/fsd-arch-boundaries');

const ruleTester = new RuleTester({
  parser: require.resolve('espree'),
  parserOptions: {
    ecmaVersion: 'latest',
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

ruleTester.run('fsd-arch-boundaries', rule, {
  valid: [
    {
      code: `import { something } from 'shared/module';`,
      filename: '/project/src/app/component.js',
    },
    {
      code: `import { something } from 'entities/module';`,
      filename: '/project/src/features/feature.js',
    },
  ],
  invalid: [
    {
      code: `import { something } from 'pages/module';`,
      filename: '/project/src/shared/util.js',
      errors: [{ message: 'shared is not allowed to import pages' }],
    },
    {
      code: `import { something } from 'widgets/module';`,
      filename: '/project/src/features/features.js',
      errors: [{ message: 'features is not allowed to import widgets' }],
    },
  ],
});
