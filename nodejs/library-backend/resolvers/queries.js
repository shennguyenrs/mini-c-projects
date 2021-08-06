// Mongo models
const Author = require('../models/author');
const Book = require('../models/book');

// Queries functions
// Count all the authors
const authorsCount = async () => await Author.find({}).countDocuments();

// Count all the books
const booksCount = async () => await Book.find({}).countDocuments();

// Return all the authors information
// if parameters recevied to filter authors with born is not null
// return authors with born is not null
// or vice versa
const allAuthors = async (_root, args) => {
  const authors = await Author.find({});

  if (!args.born) return authors;

  const byBorn = (author) => (args.born === 'Yes' ? author.born : !author.born);

  return authors.filter(byBorn);
};

// Return all books information
// there are parameters to filter books by author or by genre
const allBooks = async (_root, args) => {
  const books = await Book.find({}).populate({ path: 'author' });

  if (!args.author && !args.genre) return books;

  if (args.author && !args.genre)
    return books.filter((item) => item.author.name === args.author);

  if (!args.author && args.genre)
    // Using includes to check if the item is in array
    // the method return boolean
    return books.filter((item) => item.genres.includes(args.genre));

  return books.filter(
    (item) =>
      item.author.name === args.author && item.genres.includes(args.genre)
  );
};

// Final queries function
const queries = {
  authorsCount: () => authorsCount(),
  booksCount: () => booksCount(),
  allAuthors: (root, args) => allAuthors(root, args),
  allBooks: (root, args) => allBooks(root, args),
};

module.exports = queries;
