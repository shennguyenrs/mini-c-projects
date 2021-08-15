import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image } from 'react-native';

import { colors } from '../styles/base';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
    boxShadow: '5px 5px 8px rgba(0, 0, 0, .2)',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
  },
  inforContainer__onright: {
    marginLeft: 20,
    maxWidth: '80%',
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 6,
  },
  fullname: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: colors.darkGrey,
    marginBottom: 8,
  },
  languageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  language: {
    color: colors.white,
    backgroundColor: colors.blue,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 3,
  },
  statisticsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
  },
  number: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  tag: {
    color: colors.darkGrey,
  },
});

const infoContainer = ({ fullName, description, language }) => {
  return (
    <View style={styles.inforContainer__onright}>
      <Text style={styles.fullname}>{fullName}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.languageContainer}>
        <Text style={styles.language}>{language}</Text>
      </View>
    </View>
  );
};

const statisticsContainer = (number, tag) => {
  const simplifyNumber = Number(number / 1000).toFixed(1);

  return (
    <View>
      <Text style={styles.number}>
        {number > 1000 ? String(simplifyNumber).concat('k') : number}
      </Text>
      <Text style={styles.tag}>{tag}</Text>
    </View>
  );
};

const RenderItems = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        {infoContainer(item)}
      </View>
      <View style={styles.statisticsContainer}>
        {statisticsContainer(item.stargazersCount, 'Stars')}
        {statisticsContainer(item.forksCount, 'Forks')}
        {statisticsContainer(item.reviewCount, 'Reviews')}
        {statisticsContainer(item.ratingAverage, 'Rating')}
      </View>
    </View>
  );
};

export default RenderItems;

// Props Validation
RenderItems.propTypes = {
  item: PropTypes.array,
};
