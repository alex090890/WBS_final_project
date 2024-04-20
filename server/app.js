import express from 'express';
import { config } from 'dotenv';
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
const flashcardsClient = new MongoClient(uri, {
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

//Userslist database

app.post('/newuser', async (req, res) => {
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

app.get('/users', async (req, res) => {
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

app.get('/userslist', async (req, res) => {
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

app.delete('/deleteuser/:id', async (req, res) => {
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

app.get('/user/:id', async (req, res) => {
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

app.put('/updateuser/:id', async (req, res) => {
  try {
    const db = client.db("users");
    const usersCollection = db.collection("users");

    // Validate the id parameter
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).send('Invalid user ID');
      return;
    }

    const updateData = {};
    if (req.body.firstname) updateData.firstname = req.body.firstname;
    if (req.body.lastname) updateData.lastname = req.body.lastname;
    if (req.body.login) updateData.login = req.body.login;
    if (req.body.password) updateData.password = req.body.password;
    if (req.body.passwordhint) updateData.passwordhint = req.body.passwordhint;
    if (req.body.email) updateData.email = req.body.email;

    const result = await usersCollection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updateData });
    if (result.matchedCount === 0) {
      res.status(404).send('User not found');
      return;
    }
    res.status(200).send('User updated');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error updating user');
  }
});

app.patch('/updateuser/:id', async (req, res) => { 
  try {
    const db = client.db("users");
    const usersCollection = db.collection("users");

    // Validate the id parameter
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).send('Invalid user ID');
      return;
    }

    const updateData = {};
    if (req.body.firstname) updateData.firstname = req.body.firstname;
    if (req.body.lastname) updateData.lastname = req.body.lastname;
    if (req.body.login) updateData.login = req.body.login;
    if (req.body.password) updateData.password = req.body.password;
    if (req.body.passwordhint) updateData.passwordhint = req.body.passwordhint;
    if (req.body.email) updateData.email = req.body.email;

    const result = await usersCollection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updateData });
    if (result.matchedCount === 0) {
      res.status(404).send('User not found');
      return;
    }
    res.status(200).send('User updated');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error updating user');
  }
});

// Wordslist database
/*app.post('/newcard', async (req, res) => {
  try {
    const { frontside, backside, userId } = req.body;
    if (!ObjectId.isValid(userId)) {
      res.status(400).send('Invalid user ID');
      return;
    }

    const db = client.db("flashcards");
    const cardsCollection = db.collection("cards");
    const creationDate = new Date();
    const result = await cardsCollection.insertOne({ frontside, backside, creationdate: creationDate, createdby: userId });
    res.status(201).send(`Card created with id: ${result.insertedId}`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating a card');
  }
});

app.get('/cards/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const dbUsers = client.db("users");
    const usersCollection = dbUsers.collection("users");
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    const dbFlashcards = client.db("flashcards");
    const cardsCollection = dbFlashcards.collection("cards");
    const cards = await cardsCollection.find({ createdby: user._id }).toArray();
    res.status(200).json(cards);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error getting cards');
  }
});*/

app.post('/newcard', async (req, res) => {
  try {
    const { frontside, backside } = req.body;
    // Implement authentication and authorization to get the current user's login
    const userLogin = req.authenticatedUser.login; // or however you implement auth
    const db = flashcardsClient.db("flashcards");
    const cardsCollection = db.collection("cards");
    const creationDate = new Date();
    const result = await cardsCollection.insertOne({ frontside, backside, createdby: userLogin, creationdate: creationDate });
    res.status(201).send(`Card created with id: ${result.insertedId}`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating card');
  }
});

app.patch('/card/:id', async (req, res) => { 
  try {
    const db = flashcardsClient.db("flashcards");
    const cardsCollection = db.collection("cards");

    // Validate the id parameter
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).send('Invalid card ID');
      return;
    }

    const updateData = {};
    if (req.body.frontside) updateData.frontside = req.body.frontside;
    if (req.body.backside) updateData.backside = req.body.backside;

    const result = await cardsCollection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updateData });
    if (result.matchedCount === 0) {
      res.status(404).send('Card not found');
      return;
    }
    res.status(200).send('Card updated');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error updating Card');
  }
});

app.delete('/deletecard/:id', async (req, res) => {
  try {
    const db = flashcardsClient.db("flashcards");
    const cardsCollection = db.collection("cards");
    const result = await cardsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      res.status(404).send('Card not found');
      return;
    }
    res.status(200).send('Card deleted');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error deleting card');
  }
});


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`)
})