const dbConnection = require('./utils/connection');
const server = require('./apollo/server');

const Repository = require('./models/Repository');

const { addRepos } = require('./utils/addSamples');

const app = async () => {
  // Mongo db connection
  await dbConnection.on('connected', (err) => {
    if (err) {
      console.log('Failed to connect to MongoDB');
      process.exit(1);
    }

    console.log('Connected to MongoDB');
  });

  // Apollo server
  await server.listen().then(({ url }) => {
    console.log(`Apollo server is running at ${url}`);
  });

  // Check and add sample database
  const initialRepos = await Repository.find({}).countDocuments();

  if (initialRepos === 0) {
    console.log('Not found repositories in database');
    console.log('Adding new samples...');
    await addRepos();
    console.log('Done');
  } else {
    console.log('Found repositories in database');
  }
};

module.exports = app;
