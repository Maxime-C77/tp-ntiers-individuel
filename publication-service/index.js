
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://maxime:dmxJQLiK0eyzZ6vb@tp.5rrgnek.mongodb.net/info', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const publicationSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Publication = mongoose.model('Publication', publicationSchema);

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send('Unauthorized');
  try {
    jwt.verify(token.split(' ')[1], 'secret');
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
}

app.post('/create', authMiddleware, async (req, res) => {
  const pub = new Publication(req.body);
  await pub.save();
  res.status(201).send(pub);
});

app.get('/all', async (req, res) => {
  const pubs = await Publication.find();
  res.send(pubs);
});

app.get('/:id', async (req, res) => {
  const pub = await Publication.findById(req.params.id);
  res.send(pub);
});

app.put('/edit/:id', authMiddleware, async (req, res) => {
  const pub = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(pub);
});

app.delete('/delete/:id', authMiddleware, async (req, res) => {
  await Publication.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.listen(4002, () => console.log('Publication Service on 4002'));
