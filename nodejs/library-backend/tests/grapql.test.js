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

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

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
    expect(queryResult.errors).toBeUndefined();
  });

  it('Should return 5 objects and 5 properties on each for allAuthors', async () => {
    const query = `{ allAuthors { name, born, booksCount, id  }}`;

    const queryResult = await server.executeOperation({ query: query });

    const lenObjects = queryResult.data.allAuthors.length;
    const firstResult = queryResult.data.allAuthors[getRandomInt(lenObjects)];
    const lenProperties = Object.keys(firstResult).length;

    expect(lenObjects).toBe(5);
    expect(lenProperties).toBe(4);
    expect(queryResult.errors).toBeUndefined();
  });

  it('Should return 3 objects for allAuthors who have born', async () => {
    const query = `{ allAuthors(born: Yes) { name }}`;

    const queryResult = await server.executeOperation({ query: query });

    expect(queryResult.data.allAuthors.length).toBe(3);
    expect(queryResult.data.allAuthors).toContainEqual({
      name: 'Robert Martin',
    });
    expect(queryResult.errors).toBeUndefined();
  });

  it('Should return 2 for allAuthors who do not have born', async () => {
    const query = `{ allAuthors(born: No) { name }}`;

    const queryResult = await server.executeOperation({ query: query });

    expect(queryResult.data.allAuthors.length).toBe(2);
    expect(queryResult.data.allAuthors).toContainEqual({ name: 'Sandi Metz' });
    expect(queryResult.errors).toBeUndefined();
  });

  it('Should return 7 objects and 5 properties on each for allBooks', async () => {
    const query = `{ allBooks { title, published, author, genres, id }}`;

    const queryResult = await server.executeOperation({ query: query });

    const lenObjects = queryResult.data.allBooks.length;
    const firstResult = queryResult.data.allBooks[getRandomInt(lenObjects)];
    const lenProperties = Object.keys(firstResult).length;

    expect(lenObjects).toBe(7);
    expect(lenProperties).toBe(5);
    expect(queryResult.errors).toBeUndefined();
  });

  it('Should return 2 for allBooks filter by author', async () => {
    const query = `{ allBooks(author: "Robert Martin") { title }}`;

    const queryResult = await server.executeOperation({ query: query });

    expect(queryResult.data.allBooks.length).toBe(2);
    expect(queryResult.data.allBooks).toContainEqual({ title: 'Clean Code' });
    expect(queryResult.errors).toBeUndefined();
  });

  it('Should return 4 for allBooks filter by genre', async () => {
    const query = `{ allBooks(genre: "refactoring") { title }}`;

    const queryResult = await server.executeOperation({ query: query });

    expect(queryResult.data.allBooks.length).toBe(4);
    expect(queryResult.data.allBooks).toContainEqual({ title: 'Clean Code' });
    expect(queryResult.errors).toBeUndefined();
  });

  it('Should return 1 for allBooks filter by author and genre', async () => {
    const query = `{ allBooks(author: "Robert Martin", genre: "refactoring") { title }}`;

    const queryResult = await server.executeOperation({ query: query });

    expect(queryResult.data.allBooks.length).toBe(1);
    expect(queryResult.data.allBooks).toContainEqual({ title: 'Clean Code' });
    expect(queryResult.errors).toBeUndefined();
  });
});

describe('Author Testing', () => {
  it('Should return booksCount of authors', async () => {
    const query = `{
			allAuthors {
				name
				booksCount
			}
		}`;

    const queryResult = await server.executeOperation({ query: query });

    const expectedFirstResult = { name: 'Robert Martin', booksCount: 2 };

    // Using toContainEqual to compare objects
    expect(queryResult.data.allAuthors).toContainEqual(expectedFirstResult);
    expect(queryResult.errors).toBeUndefined();
  });
});

describe('Mutation Testing', () => {
  it('Should return added book', async () => {
    const mutation = `mutation {
			addBook(
				title: "A new testing book"
				published: 2021
				author: "Tester Author"
				genres: ["testing"]
			) {
				title
				published
				author
				genres
				id
			}
		}`;

    const queryResult = await server.executeOperation({ query: mutation });
    const savedBook = queryResult.data.addBook;
    const lenProperties = Object.keys(savedBook).length;

    expect(savedBook.title).toBe('A new testing book');
    expect(savedBook.author).toBe('Tester Author');
    expect(lenProperties).toBe(5);
    expect(queryResult.errors).toBeUndefined();
  });

  it('Should return edited author', async () => {
    const mutation = `mutation {
			editAuthor (
				name: "Sandi Metz",
				setBornTo: 1942
			) {
				born
			}
		}`;

    const queryResult = await server.executeOperation({ query: mutation });
    const data = queryResult.data.editAuthor;

    expect(data.born).toBe(1942);
    expect(queryResult.errors).toBeUndefined();
  });

  it('Should return saved user', async () => {
    const mutation = `mutation {
			createUser (
				username: "tester",
				password: "qwerty24680?"
			) {
				username
				password
				favoriteGenre
			}
		}`;

    const queryResult = await server.executeOperation({
      query: mutation,
    });

    const data = queryResult.data.createUser;
    expect(data.username).toBe('tester');
    expect(queryResult.errors).toBeUndefined();
  });

  it('Should return token for signed user', async () => {
    const mutation = `mutation {
			login (
				username: "tester",
				password: "qwerty24680?"
			) {
				value
			}
		}`;

    const queryResult = await server.executeOperation({
      query: mutation,
    });

    expect(queryResult.data.login).not.toBeNull();
  });
});
