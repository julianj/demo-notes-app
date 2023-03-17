import { Api, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }) {
  const { table } = use(StorageStack);

  // Create the API
  const api = new Api(stack, "Api", {
    defaults: {
      authorizer: "iam",
      function: {
        permissions: [table],
        environment: {
          TABLE_NAME: table.tableName,
          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        },
      },
    },
    routes: {
      "GET /notes/{id}": "services/functions/get.main",
      "GET /notes": "services/functions/list.main",
      "POST /notes": "services/functions/create.main",
      "PUT /notes/{id}": "services/functions/update.main",
      "DELETE /notes/{id}": "services/functions/delete.main",
      "POST /billing": "services/functions/billing.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return {
    api,
  };
}