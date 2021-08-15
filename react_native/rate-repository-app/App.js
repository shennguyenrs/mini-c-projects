import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

// Import components
import AppBar from './src/components/AppBar';
import RepositoriesList from './src/components/RepositoriesList';

import { colors } from './src/styles/base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
  },
});

export default function App() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <AppBar />
        <RepositoriesList />
      </View>
    </SafeAreaView>
  );
}
