const { rules: boundariesRules } = require('eslint-plugin-boundaries');

module.exports = {
  meta: {
    ...boundariesRules['element-types'].meta,
    docs: {
      ...boundariesRules['element-types'].meta.docs,
      description: 'Custom element-types rule with additional logic',
    },
  },
  create(context) {
    // 기본 규칙의 create 함수 호출
    const originalHandlers = boundariesRules['element-types'].create(context);

    // boundaries 설정 가져오기
    const boundariesSettings = context.settings['boundaries/elements'];
    const elementTypesRules = context.options[0]?.rules || [];

    console.log('context ??',context)

    // 파일 타입과 임포트 타입 결정 함수
    function getElementType(filePath) {
      const element = boundariesSettings.find(el => new RegExp(el.pattern).test(filePath));
      return element ? element.type : null;
    }

    // 동적 규칙 검사를 위한 로직
    return {
      ...originalHandlers,
      ImportDeclaration(node) {
        if (originalHandlers.ImportDeclaration) {
          originalHandlers.ImportDeclaration(node);
        }

        const filename = context.getFilename();
        const importSource = node.source.value;

        const fileType = getElementType(filename);
        const importType = getElementType(importSource);

        if (!fileType || !importType) return;

        const rule = elementTypesRules.find(rule => rule.from.includes(fileType));
        if (rule) {
          const isDisallowed = rule.disallow ? rule.disallow.includes(importType) : !rule.allow.includes(importType);
          if (isDisallowed) {
            context.report({
              node,
              message: `${fileType} is not allowed to import ${importType}`,
            });
          }
        }
      },
    };
  },
};
