import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "idl/graphql/schemas/server.graphql",
  documents: "src/**/*.tsx",
  generates: {
    "_generated/graphql/server/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
