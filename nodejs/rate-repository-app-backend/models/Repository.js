const { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const connection = require('../utils/connection');

const schema = new Schema({
  id: {
    type: String,
    require: true,
  },
  fullname: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  language: {
    type: String,
    require: true,
  },
  forksCount: {
    type: Number,
    require: true,
  },
  stargazersCount: { type: Number, require: true },
  reviewCount: { type: Number, require: true },
  ownerAvatarUrl: { type: Number, require: true },
});

schema.plugin(uniqueValidator);
module.exports = connection.model('Repository', schema);
