import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const apolloClient = (localStorage) => {
  const authLink = setContext(async (_req, { headers }) => {
    try {
      const token = await localStorage.getAccessToken();

      return {
        headers: {
          ...headers,
          authorization: token ? `bearer ${token}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return headers;
    }
  });

  const httpLink = new createHttpLink({
    uri: Constants.manifest.extra.BACKEND_URI,
  });

  const cache = new InMemoryCache();

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
  });
};

export default apolloClient;
