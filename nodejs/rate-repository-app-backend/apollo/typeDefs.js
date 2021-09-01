const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    username: String!
    password: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Repositories {
    id: String!
    fullname: String!
    description: String!
    language: String!
    forksCount: Int!
    stargazersCount: Int!
    ratingAverage: Int!
    reviewCount: Int!
    ownerAvatarUrl: String!
  }
  type Query {
    countRepositories: Int!
    allRepositories: [Repositories]!
    me: User!
  }
  type Mutation {
    createUser(username: String!, password: String!): Token
    login(username: String!, password: String!): Token
  }
`;

module.exports = typeDefs;
