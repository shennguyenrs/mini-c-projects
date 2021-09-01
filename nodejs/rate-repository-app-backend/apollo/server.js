const { ApolloServer } = require('apollo-server');

const jwt = require('jsonwebtoken');

const User = require('../models/User');

const { SERECT_KEY } = require('../models/User');

const typeDefs = require('./typeDefs.js');

const queries = require('../resolvers/queries');
const mutations = require('../resolvers/mutations');

const resolvers = {
  Query: queries,
  Mutation: mutations,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decoded = jwt.verify(auth.substring(7), SERECT_KEY);
      const currentUser = await User.findOne({ _id: decoded.id });
      return { currentUser };
    }
  },
});

module.exports = server;
