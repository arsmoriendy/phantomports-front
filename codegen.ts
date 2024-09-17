import { loadEnv } from "vite"
import type { CodegenConfig } from '@graphql-codegen/cli'

process.env = { ...process.env, ...loadEnv("DEV", process.cwd()) };

const config: CodegenConfig = {
  schema: process.env["VITE_GQL_SRV_URI"],
  documents: ['src/**/*.tsx'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: "gql"
      }
    }
  }
}
export default config
