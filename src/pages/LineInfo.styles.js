import {
  StyleSheet,
} from 'react-native';

import { colors, globalStyles } from '../global.styles';

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: colors.light,
  },
  content: {
    flex: 1,
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
