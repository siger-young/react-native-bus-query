import React, {
  Animated,
  Image,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './Splash.styles';
import Router from '../config/Router';
import * as Actions from '../redux/modules/session';

class Splash extends React.Component {
  brandIcon = require('../assets/bus/bus.png');
  footerIcon = require('../assets/siger/siger.png');
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      brandMotionAnim: new Animated.Value(400),
    }
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 1,
          //duration: 3000,
        },
      ),
      Animated.timing(
        this.state.brandMotionAnim,
        {
          toValue: 0,
          //duration: 3000,
        },
      ),
    ]).start();
    setTimeout(() => {
      this.props.navigator.replace(Router.pages.LineList);
    }, 7500);
  }

  popSplash() {
    const {navigator} = this.props;
    if(navigator) {
      navigator.pop();
    }
  }

  splashScreen() {
    console.log(this.props.actions);
		const {actions} = this.props;
    const brandStyles = {
      opacity: this.state.fadeAnim,
      marginTop: this.state.brandMotionAnim,
    };
    const footerStyles = {
      opacity: this.state.fadeAnim,
    };
		console.log(this.props);
    // <TouchableHighlight onPress={this.popSplash.bind(this)}>
    //   <Text>+1</Text>
    // </TouchableHighlight>
    return (
      <View style={styles.background}>
        <Animated.View style={[styles.brand, brandStyles]}>
          <Image source={this.brandIcon} />
          <Text style={styles.title}>上海公交路线查询</Text>
        </Animated.View>

      </View>
    );
  }

  render() {
    return this.splashScreen();
  }
}

export default connect(
	state => ({
  	isReady: state.session.isReady,
	}),
	dispatch => ({
		actions: bindActionCreators(Actions, dispatch)
	})
)(Splash);
