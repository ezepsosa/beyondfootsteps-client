import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8080/graphql",
  documents: "src/graphql/queries/*.graphql",
  generates: {
    "src/gql/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo"
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
      }
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    }
  },
};

export default config;
