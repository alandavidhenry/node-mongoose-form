const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    title: String,
    firstName: String,
    surname: String,
  });

  module.exports = mongoose.model('Person', PersonSchema); 