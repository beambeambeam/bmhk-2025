import { baseConfig } from "./base.js"
import globals from "globals"

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
