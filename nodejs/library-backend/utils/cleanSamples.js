// Models
const Author = require('../models/author');
const Book = require('../models/book');
const User = require('../models/user');

const cleanSamples = async () => {
  await Author.deleteMany({});
  await Book.deleteMany({});
  await User.deleteMany({});
};

module.exports = { cleanSamples };
