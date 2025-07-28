// eslint.config.mjs
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintReact from "@eslint-react/eslint-plugin";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginNext from "@next/eslint-plugin-next";
import stylistic from "@stylistic/eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";

// Base configuration for TypeScript projects
const base = [
  { ignores: [".next/", "node_modules/", "out/"] },
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "@stylistic": stylistic,
      perfectionist,
    },
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { modules: true, jsx: true },
        project: "./tsconfig.json",
      },
    },
  },
  {
    rules: {
      // Add any base rules for all projects here
      "perfectionist/sort-objects": [
        "error",
        {
          type: "natural",
          order: "asc",
          "partition-by-comment": true,
        },
      ],
    },
  },
];

// Configuration for Next.js projects, extending the base
const next = [
  ...base,
  eslintPluginNext.configs["flat/recommended"],
  {
    plugins: {
      ...eslintReact.configs.recommended.plugins,
      "react-compiler": eslintPluginReact,
    },
    rules: {
      ...eslintReact.configs.recommended.rules,
      "react-compiler/react-compiler": "error",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];

// Named exports for consumers
export { base, next };

// Default export for linting this package itself
export default base;
