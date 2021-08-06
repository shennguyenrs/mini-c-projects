const mongoose = require('mongoose');

const { MONGO_URI } = require('./config');

// Connect to MongoDB
// Use createConnection() to return a connection instace as a variable
// otherwis, use connect() to return thr global mongoose instance
const db = mongoose.createConnection(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
});

module.exports = db;
