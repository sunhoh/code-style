const boundariesRules = require('eslint-plugin-boundaries').rules;
const { getFileType } = require('../utils/pattern');
const { BOUNDARIES_ELEMENTS_SETTINGS } = require('../core/config');

module.exports = {
  rules: {
    'boundaries/element-types': {
      meta: boundariesRules['element-types'].meta,
      create(context) {
        const originalRule = boundariesRules['element-types'].create(context);
        const settings = context.settings['boundaries/elements'];

        if (!settings) {
          return {};
        }

        return {
          ImportDeclaration(node) {
            if (originalRule.ImportDeclaration) {
              originalRule.ImportDeclaration(node);
            }

            const currentFilePath = context.getFilename();
            const importedFilePath = node.source.value;

            const currentFileType = getFileType(currentFilePath, settings);
            const importedFileType = getFileType(importedFilePath, settings);

            if (!currentFileType || !importedFileType) {
              return; // 타입이 없으면 검사하지 않음
            }

            const rules = context.options[0]?.rules || [];
            const applicableRule = rules.find(rule => rule.from.includes(currentFileType));

            if (
              applicableRule &&
              ((applicableRule.allow && !applicableRule.allow.includes(importedFileType)) ||
                (applicableRule.disallow && applicableRule.disallow.includes(importedFileType)))
            ) {
              context.report({
                node,
                message: `${currentFileType} is not allowed to import ${importedFileType}`,
              });
            }
          },
        };
      },
    },
  },
  configs: {
    recommended: {
      plugins: ['boundaries'],
      rules: {
        'boundaries/element-types': [
          2,
          {
            default: 'disallow',
            message: '${file.type} is not allowed to import ${dependency.type}',
            rules: [
              {
                from: ['app'],
                allow: ['pages', 'entities', 'features', 'widgets', 'shared'],
              },
              {
                from: ['pages'],
                allow: ['widgets', 'entities', 'features', 'shared'],
              },
              {
                from: ['widgets'],
                allow: ['features', 'entities', 'shared'],
              },
              {
                from: ['features'],
                allow: ['entities', 'shared'],
              },
              {
                from: ['entities'],
                allow: ['shared'],
              },
              {
                from: ['shared'],
                disallow: ['app', 'pages', 'entities', 'features', 'widgets'],
              },
            ],
          },
        ],
      },
      settings: BOUNDARIES_ELEMENTS_SETTINGS,
    },
  },
};
