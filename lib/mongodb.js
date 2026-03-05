import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
};

let client;
let clientPromise;

if (uri) {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
} else {
  // If no URI is provided, create a dummy promise that will fail at runtime
  clientPromise = Promise.reject(new Error('Please add your Mongo URI to .env.local'));
}

// Export a module-level exported promise. By doing this in a
// separate module, we can share the same MongoDB connection in the
// "serverless" environment.
export default clientPromise;
