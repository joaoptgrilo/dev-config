# @joaoptgrilo/dev-config

A sharable suite of configurations for my personal TypeScript projects, including ESLint, Prettier, and TSConfig.

This package provides a single source of truth for development standards, ensuring consistency and rapid setup for new projects.

## What's Included?

- **ESLint:** A strict, type-aware configuration with presets for base TypeScript and Next.js projects.
- **Prettier:** A consistent set of code formatting rules.
- **TSConfig:** A base TypeScript configuration with modern, strict compiler settings.
- **Playwright:** A base configuration for E2E testing.
- **VS Code Integration:** Recommended extensions and settings (`.vscode/`) for a seamless, format-on-save developer experience.

## Installation

Install the package and its required peer dependencies in your new project:

```bash
npm install @joaoptgrilo/dev-config eslint typescript prettier @playwright/test --save-dev```

## Usage

After installation, you can easily extend the configurations in your project.

### ESLint

In your project's root, create an `eslint.config.js` file and use a **named import** for the desired configuration.

**Example for a Next.js Project:**

```javascript
// eslint.config.js
import { next } from "@joaoptgrilo/dev-config";

// Use the Next.js preset from the shared package
export default [
  ...next,
  // You can add project-specific overrides here if needed
];

### TypeScript

In your project's `tsconfig.json`, extend the base configuration from the package.

```json
{
  "extends": "@joaoptgrilo/dev-config/tsconfig/base.json",
  "compilerOptions": {
    // Add your project-specific settings here
  }
}
