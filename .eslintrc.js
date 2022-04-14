module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
            legacyDecorators: true,
        },
    },
    extends: [
        "airbnb",
        "airbnb/hooks",
        "plugin:react/recommended",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:unicorn/recommended",
        "prettier",
        "plugin:prettier/recommended",
    ],
    plugins: ["react", "@typescript-eslint", "unicorn", "prettier"],
    env: {
        jest: true,
        browser: true,
        node: true,
        es6: true,
    },
    settings: {
        react: {
            pragma: "React",
            version: "detect",
        },
        "import/resolver": {
            node: {
                extensions: [".tsx", ".ts", ".js", ".json"],
            },
            typescript: {
                project: "./tsconfig.json",
            },
        },
    },
    overrides: [
        {
            files: ["**/*.d.ts"],
            rules: {
                "import/no-duplicates": 0,
            },
        },
    ],
    globals: {
        document: true,
        navigator: true,
        window: true,
        node: true,
    },
    rules: {
        "prettier/prettier": 2,
        "no-continue": 0,
        "no-shadow": 0,
        "no-console": 1,
        "unicorn/no-null": 0,
        "no-param-reassign": [2, { props: true, ignorePropertyModificationsFor: ["draft"] }],
        "react/display-name": 0,
        "react/jsx-props-no-spreading": 0,
        "react/prop-types": 0,
        "react/jsx-uses-react": 0,
        "react/react-in-jsx-scope": 0,
        "react/require-default-props": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-a11y/no-noninteractive-element-interactions": 0,
        "@typescript-eslint/no-unused-vars": 2,
        "@typescript-eslint/no-shadow": 2,
        "react-hooks/rules-of-hooks": 2,
        "react-hooks/exhaustive-deps": 2,
        "unicorn/no-array-reduce": 0,
        "unicorn/no-array-for-each": 0,
        "unicorn/prefer-module": 0,
        "unicorn/prevent-abbreviations": 0,
        "unicorn/prefer-export-from": 0,
        "react/no-array-index-key": 1,
        "react/jsx-filename-extension": [2, { extensions: [".tsx", ".ts", ".jsx", ".js"] }],
        "react/function-component-definition": [
            2,
            { namedComponents: "arrow-function", unnamedComponents: "arrow-function" },
        ],
        "import/extensions": [
            2,
            "ignorePackages",
            {
                js: "never",
                jsx: "never",
                ts: "never",
                tsx: "never",
            },
        ],
        "import/no-anonymous-default-export": 2,
        "unicorn/filename-case": [
            2,
            {
                cases: {
                    kebabCase: false,
                    camelCase: true,
                    snakeCase: false,
                    pascalCase: true,
                },
            },
        ],
    },
};
