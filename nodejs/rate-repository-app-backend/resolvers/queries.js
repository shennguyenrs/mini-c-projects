// Import models
const Repository = require('../models/Repository');

// Count all repositories
const countRepositories = async () =>
  await Repository.find({}).countDocuments();

// Return all repositories information
const allRepositories = async () => await Repository.find({});

const queries = {
  countRepositories: () => countRepositories(),
  allRepositories: () => allRepositories(),
  me: (_root, _args, context) => context.currentUser,
};

module.exports = queries;
