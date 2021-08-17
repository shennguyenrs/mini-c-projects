import React from 'react';
import { FlatList } from 'react-native';

// Database
import db from '../sampleDB/repositories';

// Components
import RenderItems from '../components/RenderItems';

// Styles
import { view } from '../styles/base';

const RepositoriesList = () => {
  return <FlatList data={db} renderItem={RenderItems} style={view.container} />;
};

export default RepositoriesList;
