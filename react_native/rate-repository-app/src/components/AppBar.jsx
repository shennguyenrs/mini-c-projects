import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Link, useLocation } from 'react-router-native';

import { colors, appBar } from '../styles/base';

const styles = StyleSheet.create({
  link: {
    fontSize: 20,
  },
  __active: {
    color: colors.white,
    fontWeight: 'bold',
  },
  __notActive: {
    color: colors.darkGrey,
  },
});

const NavigationLink = ({ path, children }) => {
  const currentPath = useLocation().pathname;
  let isActive = true;

  if (currentPath !== path) {
    isActive = false;
  }

  const linkStyle = [
    styles.link,
    isActive && styles.__active,
    !isActive && styles.__notActive,
  ];

  return <Text style={linkStyle}>{children}</Text>;
};

const AppBar = () => {
  return (
    <View style={appBar.container}>
      <Pressable>
        <Link to="/" underlayColor={colors.lightBlack}>
          <NavigationLink path="/">Repositories</NavigationLink>
        </Link>
      </Pressable>
      <Pressable>
        <Link to="/sign-in" underlayColor={colors.lightBlack}>
          <NavigationLink path="/sign-in">Sign In</NavigationLink>
        </Link>
      </Pressable>
    </View>
  );
};

export default AppBar;

// Props Validation
NavigationLink.propTypes = {
  path: PropTypes.string,
  children: PropTypes.string,
};
