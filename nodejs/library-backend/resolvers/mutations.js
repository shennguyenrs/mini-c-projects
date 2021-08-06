const { UserInputError } = require('apollo-server');
const bcrypt = require('bcrypt');

// Import  Mongo models
const Author = require('../models/author');
const Book = require('../models/book');
const User = require('../models/user');

// Add new book to database
const addBook = async (_root, args) => {
  const books = await Book.find({});

  // Check duplicate title
  if (books.find((item) => item.title === args.title)) {
    throw new UserInputError('Title must be unique', {
      invalidArgs: args.title,
    });
  }

  const book = { ...args };

  await Book.save(book);

  return book;
};

// Add new author
const addAuthor = async (_root, args) => {
  // Check duplidate
  const foundAuthor = await Author.findOne({ name: args.name });

  if (foundAuthor) {
    throw new UserInputError('Author must be unique', {
      invalidArgs: args.name,
    });
  }

  const newAuthor = new Author({
    name: args.name,
    born: args.born ? args.born : null,
  });
  const savedAuthor = newAuthor.save();
  return savedAuthor;
};

// Edit author born filter by author name
const editAuthor = async (_root, args) => {
  const updatedAuthor = await Author.findOneAndUpdate(
    { name: args.name },
    { born: args.setBornTo }
  );

  return updatedAuthor;
};

// Add new user to database
const addUser = async (_root, args) => {
  const saltRound = 10;
  const hashPw = await bcrypt.hash(args.password, saltRound);
  const newUser = new User({
    username: args.username,
    password: hashPw,
    favoriteGenre: args.favoriteGenre,
  });

  const savedUser = await newUser.save();
  return savedUser;
};

const mutations = {
  addBook: (root, args) => addBook(root, args),
  addAuthor: (root, args) => addAuthor(root, args),
  editAuthor: (root, args) => editAuthor(root, args),
  addUser: (root, args) => addUser(root, args),
};

module.exports = mutations;
