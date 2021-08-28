const dbConnection = require('./utils/connection');

const app = async () => {
  // Mongo db connection
  await dbConnection.on('connected', (err) => {
    if (err) {
      console.log('Failed to connect to MongoDB');
      process.exit(1);
    }

    console.log('Connected to MongoDB');
  });
};

module.exports = app;
