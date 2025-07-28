import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import tseslint from "typescript-eslint"

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
    },
    ignores: ["eslint.config.js", "apps/**/eslint.config.js", "packages/**/eslint.config.js"],
  },
]
