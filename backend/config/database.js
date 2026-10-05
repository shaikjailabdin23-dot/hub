const mongoose = require('mongoose');

let mongodInstance = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hub_learning';

  try {
    // Attempt connecting to the provided MONGODB_URI with a 2 second timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`[Database] MongoDB Connected successfully to: ${uri}`);
  } catch (err) {
    console.warn(`[Database] Could not connect to primary MongoDB URI (${uri}): ${err.message}`);
    console.log('[Database] Initializing seamless in-memory MongoDB instance for local zero-config operation...');

    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongodInstance = await MongoMemoryServer.create();
      const inMemoryUri = mongodInstance.getUri();
      await mongoose.connect(inMemoryUri);
      console.log(`[Database] Connected to In-Memory MongoDB at: ${inMemoryUri}`);
      console.log('[Database] Ready! Note: To persist data across restarts, configure MONGODB_URI in backend/.env');
    } catch (memErr) {
      console.error('[Database] Failed to initialize in-memory MongoDB:', memErr.message);
      console.error('[Database] Please ensure MongoDB is running locally or provide a valid MONGODB_URI in .env');
    }
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (mongodInstance) {
      await mongodInstance.stop();
    }
  } catch (error) {
    console.error('[Database] Error during disconnect:', error.message);
  }
};

module.exports = { connectDB, disconnectDB };
