import globals from "globals"

import { config as baseConfig } from "./base.js"

export const nodeConfig = [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]
