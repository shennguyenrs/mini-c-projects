import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingTop: 40,
    paddingLeft: 10,
    backgroundColor: '#24292e',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.text}>Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
