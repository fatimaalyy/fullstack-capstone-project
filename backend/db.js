import { MongoClient } from "mongodb";

// MongoDB connection URL - stored in environment variable for security
const url = process.env.MONGO_URL;

let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
  if (dbInstance) {
    return dbInstance;
  }

  const client = new MongoClient(url);

  // Connect to the MongoDB cluster
  await client.connect();

  dbInstance = client.db(dbName);

  return dbInstance;
}

export default connectToDatabase;
