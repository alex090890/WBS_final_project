import express from 'express';
import { config } from 'dotenv';
import path from 'path';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import bodyParser from 'body-parser';

config();
console.log(process.env);

const uri = "mongodb+srv://alexprofteach:JANnHALJute10Lsr@cluster0.0ls7xoz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to MongoDB server");
  } catch (err) {
    console.log(err);
  }
}
run().catch(console.dir);

const port = process.env.PORT || 3000; // add a default port if env variable is not set

const app = express();
app.use(bodyParser.json());

const router = express.Router();

router.post('/newuser', async (req, res) => {
  try {
    const { firstname, lastname, login, password, passwordhint, email } = req.body;
    const db = client.db("users");
    const usersCollection = db.collection("users");
    const creationDate = new Date();
    const result = await usersCollection.insertOne({ firstname, lastname, login, password, passwordhint, email, creationdate: creationDate });
    res.status(201).send(`User created with id: ${result.insertedId}`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating user');
  }
});

router.get('/users', async (req, res) => {
  try {
    const db = client.db("users");
    const usersCollection = db.collection("users");
    const users = await usersCollection.find({}).toArray();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error getting users');
  }
});

router.get('/userslist', async (req, res) => {
  try {
    const db = client.db("users");
    const usersCollection = db.collection("users");
    const users = await usersCollection.find({}).toArray();

    let html = '<h2>List of all the users</h2><ul>';
    users.forEach(user => {
      html += `<li>${user.login} - Created on ${user.creationdate? user.creationdate.toLocaleDateString() : 'Unknown'}</li>`;
    });
    html += '</ul>';
    res.status(200).send(html);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error getting users');
  }
});

router.delete('/deleteuser/:id', async (req, res) => {
  try {
    const db = client.db("users");
    const usersCollection = db.collection("users");
    const result = await usersCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      res.status(404).send('User not found');
      return;
    }
    res.status(200).send('User deleted');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error deleting user');
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const db = client.db("users");
    const usersCollection = db.collection("users");

    // Validate the id parameter
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).send('Invalid user ID');
      return;
    }

    const user = await usersCollection.findOne({ _id: new ObjectId(req.params.id) }, { projection: { _id: 0 } });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error getting user');
  }
});

app.use('/', router);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`)
})