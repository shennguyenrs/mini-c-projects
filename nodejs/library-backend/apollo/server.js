const { ApolloServer } = require('apollo-server');

// TypeDefs
const typeDefs = require('./typeDefs');

// Resolvers
const queries = require('../resolvers/queries');
const authors = require('../resolvers/authors');
const mutations = require('../resolvers/mutations');

const resolvers = {
  Query: queries,
  Author: authors,
  Mutation: mutations,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = server;
