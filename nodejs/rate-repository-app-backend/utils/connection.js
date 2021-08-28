const mongoose = require('mongoose');
const { MONGO_URI } = require('./config.js');

const db = mongoose.createConnection(MONGO_URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = db;
