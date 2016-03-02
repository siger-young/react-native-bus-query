import {
  StyleSheet,
} from 'react-native';

import { globalStyles } from '../global.styles';

const localStyles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#303F9F',
  },
  brand: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  start: {
    padding: 10,
    backgroundColor: '#CDDC39',
  },
  footerText: {
    flex: 1,
    alignSelf: 'flex-end',
    color: 'white',
    fontSize: 20,
  }
});
export default {
  ...globalStyles,
  ...localStyles,
};
