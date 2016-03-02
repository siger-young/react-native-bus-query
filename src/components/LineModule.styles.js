import {
  StyleSheet,
} from 'react-native';

import { colors, globalStyles } from '../global.styles';


const localStyles = StyleSheet.create({
  loadingView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
  },
  header: {
    //paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: colors.divider,
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  bus: {
    alignItems: 'center',
    flex: 1
  },
  schedule: {
    //alignItems: 'center',
    // flexDirection: 'column',
    // justifyContent: 'center',
  },
  number: {
    color: colors.primaryText,
    fontSize: 50,
  },
  scheduleItem: {
    borderTopWidth: 1,
    borderColor: colors.divider,
    padding: 5,
  },
  scheduleItemText: {
    color: colors.dark,
    textAlign: 'center',
    fontSize: 20,
  },
  info: {
    fontSize: 20,
    color: colors.dark,
  },
  directionName: {
    color: colors.primaryText,
    fontSize: 15,
  },
  reverseButton: {
    padding: 10,
  },
  reverseText: {
    color: colors.primary,
  },
  footer: {

  },
  chart: {
    flex: 1,
    paddingVertical: 20,
    alignSelf: 'center'
  },
  chartItem: {
    //flex: 1,
    //borderBottomWidth: 50,
    //borderColor: colors.dark,
  },
  node: {
    flex: 1,
    marginTop: -1,
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  nodeText: {
    marginLeft: 10,
    color: colors.primaryText,
  },
  branch: {
    margin: 0,
    height: 80,
    width: 10,
    marginTop: -1,
    marginLeft: 15,
    backgroundColor: colors.dark,
  },
  dotStart: {
    borderWidth: 5,
    borderRadius: 20,
    borderColor: colors.dark,
    backgroundColor: colors.dark,
    width: 40,
    height: 40,
  },
  // dotEnd: {
  //   borderWidth: 5,
  //   borderRadius: 20,
  //   borderColor: colors.dark,
  //   backgroundColor: colors.dark,
  //   width: 40,
  //   height: 40,
  // },
  dotEnd: {
    width: 0,
    height: 0,
    borderColor: colors.dark,
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderTopWidth: 100,
  },
  dot: {
    borderWidth: 5,
    borderRadius: 20,
    borderColor: colors.dark,
    backgroundColor: colors.text,
    width: 40,
    height: 40,
  }
});
export default {
  ...globalStyles,
  ...localStyles,
};
