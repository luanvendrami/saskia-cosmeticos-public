import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    plugins: ["@typescript-eslint", "import"]
  }
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "eslint:recommended"),
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      "import": importPlugin,
    },
    rules: {
      // Detecta importações de módulos que não existem
      "import/no-unresolved": "error",
      
      // Previne importações circulares
      "import/no-cycle": "error",
      
      // Exige que as importações sejam ordenadas
      "import/order": [
        "warn",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index"
          ],
          "newlines-between": "always",
          "alphabetize": { "order": "asc", "caseInsensitive": true }
        }
      ],
      
      // Evita importações não utilizadas
      "import/no-unused-modules": "error",
      
      // Evita nomes duplicados nas exportações
      "import/export": "error",
      
      // Força extensões de arquivo em importações
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          "ts": "never",
          "tsx": "never",
          "js": "never",
          "jsx": "never"
        }
      ],
      
      // Novas regras para detectar problemas de importação
      "import/no-absolute-path": "error",
      "import/no-self-import": "error",
      "import/no-useless-path-segments": "error",
      "import/first": "error",
      "import/no-duplicates": "error",
      "import/no-named-as-default": "warn",
      "import/no-named-as-default-member": "warn",
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"]
      },
      "import/resolver": {
        "typescript": {
          "alwaysTryTypes": true,
          "project": "./tsconfig.json"
        },
        "node": {
          "extensions": [".js", ".jsx", ".ts", ".tsx"]
        }
      }
    }
  }
];

export default eslintConfig;
