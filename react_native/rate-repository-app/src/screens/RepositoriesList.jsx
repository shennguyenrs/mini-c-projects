import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';

// Database
import db from '../sampleDB/repositories';

// Components
import RenderItems from '../components/RenderItems';

// Styles
import { view } from '../styles/base';

// Queries
import { allRepos } from '../graphql/queries';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const RepositoriesList = () => {
  const { data, loading } = useQuery(allRepos);

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading data...</Text>
      </View>
    );

  return (
    <FlatList
      data={data.allRepositories}
      renderItem={RenderItems}
      style={view.container}
    />
  );
};

export default RepositoriesList;
