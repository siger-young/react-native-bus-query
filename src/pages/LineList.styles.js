import {
  StyleSheet,
} from 'react-native';

import { colors, globalStyles } from '../global.styles';

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: colors.light,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  textBox: {
    flex: 1,
    borderWidth: 2,
    height: 50,
    borderColor: colors.divider,
  },
  searchButton: {
    height: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark,
  },
  row: {
    borderBottomWidth: 1,
    borderColor: colors.divider,
  },
  button: {
    padding: 15
  },
  listView: {
    flex: 1,
  },
  rowText: {
    color: colors.primaryText,
    fontSize: 25,
  }
});
export default {
  ...globalStyles,
  ...localStyles,
};
