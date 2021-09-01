import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { colors, shadow } from '../styles/base';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
  },
  inforContainer__onright: {
    marginLeft: 20,
    maxWidth: '75%',
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

const infoContainer = ({ fullname, description, language }) => {
  return (
    <View style={styles.inforContainer__onright}>
      <Text style={styles.fullname}>{fullname}</Text>
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
    <View style={[shadow.shadow, styles.container]}>
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
