const { RuleTester } = require("eslint"); // ESLint RuleTester 가져오기
const rule = require("./boundaries"); // 테스트할 규칙 가져오기

// Jest 환경에서 RuleTester 설정
const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: "module" }, // 최신 문법 지원
});

// 테스트 케이스 실행
describe("boundaries/element-types rule", () => {
  ruleTester.run("boundaries/element-types", rule.rules["boundaries/element-types"], {
    valid: [
      {
        code: `import SharedComponent from 'src/shared/Component';`,
        settings: {
          "boundaries/elements": [{ type: "shared", pattern: "src/shared/**" }],
        },
      },
    ],
    invalid: [
      {
        code: `import AppComponent from 'src/app/Component'; // 허용되지 않은 경로`,
        settings: {
          "boundaries/elements": [{ type: "shared", pattern: "src/shared/**" }],
        },
        errors: [
          {
            message: "shared is not allowed to import app", // 예상되는 에러 메시지
          },
        ],
      },
    ],
  });
});
