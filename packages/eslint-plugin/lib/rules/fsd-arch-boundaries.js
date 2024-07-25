module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "all folders have hierarchical restrictions (follows fsd architecture)",
      recommended: true,
    },
    fixable: "code",
    schema: [
      {
        type: "objects",
        rules: {
          type: "array",
          default: true,
        },
      },
    ],
  },
  create: function (context) {
    console.log("context ==", context);
  },
};
