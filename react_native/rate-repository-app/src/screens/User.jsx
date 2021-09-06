import React from 'react';
import { useApolloClient } from '@apollo/client';
import { View, Text, Pressable } from 'react-native';
import { useQuery } from '@apollo/client';

// Import styles
import { shadow, container } from '../styles/base';
import button from '../styles/button';

// Import hooks
import useAuthStorage from '../hooks/useAuthStorage';

// Import queries
import { CURRENT_USER } from '../graphql/queries';

// Import utils
import * as tokenUtils from '../utils/tokenUtils';

const User = ({ setToken }) => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();
  const { data, loading } = useQuery(CURRENT_USER, {
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = () => {
    // Clear all states and storages on logout
    setToken(null);
    client.clearStore();
    tokenUtils.removeTokenInLocal(authStorage);
  };

  if (loading)
    return (
      <View style={container.center}>
        <Text>Loading data...</Text>
      </View>
    );

  return (
    <View style={container.center}>
      <Text>Username: {data.me.username}</Text>
      <Text>Email: {data.me.email}</Text>
      <Pressable
        onPress={handleSubmit}
        style={[button.container, shadow.shadow]}
      >
        <Text style={[button.text]}>Sign Out</Text>
      </Pressable>
    </View>
  );
};

export default User;
