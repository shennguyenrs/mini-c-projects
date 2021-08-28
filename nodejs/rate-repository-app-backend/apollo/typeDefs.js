const { gql } = require('apollo-server');

const typeDefs = gql`
  type Token {
    value: String!
  }
  type User {
    username: String!
    password: String!
    id: ID!
  }
  type Repositories {
    id: String!
    fullName: String!
    description: String!
    language: String!
    forksCount: Int!
    stargazersCount: Int!
    reviewCount: Int!
    ownerAvatarUrl: String!
  }
  type Query {
    countRepositories: Int!
    allRepositories: [Repositories]!
    me: User!
  }
  type Mutation {
    login(username: String!, password: String!): Token
  }
`;

module.exports = typeDefs;
