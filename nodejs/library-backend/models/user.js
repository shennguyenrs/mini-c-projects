const { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const connection = require('../utils/connection');

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  favoriteGenre: {
    type: String,
  },
});

schema.plugin(uniqueValidator);
module.exports = connection.model('User', schema);
