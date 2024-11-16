const boundariesRules = require("eslint-plugin-boundaries").rules

module.exports = {
  rules: {
    "boundaries/element-types": {
      meta: boundariesRules["element-types"].meta, // 메타데이터 그대로 사용
      create(context) {
        console.log('context===??',context)
        // 기존 규칙의 create 함수 호출
        const originalRule = boundariesRules["element-types"].create(context);

        // 추가 로직 또는 기존 규칙만 실행
        // return {
        //   ImportDeclaration(node) {
        //     console.log('Processing node =====:', node.source.value); // 처리 중인 노드 출력
        //     // 기존 규칙 실행
        //     if (originalRule.ImportDeclaration) {
        //       originalRule.ImportDeclaration(node);
        //     }

        //     // 추가 로직: 필요할 경우 기존 로직에 덧붙이기
        //     const filename = context.getFilename();
        //     if (filename.includes("test") && node.source.value.includes("src/app")) {
        //       context.report({
        //         node,
        //         message: "Test files should not import from 'src/app'.",
        //       });
        //     }
        //   },
        // };
      },
    },
  },
  configs: {
    recommended: {
      plugins: ["boundaries"],
      rules: {
        "boundaries/element-types": [
          "error",
          {
            default: "disallow",
            message: "${file.type} is not allowed to import ${dependency.type}",
            rules: [
              {
                from: ["app"],
                allow: ["pages", "entities", "features", "widgets", "shared"],
              },
              {
                from: ["pages"],
                allow: ["widgets", "entities", "features", "shared"],
              },
              {
                from: ["widgets"],
                allow: ["features", "entities", "shared"],
              },
              {
                from: ["features"],
                allow: ["entities", "shared"],
              },
              {
                from: ["entities"],
                allow: ["shared"],
              },
              {
                from: ["shared"],
                disallow: ["app", "pages", "entities", "features", "widgets"],
              },
            ],
          },
        ],
      },
      settings: {
        "boundaries/elements": [
          { type: "app", pattern: "src/app/**" },
          { type: "pages", pattern: "src/pages/**" },
          { type: "widgets", pattern: "src/widgets/**" },
          { type: "features", pattern: "src/features/**" },
          { type: "entities", pattern: "src/entities/**" },
          { type: "shared", pattern: "src/shared/**" },
        ],
      },
    },
  },
};
