const { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const connection = require('../utils/connection');

const schema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

schema.plugin(uniqueValidator);
module.exports = connection.model('User', schema);
