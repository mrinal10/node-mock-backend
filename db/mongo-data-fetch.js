const { MongoClient } = require('mongodb');

async function fetchData() {
  const collectionName = 'base-data'; // Replace with your collection name

  try {
    const db = await connect();
    const collection = db.collection(collectionName);

    // Fetch all documents from the collection
    const documents = await collection.find({}).toArray();
    console.log('Documents:', documents);
    return documents;
  } catch (err) {
    console.error('Error:', err);
  }
}

async function connect() {
  const url = 'mongodb://localhost:27017'; // Replace with your MongoDB URL
  const dbName = 'football-data'; // Replace with your database name

  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  // Connect to the MongoDB client
  await client.connect();
  console.log('Connected to database');

  return client.db(dbName);
}



module.exports = {
  fetchData
}