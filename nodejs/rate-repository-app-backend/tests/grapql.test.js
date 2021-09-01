const db = require('../utils/connection');
const server = require('../apollo/server');

const { addRepos } = require('../utils/addSamples');
const { cleanSamples } = require('../utils/cleanSamples');

beforeAll(async () => {
  await addRepos();
});

afterAll(async () => {
  await cleanSamples();
  db.close();
});

describe('Queries testing', () => {
  it('Should return 4 when count repositories', async () => {
    const query = `{ countRepositories }`;
    const queryResult = await server.executeOperation({ query: query });

    expect(queryResult.data.countRepositories).toBe(4);
  });
});
