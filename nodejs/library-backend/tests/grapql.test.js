const connection = require('../utils/connection');
const server = require('../apollo/server');

// Sample databases
const { addAuthors, addBooks } = require('../utils/addSamples');
const { cleanSamples } = require('../utils/cleanSamples');

// Prepare database for testing
beforeAll(async () => {
  await addAuthors();
  await addBooks();
});

// Close connection after tests
// and clean the database
afterAll(async () => {
  await cleanSamples();
  connection.close();
});

describe('Queries testing', () => {
  it('Should return 5 for authorsCount and 7 for booksCount', async () => {
    const query = `
		{
			authorsCount,
			booksCount
		}`;

    const queryResult = await server.executeOperation({
      query: query,
    });

    expect(queryResult.data.authorsCount).toBe(5);
    expect(queryResult.data.booksCount).toBe(7);
  });

  it('Should return 5 objects for allAuthors', async () => {
    const query = `{ allAuthors { name }}`;

    const queryResult = await server.executeOperation({ query: query });

    expect(queryResult.data.allAuthors.length).toBe(5);
  });

  it('Should return 3 objects for allAuthors who have born', async () => {
    const query = `{ allAuthors(born: Yes) { name }}`;

    const queryResult = await server.executeOperation({ query: query });

    expect(queryResult.data.allAuthors.length).toBe(3);
  });

  it('Should return 2 for allAuthors who do not have born', async () => {
    const query = `{ allAuthors(born: No) { name }}`;

    const queryResult = await server.executeOperation({ query: query });

    expect(queryResult.data.allAuthors.length).toBe(2);
  });

  it('Should return 7 for allBooks', async () => {
    const query = `{ allBooks { title }}`;

    const queryResult = await server.executeOperation({ query: query });

    expect(queryResult.data.allBooks.length).toBe(7);
  });

  it('Should return 2 for allBooks filter by author', async () => {
    const query = `{ allBooks(author: "Robert Martin") { title }}`;

    const queryResult = await server.executeOperation({ query: query });

    expect(queryResult.data.allBooks.length).toBe(2);
  });

  it('Should return 4 for allBooks filter by genre', async () => {
    const query = `{ allBooks(genre: "refactoring") { title, genres }}`;

    const queryResult = await server.executeOperation({ query: query });

    expect(queryResult.data.allBooks.length).toBe(4);
  });

  it('Should return 1 for allBooks filter by author and genre', async () => {
    const query = `{ allBooks(author: "Robert Martin", genre: "refactoring") { title }}`;

    const queryResult = await server.executeOperation({ query: query });

    expect(queryResult.data.allBooks.length).toBe(1);
  });
});

describe('Author Testing', () => {
  it('Should return booksCount of authors', () => {
    const query = `{
			allAuthors {
				name
				booksCount
			}
		}`;

    const queryResult = server.executeOperation({ query: query });

    console.log(queryResult);
  });
});
