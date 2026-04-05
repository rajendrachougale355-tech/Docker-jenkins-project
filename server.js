const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;
const MONGO_URL = "mongodb://database:27017";
const DB_NAME = "my_project_db";

app.use(express.static(__dirname));
app.use(express.json());

// Get items
app.get('/data', async (req, res) => {
  try {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db(DB_NAME);
    const items = await db.collection('items').find().toArray();
    res.json(items);
    client.close();
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// Add item
app.post('/add', async (req, res) => {
  try {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db(DB_NAME);
    await db.collection('items').insertOne({ name: req.body.name });
    res.status(201).send('Item added');
    client.close();
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// Delete item
app.delete('/delete/:id', async (req, res) => {
  try {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db(DB_NAME);
    await db.collection('items').deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).send('Item deleted');
    client.close();
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
