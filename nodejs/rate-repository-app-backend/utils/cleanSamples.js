const Repository = require('../models/Repository');

const cleanSamples = async () => {
  await Repository.deleteMany({});
};

module.exports = { cleanSamples };
