import React from 'react';
import { ApolloProvider } from '@apollo/client';

import Main from './src/Main';

// Import utils
import AuthStorage from './src/utils/authStorage';
import apolloClient from './src/utils/apolloClient';
import AuthStorageContext from './src/contexts/AuthStorageContext';

// Create local storage
const localStorage = new AuthStorage();

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={localStorage}>
        <Main />
      </AuthStorageContext.Provider>
    </ApolloProvider>
  );
}
