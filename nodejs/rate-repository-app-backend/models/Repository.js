const { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const connection = require('../utils/connection');

const schema = new Schema({
  id: {
    type: String,
    require: true,
    unique: true,
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
  ratingAverage: { type: Number, require: true },
  reviewCount: { type: Number, require: true },
  ownerAvatarUrl: { type: String, require: true },
});

schema.plugin(uniqueValidator);
module.exports = connection.model('Repository', schema);
