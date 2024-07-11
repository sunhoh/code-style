module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:import/recommended",
        "plugin:import/errors",
        "plugin:import/warnings"
    ],
    plugins: ["import", "boundaries"],
    rules:{
        "boundaries/element-types": [
            2,
            {
              "default": "disallow",
              "rules": [
                {
                  "from": "shared/*",
                  "allow": []
                },
                {
                  "from": "widgets/*",
                  "allow": []
                },
                {
                  "from": "features",
                  "allow": ["shared", "widgets", "features"]
                },
                {
                  "from": "entities",
                  "allow": ["shared", "widgets", "features", "entities"]
                },
                {
                  "from": "pages",
                  "allow": ["shared", "widgets", "features", "entities", "pages"]
                },
                {
                  "from": "app",
                  "allow": ["shared", "widgets", "features", "entities", "pages", "app"]
                }
              ]
            }
          ],
          "import/no-extraneous-dependencies": ["error", { "devDependencies": true }]
    },
    settings: {
        "boundaries/elements": [
          { "type": "app", "pattern": "src/app/*" },
          { "type": "pages", "pattern": "src/pages/*" },
          { "type": "entities", "pattern": "src/entities/*" },
          { "type": "features", "pattern": "src/features/*" },
          { "type": "widgets", "pattern": "src/widgets/*" },
          { "type": "shared", "pattern": "src/shared/*" }
        ],
        "import/resolver": {
          "node": {
            "paths": ["src"],
            "extensions": [".js", ".jsx", ".ts", ".tsx"]
          }
        }
      }
}