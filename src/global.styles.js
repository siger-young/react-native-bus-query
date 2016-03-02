import {
  StyleSheet,
} from 'react-native';

export const colors = {
  dark: '#303F9F',
  primary: '#3F51B5',
  light: '#C5CAE9',
  primaryText: '#212121',
  text: '#FFFFFF',
  divider: '#B6B6B6',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
