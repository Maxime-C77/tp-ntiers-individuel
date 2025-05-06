
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://maxime:dmxJQLiK0eyzZ6vb@tp.5rrgnek.mongodb.net/info', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send(user);
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(401).send('Invalid credentials');
  const token = jwt.sign({ id: user._id }, 'secret');
  res.send({ token });
});

app.listen(4001, () => console.log('User Service on 4001'));
