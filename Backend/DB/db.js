const mongoose = require('mongoose');
const mongodb = require('mongodb');

const connectDB = async () => {
  try {
    // Connection URL without the database name
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017');

    const adminDb = client.db().admin();
    const databasesList = await adminDb.listDatabases();

    const dbExists = databasesList.databases.some(db => db.name === 'cybersecurity');

    if (!dbExists) {
      console.log('Creating the database...');
      await mongoose.connect('mongodb://localhost:27017/cybersecurity');
      console.log('MongoDB connected and database created.');

      // Create the Topic collection without inserting any documents
      await initializeCollections();
    } else {
      console.log('Database already exists. Connecting...');
      await mongoose.connect('mongodb://localhost:27017/cybersecurity');
      console.log('MongoDB connected.');
    }
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

// Define schemas and models for collections
const initializeCollections = async () => {
  try {
    const topicSchema = new mongoose.Schema({
      category: { type: String, required: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      videoLink: { type: String, required: true },
      referenceLink: { type: String, required: true },
    });

    // This will create the "Topic" collection if it doesn't exist, but it won't add any documents
    mongoose.model('topics', topicSchema);
    console.log('Topics collection created (without documents).');
  } catch (error) {
    console.error('Error initializing collections:', error.message);
  }
};

module.exports = connectDB;
