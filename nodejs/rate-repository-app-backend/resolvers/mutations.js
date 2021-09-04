const { UserInputError } = require('apollo-server');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const { SERECT_KEY } = require('../utils/config');

const createUser = async (_root, args) => {
  const saltRound = 10;
  const hashPW = await bcrypt.hash(args.password, saltRound);

  const newUser = new User({
    username: args.username,
    email: args.email,
    password: hashPW,
  });

  const savedUser = await newUser.save();

  const userForToken = {
    email: savedUser.email,
    id: savedUser._id,
  };

  return { value: jwt.sign(userForToken, SERECT_KEY) };
};

const login = async (_root, args) => {
  const foundUser = await User.findOne({ email: args.email });

  if (!foundUser) throw new UserInputError('Wrong email');

  const validPW = await bcrypt.compare(args.password, foundUser.password);

  if (!validPW) throw new UserInputError('Wrong password');

  const userForToken = {
    email: foundUser.email,
    id: foundUser._id,
  };

  return { value: jwt.sign(userForToken, SERECT_KEY) };
};

const mutations = {
  createUser: (root, args) => createUser(root, args),
  login: (root, args) => login(root, args),
};

module.exports = mutations;
