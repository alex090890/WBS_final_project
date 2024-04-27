import express from 'express';
import { config } from 'dotenv';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';



config();
const jwtSecret = process.env.SECRET_KEY;

console.log(jwtSecret);

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
app.use(cors());
app.use(bodyParser.json());



// Создание токена
const token = jwt.sign({ user_id: '123' }, jwtSecret);

// Проверка токена
jwt.verify(token, jwtSecret, (err, decoded) => {
  if (err) {
    console.log('Token verification failed');
  } else {
    console.log('Token verified successfully');
  }
});

//Userslist database


app.post('/newuser', async (req, res) => {
  try {
    const { firstname, lastname, login, password, passwordhint, email } = req.body;
    const db = client.db("users");
    const usersCollection = db.collection("users");
    const existingUser = await usersCollection.findOne({ $or: [{ login }, { email }] });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (existingUser) {
      return res.status(400).send('Login or email already in use');
    }

    const creationDate = new Date();
    const result = await usersCollection.insertOne({ firstname, lastname, login, password: hashedPassword, passwordhint, email, creationdate: creationDate });
    res.status(201).send(`User created with id: ${result.insertedId}`);
} catch (err) {
    console.log(err);
    res.status(500).send('Error creating user');
  }
});

app.get('/users', async (req, res) => {
  try {
    if (!client.topology.isConnected()) await client.connect();
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

app.get('/userinfo/:login', async (req, res) => {
  try {
    const db = client.db("users");
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ login: req.params.login }, {
      projection: { _id: 0 }
    });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    res.json(user); // Send the entire user object back!
  } catch (err) {
    console.log(err);
    res.status(400).send('Error getting user');
  }
});


app.post('/login', async (req, res) => {
  try {
    const db = client.db("users");
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ login: req.body.login });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    // Check the password
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
      res.status(401).send('Invalid password');
      return;
    }

    // Generate a JWT
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send({ token }); // Send the JWT token
  } catch (err) {
    console.log(err);
    res.status(400).send('Error logging in');
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



app.get('/', (req, res) => {
  res.send('Welcome to the WordWeb database')
});

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`)
})