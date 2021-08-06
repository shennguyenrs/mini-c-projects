// Import mongo models
const Book = require('../models/book');

// Return the book count filter by name of author
const booksCount = async (root) => {
  const books = await Book.find({}).populate({ path: 'author' });

  const filteredBookByAuthor = books.filter(
    (item) => item.author.name === root.name
  );

  return filteredBookByAuthor.length;
};

const authors = {
  booksCount: (root) => booksCount(root),
};

module.exports = authors;
