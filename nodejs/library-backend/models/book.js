const { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const connection = require('../utils/connection');

const schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
  },
  published: {
    type: Number,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: {
    type: [String],
    required: true,
  },
});

schema.plugin(uniqueValidator);
module.exports = connection.model('Book', schema);
