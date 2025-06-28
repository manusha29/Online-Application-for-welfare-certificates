const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3003;

app.use(cors());
app.use(bodyParser.json());

const mongoUri = 'mongodb://localhost:27017'; // adjust as necessary
const client = new MongoClient(mongoUri);

let collection;

async function connectDB() {
  try {
    await client.connect();
    const database = client.db('Public'); // your DB name
    collection = database.collection('Applications'); // your collection name
    console.log('Connected to MongoDB: Public.Applications');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // exit if DB connection fails
  }
}

// Input validation helper
function isValidAadhar(aadhar) {
  return /^\d{12}$/.test(aadhar);
}

function isValidName(name) {
  return typeof name === 'string' && name.trim().length >= 3;
}

app.post('/validate', async (req, res) => {
  try {
    let { aadhar, name } = req.body;

    if (typeof aadhar !== 'string') aadhar = String(aadhar);
    if (typeof name !== 'string') name = String(name);

    aadhar = aadhar.trim();
    name = name.trim();

    if (!isValidAadhar(aadhar)) {
      return res.status(400).json({ valid: false, message: 'Aadhar must be exactly 12 digits' });
    }

    if (!isValidName(name)) {
      return res.status(400).json({ valid: false, message: 'Name must be at least 3 characters' });
    }

    // Log incoming data for debug
    console.log('Validation requested for:', { aadhar, name });

    // Query exact 'aadhar' string match,
    // & case-insensitive exact match for 'name'
    const record = await collection.findOne({
      aadhar: aadhar,
      name: { $regex: `^${name}$`, $options: 'i' }
    });

    if (record) {
      console.log('Match found:', record);
      return res.json({ valid: true });
    } else {
      console.log('No matching record found');
      return res.json({ valid: false, message: 'Invalid Aadhar number or Name' });
    }
  } catch (error) {
    console.error('Error during validation:', error);
    return res.status(500).json({ valid: false, message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
  connectDB();
});

