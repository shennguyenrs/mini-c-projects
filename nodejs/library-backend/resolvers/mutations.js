const { UserInputError } = require('apollo-server');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import  Mongo models
const Author = require('../models/author');
const Book = require('../models/book');
const User = require('../models/user');

const { SERECT_KEY } = require('../utils/config');

// Add new book to database
const addBook = async (_root, args) => {
  const foundBook = await Book.findOne({ title: args.title });

  // Check duplicate title
  // and throw new error
  if (foundBook) {
    throw new UserInputError('Title must be unique', {
      invalidArgs: args.title,
    });
  }
  // If not found the author
  // create new author
  let foundAuthor = await Author.findOne({ name: args.author });

  if (!foundAuthor) {
    foundAuthor = new Author({
      name: args.author,
      born: null,
    });

    await foundAuthor.save();
  }

  const book = new Book({ ...args, author: foundAuthor._id });

  await book.save();

  return {
    title: book.title,
    published: book.published,
    author: foundAuthor.name,
    genres: book.genres,
    id: book._id,
  };
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
    born: args.born || null,
  });

  await newAuthor.save();

  return {
    name: newAuthor.name,
    born: newAuthor.born,
  };
};

// Edit author born filter by author name
const editAuthor = async (_root, args) => {
  // setBornTo validation
  if (args.setBornTo <= 0) {
    throw new UserInputError('Author birth year must be larger than 0');
  }

  await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo });

  return Author.findOne({ name: args.name });
};

// Add new user to database
const createUser = async (_root, args) => {
  const saltRound = 10;
  const hashPw = await bcrypt.hash(args.password, saltRound);

  const newUser = new User({
    username: args.username,
    password: hashPw,
    favoriteGenre: args.favoriteGenre || null,
  });

  const savedUser = await newUser.save();

  const userForToken = {
    username: savedUser.name,
    id: savedUser._id,
  };

  return { value: jwt.sign(userForToken, SERECT_KEY) };
};

// Login
const login = async (_root, args) => {
  const foundUser = await User.findOne({ username: args.username });

  // If not found username in database
  if (!foundUser) throw new UserInputError('Wrong username');

  const validPass = await bcrypt.compare(args.password, foundUser.password);

  // If password is not valid
  if (!validPass) throw new UserInputError('Wrong password');

  const userForToken = {
    username: foundUser.name,
    id: foundUser._id,
  };

  return { value: jwt.sign(userForToken, SERECT_KEY) };
};

const mutations = {
  addBook: (root, args) => addBook(root, args),
  addAuthor: (root, args) => addAuthor(root, args),
  editAuthor: (root, args) => editAuthor(root, args),
  createUser: (root, args) => createUser(root, args),
  login: (root, args) => login(root, args),
};

module.exports = mutations;
