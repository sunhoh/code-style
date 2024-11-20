const { meta } = require('eslint-plugin-boundaries');

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'sort all import in a file',
    },
    fixable: 'code',
    schema: [{ properties: [{ rules: { type: 'array' } }] }],
  },
  create: function (context) {
    console.log('context===', context);
    return {
      ImportDeclaration(node) {
        const importedFilePath = node.source.value;
        console.log('importedFilePath===', importedFilePath);
      },
    };
  },
};
