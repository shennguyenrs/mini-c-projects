import React from 'react';
import { useApolloClient } from '@apollo/client';
import { View, Text, Pressable } from 'react-native';

// Import styles
import { shadow, container } from '../styles/base';
import button from '../styles/button';

// Import hooks
import useAuthStorage from '../hooks/useAuthStorage';

// Import utils
import * as tokenUtils from '../utils/tokenUtils';

const User = ({ setToken }) => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();

  const handleSubmit = () => {
    // Clear all states and storages on logout
    setToken(null);
    client.clearStore();
    tokenUtils.removeToken(authStorage);
  };
  return (
    <>
      <View style={container.center}>
        <Text>Current User</Text>
        <Pressable
          onPress={handleSubmit}
          style={[button.container, shadow.shadow]}
        >
          <Text style={[button.text]}>Sign Out</Text>
        </Pressable>
      </View>
    </>
  );
};

export default User;
