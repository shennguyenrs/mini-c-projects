import { gql } from '@apollo/client';

export const ALL_REPOS = gql`
  query {
    allRepositories {
      id
      fullname
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
    }
  }
`;

export const CURRENT_USER = gql`
  query {
    me {
      email
      username
    }
  }
`;
