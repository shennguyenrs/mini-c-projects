const server = require('./apollo/server');
const connection = require('./utils/connection');

const app = async () => {
  // Connect to MongoDB
  await connection.on('connected', (err) => {
    if (err) {
      console.log('Failed to connect to MongoDB');
      process.exit(1);
    }

    console.log('Connected to MongoDB');
  });

  // Start Apollo server
  server.listen().then(({ url }) => {
    console.log(`Apollo server ready at ${url}`);
  });
};

module.exports = app;
