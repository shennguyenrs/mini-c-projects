const queries = {
  countRepositories: () => countRepositories(),
  allRepositories: () => allRepositories(),
  me: () => currentUser(),
};

module.exports = queries;
