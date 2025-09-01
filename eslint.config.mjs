import js from "@eslint/js"
import tseslint from "@typescript-eslint/eslint-plugin"
import parser from "@typescript-eslint/parser"
import eslintConfigPrettier from "eslint-config-prettier"
import globals from "globals"

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.ts", "packages/**/*.ts", "test/**/*.ts"],
    languageOptions: {
      parser,
      parserOptions: {
        project: true,
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  eslintConfigPrettier,
]
