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

  const refinedBooks = books.map(
    (item) =>
      new Object({
        title: item.title,
        published: item.published,
        author: item.author.name,
        genres: item.genres,
        id: item._id,
      })
  );

  if (!args.author && !args.genre) return refinedBooks;

  if (args.author && !args.genre)
    return refinedBooks.filter((item) => item.author === args.author);

  if (!args.author && args.genre)
    // Using includes to check if the item is in array
    // the method return boolean
    return refinedBooks.filter((item) => item.genres.includes(args.genre));

  return refinedBooks.filter(
    (item) => item.author === args.author && item.genres.includes(args.genre)
  );
};

const returnMe = (_root, _args, context) => context.currentUser;

// Final queries function
const queries = {
  authorsCount: () => authorsCount(),
  booksCount: () => booksCount(),
  allAuthors: (root, args) => allAuthors(root, args),
  allBooks: (root, args) => allBooks(root, args),
  me: (root, args, context) => returnMe(root, args, context),
};

module.exports = queries;
