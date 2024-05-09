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

app.put('/update/:login', async (req, res) => {
  try {
    const db = client.db("users");
    const usersCollection = db.collection("users");

    // Validate the login parameter
    const user = await usersCollection.findOne({ login: req.params.login });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    const updateData = {};
    if (req.body.firstname) updateData.firstname = req.body.firstname;
    if (req.body.lastname) updateData.lastname = req.body.lastname;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      updateData.password = hashedPassword;
    }
    if (req.body.passwordhint) updateData.passwordhint = req.body.passwordhint;
    if (req.body.email) updateData.email = req.body.email;

    const result = await usersCollection.updateOne({ login: req.params.login }, { $set: updateData });
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

app.patch('/update/:login', async (req, res) => { 
  try {
    const db = client.db("users");
    const usersCollection = db.collection("users");

    // Validate the login parameter
    const user = await usersCollection.findOne({ login: req.params.login });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    const updateData = {};
    if (req.body.firstname) updateData.firstname = req.body.firstname;
    if (req.body.lastname) updateData.lastname = req.body.lastname;
    // Password update functionality
    // if (req.body.password) {
    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //   updateData.password = hashedPassword;
    // }
    if (req.body.email) updateData.email = req.body.email;

    const result = await usersCollection.updateOne({ login: req.params.login }, { $set: updateData });
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

app.patch('/update-password/:login', async (req, res) => {
  try {
    const db = client.db("users");
    const usersCollection = db.collection("users");

    // Validate the login parameter
    const user = await usersCollection.findOne({ login: req.params.login });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate input
    if (!req.body.password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Update password
    const updatedUser = await updatePassword(usersCollection, req.params.login, req.body.password);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated' });
  } catch (err) {
    // Secure logging mechanism
    logger.error(err);
    res.status(500).json({ error: 'Error updating user' });
  }
});

async function updatePassword(usersCollection, login, password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const updateData = { password: hashedPassword };

  const result = await usersCollection.updateOne({ login }, { $set: updateData });
  return result.matchedCount > 0? true : false;
}



app.delete('/delete/:login', async (req, res) => {
  try {
    const db = client.db("users");
    const usersCollection = db.collection("users");
    const result = await usersCollection.deleteOne({ login: req.params.login });
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

app.post('/newcard', async (req, res) => {
  try {
    const { login, front, back, isCardLearned } = req.body;
    const usersDb = client.db("users");
    const usersCollection = usersDb.collection("users");
    const user = await usersCollection.findOne({ login });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const flashcardsDb = client.db("flashcards");
    const cardsCollection = flashcardsDb.collection("cards");
    const creationDate = new Date();
    const day = creationDate.getDate();
    const month = creationDate.getMonth() + 1; // months are 0-based, so add 1
    const year = creationDate.getFullYear();
    const formattedCreationDate = `${day}-${month}-${year}`;
    const newCard = { front, back, owner: user.login, creationdate: formattedCreationDate, isCardLearned };
    const result = await cardsCollection.insertOne(newCard);
    res.status(201).send(`Card created with id: ${result.insertedId}, creation date ${formattedCreationDate}`);
    console.log(formattedCreationDate);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating card');
  }
});

app.get('/cards/:login', async (req, res) => {
  try {
    const flashcardsDb = client.db("flashcards");
    const cardsCollection = flashcardsDb.collection("cards");
    const cards = await cardsCollection.find({ owner: req.params.login }).toArray();
    res.status(200).json(cards);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error getting cards');
  }
});

app.get('/cardslist', async (req, res) => {
  try {
    const flashcardsDb = client.db("flashcards");
    const cardsCollection = flashcardsDb.collection("cards");
    const cards = await cardsCollection.find({}).toArray();
    res.status(200).json(cards);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error getting cards');
  }
});

app.patch('/update-card/:id', async (req, res) => {
  try {
    const flashcardsDb = client.db("flashcards");
    const cardsCollection = flashcardsDb.collection("cards");
    const card = await cardsCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!card) {
      res.status(404).send('Card not found');
      return;
    }

    const updateData = {};
    if (req.body.front) updateData.front = req.body.front;
    if (req.body.back) updateData.back = req.body.back;
    if (req.body.isCardLearned !== undefined) {
      updateData.isCardLearned = req.body.isCardLearned;
    }

    const result = await cardsCollection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updateData });
    if (result.matchedCount === 0) {
      res.status(404).send('Card not found');
      return;
    }
    res.status(200).send('Card updated');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error updating card');
  }
});

app.delete('/deleteallcards/:login', (req, res) => {
  try {
    const flashcardsDb = client.db("flashcards");
    const cardsCollection = flashcardsDb.collection("cards");
    cardsCollection.deleteMany({ owner: req.params.login });
    res.status(200).send('Cards deleted');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error deleting cards');
  }
});

app.delete('/deletecard/:id', async (req, res) => {
  try {
    const flashcardsDb = client.db("flashcards");
    const cardsCollection = flashcardsDb.collection("cards");
    const result = await cardsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      res.status(404).send('Card not found');
      return;
    }
    res.status(200).send('Card deleted');
  } catch {
    console.log(err);
    res.status(500).send('Error deleting card');
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the WordWeb database')
});

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`)
})