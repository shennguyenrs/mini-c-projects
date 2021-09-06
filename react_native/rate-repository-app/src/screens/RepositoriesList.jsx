import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';

// Import Components
import RenderItems from '../components/RenderItems';

// Import queries
import { ALL_REPOS } from '../graphql/queries';

// Import styles
import { container } from '../styles/base';

const RepositoriesList = () => {
  const { data, loading } = useQuery(ALL_REPOS, {
    onError: (error) => {
      console.log(error);
    },
  });

  if (loading)
    return (
      <View style={container.center}>
        <Text>Loading data...</Text>
      </View>
    );

  return (
    <FlatList
      data={data ? data.allRepositories : []}
      renderItem={RenderItems}
    />
  );
};

export default RepositoriesList;
