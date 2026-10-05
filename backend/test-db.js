const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

console.log('=== MongoDB Connection Test ===');
console.log('URI:', uri ? uri.replace(/:([^@]+)@/, ':****@') : 'NOT SET');
console.log('Attempting connection...\n');

mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
  .then(() => {
    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    console.log('   Host:', mongoose.connection.host);
    console.log('   Database:', mongoose.connection.name);
    console.log('   State:', mongoose.connection.readyState === 1 ? 'Connected' : 'Not connected');
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('\n✅ Disconnected cleanly. Your URI is correct!');
    process.exit(0);
  })
  .catch((err) => {
    console.log('❌ FAILED:', err.message);
    
    if (err.message.includes('ENOTFOUND')) {
      console.log('\n🔧 FIX: Cluster hostname not found. Check cluster name in URI.');
    } else if (err.message.includes('authentication failed') || err.message.includes('AuthenticationFailed')) {
      console.log('\n🔧 FIX: Wrong username or password. Check Atlas Database Access.');
      console.log('   - If password has special chars (@, #, %, etc.), URL-encode them.');
      console.log('   - @ → %40, # → %23, % → %25');
    } else if (err.message.includes('IP') || err.message.includes('whitelist') || err.message.includes('ETIMEDOUT')) {
      console.log('\n🔧 FIX: Your IP is not whitelisted in Atlas.');
      console.log('   Atlas → Network Access → Add IP → 0.0.0.0/0 (allow all)');
    } else if (err.message.includes('buffering timed out')) {
      console.log('\n🔧 FIX: Connection never established. Check:');
      console.log('   1. Network Access: whitelist 0.0.0.0/0 in Atlas');
      console.log('   2. Credentials: verify username/password');
      console.log('   3. Cluster: ensure it is not paused');
    }
    
    process.exit(1);
  });
