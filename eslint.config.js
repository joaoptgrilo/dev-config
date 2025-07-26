// eslint.config.js
import globals from "globals";
import tseslint from "typescript-eslint";
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";

// This is the base configuration for any TypeScript project (React or backend)
const baseConfig = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/ban-types": [
        "error",
        {
          types: {
            "React.FC": { message: "Use arrow function syntax instead." },
            FC: { message: "Use arrow function syntax instead." },
            "React.FunctionComponent": {
              message: "Use arrow function syntax instead.",
            },
          },
          extendDefaults: true,
        },
      ],
    },
  },
];

// This is the configuration for Next.js projects, building on the base
const nextConfig = [
  ...baseConfig,
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
];

export default {
  base: baseConfig,
  next: nextConfig,
};
