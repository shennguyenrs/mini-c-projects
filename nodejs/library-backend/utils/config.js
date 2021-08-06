const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI;
const SERECT_KEY = process.env.SERECT_KEY;

module.exports = {
  MONGO_URI,
  SERECT_KEY,
};
