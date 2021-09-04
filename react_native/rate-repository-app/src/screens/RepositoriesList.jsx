import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';

// Components
import RenderItems from '../components/RenderItems';

// Queries
import { ALL_REPOS } from '../graphql/queries';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const RepositoriesList = () => {
  const { data, loading } = useQuery(ALL_REPOS);

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading data...</Text>
      </View>
    );

  return <FlatList data={data.allRepositories} renderItem={RenderItems} />;
};

export default RepositoriesList;
