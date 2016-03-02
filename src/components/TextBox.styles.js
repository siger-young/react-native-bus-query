import {
  StyleSheet,
} from 'react-native';

import { colors, globalStyles } from '../global.styles';


const localStyles = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor: colors.dark,
  }
});
export default {
  ...globalStyles,
  ...localStyles,
};
