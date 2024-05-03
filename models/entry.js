// models/entry.js

const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  parentName: {
    type: String,
    required: true
  },
  parentContact: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  classesMode: {
    type: String,
    required: true
  }
});

const Entry = mongoose.model('Entry', EntrySchema);

module.exports = Entry;
