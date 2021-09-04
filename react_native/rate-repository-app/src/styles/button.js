import { StyleSheet } from 'react-native';

// Import base style
import { colors } from './base';

const button = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    fontWeight: 'bold',
    backgroundColor: colors.blue,
    borderRadius: 30,
    maxHeight: 40,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  text: {
    color: colors.white,
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default button;
