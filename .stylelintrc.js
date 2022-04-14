module.exports = {
    extends: ["stylelint-config-standard", "stylelint-config-rational-order", "stylelint-config-prettier"],
    plugins: ["stylelint-scss", "stylelint-order"],
    customSyntax: "postcss-scss",
    rules: {
        "comment-empty-line-before": null,
        "function-name-case": ["lower", { ignoreFunctions: ["/colorPalette/"] }],
        "no-invalid-double-slash-comments": null,
        "no-descending-specificity": null,
        "declaration-empty-line-before": null,
        "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global", "local"] }],
        "at-rule-no-unknown": null,
        "scss/at-rule-no-unknown": true,
        "selector-class-pattern": null
    },
};
