import { StyleSheet } from 'react-native';

export const colors = {
  white: '#fff',
  blue: '#0365d0',
  grey: '#e1e5e8',
  darkGrey: '#626262',
  lightBlack: '#24292e',
};

export const appBar = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.lightBlack,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    zIndex: 1,
    position: 'absolute',
    width: '100%',
  },
});

export const view = StyleSheet.create({
  container: {
    /* position: 'relative',
    zIndex: appBar.container.zIndex - 1,
    marginTop: appBar.container.paddingTop + 40, */
  },
});

export const shadow = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 6,
    elevation: 10,
  },
});
