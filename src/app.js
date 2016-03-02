import { Provider } from 'react-redux';
import configureStore from './redux/store';

import React, {
  AppRegistry,
  Platform,
  BackAndroid,
  Navigator,
  ToolbarAndroid,
} from 'react-native';

import Splash from './pages/Splash';
import LineList from './pages/LineList';
import styles from './global.styles';
import Router from './config/Router';
const store = configureStore()

global.DEV_MODE = true;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    if (!App.instance) {
      App.instance = this;
    }
  }
  static getInstance() {
      return App.instance;
  }

  push(router) {
      this.navigator.push(router);
  }
  pop(num = 1) {
      const nav = this.navigator;
      const routes = nav.getCurrentRoutes();
      if (num === 1) {
          nav.pop();
      }
      else {
          if (routes.length > num) {
              nav.popToRoute(routes[routes.length-1-num])
          }
      }
  }
  popToRoot () {
      const nav = this.navigator;
      const routes = nav.getCurrentRoutes()
      if (routes.length > 1) {
          nav.popToRoute(routes[0])
      }
  }
  replace(page) {
      this.navigator.replace(page);
  }
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  onBackAndroid = () => {
    const nav = this.navigator;
    const routers = nav.getCurrentRoutes();
    const index = routers.length - 1;
    //const allowBack = !routers[index].disallowBackAndroid;
    if (routers.length > 1) {
      nav.pop();
      return true;
    }
    return false;
  };
  // initialRoute = {
  //   ...Router.pages.LineInfo,
  //   params: {
  //     lineNumber: 728,
  //   }
  // };
  initialRoute = Router.pages.LineList;
  configureScene() {
    if (Platform.OS === 'ios') {
      return Navigator.SceneConfigs.PushFromRight;
    }
    return Navigator.SceneConfigs.FloatFromBottomAndroid;
  }
  renderScene(route, navigator) {
    const Component = route.component;
    console.log(route.params);
    return (
      <Component {...route.params} navigator={navigator} />
    );
  }
  render() {
    return (
      <Provider store={store} key="provider">
				<Navigator
					ref={nav => { this.navigator = nav; }}
					initialRoute={this.initialRoute}
					configureScene={() => this.configureScene()}
					renderScene={(route, navigator) => this.renderScene(route, navigator)}
				/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('BusQuery', () => App);
