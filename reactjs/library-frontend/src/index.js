import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('user-token');

  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({ uri: 'http://192.168.3.15:4000' });
const cache = new InMemoryCache();

const client = new ApolloClient({
  cache: cache,
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
