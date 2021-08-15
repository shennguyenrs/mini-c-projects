import React from 'react';
import { FlatList } from 'react-native';

// Database
import db from '../sampleDB/repositories';

// Components
import RenderItems from './RenderItems';

const RepositoriesList = () => {
  return <FlatList data={db} renderItem={RenderItems} />;
};

export default RepositoriesList;
