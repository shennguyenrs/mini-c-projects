import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      value
    }
  }
`;

export const LOGIN = gql`
  mutation signIn($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
