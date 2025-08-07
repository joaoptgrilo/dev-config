// eslint.config.mjs
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintReact from "@eslint-react/eslint-plugin";
import eslintPluginReactCompiler from "eslint-plugin-react-compiler";
import eslintPluginNext from "@next/eslint-plugin-next";
import stylistic from "@stylistic/eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";

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
].filter(Boolean);

const next = [
  ...base,
  eslintPluginNext.configs["flat/recommended"],
  {
    plugins: {
      ...eslintReact.configs.recommended.plugins,
      "react-compiler": eslintPluginReactCompiler,
    },
    rules: {
      ...eslintReact.configs.recommended.rules,
      "react-compiler/react-compiler": "error",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
].filter(Boolean);

export { base, next };
