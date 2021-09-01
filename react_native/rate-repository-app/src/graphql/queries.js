import { gql } from '@apollo/client';

export const allRepos = gql`
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
