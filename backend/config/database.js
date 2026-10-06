const mongoose = require('mongoose');

let mongodInstance = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hub_learning';
  const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER === 'true';

  try {
    // Use a longer timeout for cloud deployments (Atlas + Render cold starts)
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: isProduction ? 30000 : 5000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log(`[Database] MongoDB Connected successfully to: ${uri.replace(/\/\/.*@/, '//***@')}`);
  } catch (err) {
    console.warn(`[Database] Could not connect to primary MongoDB URI: ${err.message}`);

    console.log('[Database] Initializing in-memory MongoDB for local zero-config operation...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongodInstance = await MongoMemoryServer.create();
      const inMemoryUri = mongodInstance.getUri();
      await mongoose.connect(inMemoryUri);
      console.log(`[Database] Connected to In-Memory MongoDB at: ${inMemoryUri}`);
      
      if (isProduction) {
        console.warn('====================================================');
        console.warn('⚠️ WARNING: RUNNING IN-MEMORY DATABASE IN PRODUCTION');
        console.warn('Your MONGODB_URI is invalid, so the server fell back to an in-memory database.');
        console.warn('ALL DATA WILL BE LOST when the Render server restarts or goes to sleep!');
        console.warn('Please update MONGODB_URI in Render with a valid Atlas cluster string.');
        console.warn('====================================================');
      } else {
        console.log('[Database] Note: To persist data across restarts, configure MONGODB_URI in backend/.env');
      }
    } catch (memErr) {
      console.error('[Database] Failed to initialize in-memory MongoDB:', memErr.message);
      console.error('[Database] Please ensure MongoDB is running locally or provide a valid MONGODB_URI in .env');
      process.exit(1);
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
