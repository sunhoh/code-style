module.exports = {
  plugins: ["boundaries"],
  rules: {
    "boundaries/element-types": [
      2,
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
};
