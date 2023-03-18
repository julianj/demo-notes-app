import { Bucket, Table } from "sst/constructs";

export function StorageStack({ stack, app }) {
  // Create S3 bucket called "Uploads" using the SST Bucket Construct
  const bucket = new Bucket(stack, "Uploads", {
    cors: [
      {
        maxAge: "1 day",
        allowedOrigins: ["*"],
        allowedHeaders: ["*"],
        allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
      },
    ],
  });

  // Create the DynamoDB table named "Notes" using the SST Table construct
  const table = new Table(stack, "Notes", {
    fields: {
      userId: "string", // Id of the user that owns the note
      noteId: "string", // Id of the note
    },
    primaryIndex: { partitionKey: "userId", sortKey: "noteId" },
  });

  return { // returns both the table and the bucket
    table, 
    bucket
  };
}
