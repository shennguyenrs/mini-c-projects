import React from 'react';
import { useApolloClient } from '@apollo/client';
import { View, Text, StyleSheet } from 'react-native';

// Import styles
import { shadow, colors } from '../styles/base';

// Import hooks
import useAuthStorage from '../hooks/useAuthStorage';

// Local Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    fontWeight: 'bold',
    backgroundColor: colors.blue,
    borderRadius: 30,
    maxHeight: 40,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: colors.white,
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

const User = ({ navigation, setToken }) => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();

  const handleSubmit = () => {
    // Clear all states and storages on logout
    setToken(null);
    client.clearStore();

    async () => {
      await authStorage.removeAccessToken();
    };

    // Navigate back to Repositories
    navigation.navigate('Repositories');
  };
  return (
    <>
      <View style={styles.container}>
        <Text>Current User</Text>
        <Pressable
          onPress={handleSubmit}
          style={[styles.button, shadow.shadow]}
        >
          <Text style={[styles.buttonText]}>Sign Out</Text>
        </Pressable>
      </View>
    </>
  );
};

export default User;
