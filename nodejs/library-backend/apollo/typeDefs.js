const { gql } = require('apollo-server');

const typeDefs = gql`
  enum YesNo {
    Yes
    No
  }
  type Author {
    name: String!
    born: Int
    id: ID!
    booksCount: Int!
  }
  type Book {
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
    id: ID!
  }
  type User {
    username: String!
    password: String!
    favoriteGenre: String
    id: ID!
  }
  type Query {
    authorsCount: Int!
    booksCount: Int!
    allAuthors(born: YesNo): [Author!]!
    allBooks(author: String, genre: String): [Book!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    addAuthor(name: String!, born: Int): Author
    editAuthor(name: String!, setBornTo: Int!): Author
    addUser(username: String!, password: String!, favoriteGenre: String!): User
  }
`;

module.exports = typeDefs;
