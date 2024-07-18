module.exports = {
    env: {
      "browser": true,
      "es2021": true,
      "node": true,
      "es6": true
    },
    plugins: ["import", "boundaries"],
    extends: [
        "plugin:boundaries/recommended",
        "eslint:recommended",
        "plugin:import/recommended",
        "plugin:import/errors",
        "plugin:import/warnings"
    ],
    rules:{
      "boundaries/element-types": [
        2,
        {
          "default": "disallow",
          "message": "${file.type} is not allowed to import ${dependency.type}",
          "rules": [
            {
              "from": ["app"],
              "allow": ["pages", "entities", "features", "widgets", "shared"]
            },
            {
              "from": ["pages"],
              "allow": ["entities", "features", "widgets", "shared"]
            },
            {
              "from": ["entities"],
              "allow": ["features", "widgets", "shared"]
            },
            {
              "from": ["features"],
              "allow": ["widgets", "shared"]
            },
            {
              "from": ["widgets"],
              "allow": ["shared"]
            },
            {
              "from": ["shared"],
              "disallow": ["app", "pages", "entities", "features", "widgets"]
            }
          ]
        }
      ],
      "import/no-extraneous-dependencies": ["error", { "devDependencies": true }]
    },
    settings: {
      "boundaries/elements": [
        { "type": "app", "pattern": "src/app/**" },
        { "type": "pages", "pattern": "src/pages/**" },
        { "type": "entities", "pattern": "src/entities/**" },
        { "type": "features", "pattern": "src/features/**" },
        { "type": "widgets", "pattern": "src/widgets/**" },
        { "type": "shared", "pattern": "src/shared/**" }
      ]
  }
}