const { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const connection = require('../utils/connection');

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
  },
  born: {
    type: Number,
  },
});

schema.plugin(uniqueValidator);
module.exports = connection.model('Author', schema);
