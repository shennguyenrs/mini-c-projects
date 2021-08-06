const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');

// TypeDefs
const typeDefs = require('./typeDefs');

// Resolvers
const queries = require('../resolvers/queries');
const authors = require('../resolvers/authors');
const mutations = require('../resolvers/mutations');

const { SERECT_KEY } = require('../utils/config');

const User = require('../models/user');

const resolvers = {
  Query: queries,
  Author: authors,
  Mutation: mutations,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth) {
      const decoded = jwt.verify(auth, SERECT_KEY);
      const currentUser = await User.findOne(decoded.id);
      return { currentUser };
    }
  },
});

module.exports = server;
