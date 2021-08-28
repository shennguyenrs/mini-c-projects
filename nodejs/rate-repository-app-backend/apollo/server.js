const { ApolloServer } = require('apollo-server');

const typeDefs = require('./typeDefs.js');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = server;
