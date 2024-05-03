// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://umesh:umesh@demotraining.fv2jyua.mongodb.net/?appName=demotraining')
.then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Models
const Entry = require('./models/entry');

// Middleware
app.use(bodyParser.json());

// Routes

// Create a new entry
app.post('/api/entries', (req, res) => {
  const { parentName, parentContact, grade, classesMode } = req.body;
  const newEntry = new Entry({
    parentName,
    parentContact,
    grade,
    classesMode
  });
  newEntry.save()
    .then(entry => res.json(entry))
    .catch(err => console.log(err));
});

// Get all entries
app.get('/api/entries', (req, res) => {
  Entry.find()
    .then(entries => res.json(entries))
    .catch(err => console.log(err));
});

// Get single entry
app.get('/api/entries/:id', (req, res) => {
  Entry.findById(req.params.id)
    .then(entry => res.json(entry))
    .catch(err => console.log(err));
});

// Update an entry
app.patch('/api/entries/:id', (req, res) => {
  Entry.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(entry => res.json(entry))
    .catch(err => console.log(err));
});

// Delete an entry
app.delete('/api/entries/:id', (req, res) => {
  Entry.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Entry deleted successfully' }))
    .catch(err => console.log(err));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
