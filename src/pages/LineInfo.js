import React, {
  Animated,
  Image,
  ListView,
  Text,
  ScrollView,
  RefreshControl,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Platform,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './LineInfo.styles';
import { colors } from '../global.styles';
import NavBar from '../components/NavBar';
import LineModule from '../components/LineModule';
import Router from '../config/Router';
import * as api from '../config/api';
// import  from '../redux/modules/session';

class LineInfo extends React.Component {
  constructor(props) {
    super(props);
    let direction = this.props.direction ? this.props.direction : 0;
    this.state = {
      isRefreshing: true,
      direction: direction,
      directionName: '',
    }
  }

  componentDidMount() {
    this.updateTitle()
    this.refresh();
    //this.props.updateReady();
  }


  async updateTitle() {
    try {
      let directionName = await api.getDirectionName(this.props.lineNumber, this.state.direction);
      this.setState({
        title: this.props.lineNumber + '（至 ' + directionName + '）',
        directionName: directionName,
      });
    }
    catch(error) {
      throw error;
    }
  }

  async refresh() {
    try {
      if (!this.state.isRefreshing) {
        //let directionName = await api.getDirectionName(this.props.lineNumber, this.state.direction);
        this.setState({
          isRefreshing: true,
        });
        await this.bus.refreshBus();
        this.setState({
          isRefreshing: false
        });
      }
    }
    catch(error) {
      throw error;
    }
    finally {
      this.setState({
        isRefreshing: false
      });
    }
  }

  render() {
    let color = Platform.OS === 'ios' ? colors.primary : [colors.primary, colors.light];
    return (
      <View style={styles.container}>
        <NavBar title={this.state.title} />
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              colors={color}
              tintColor={colors.primary}
              onRefresh={()=>this.refresh()}
              onRefreshDone={()=>{
                this.setState({isRefreshing: false})
              }}/>
          }>
          <LineModule
            ref={(bus) => this.bus = bus}
            lineNumber={this.props.lineNumber}
            direction={this.state.direction}
            directionName={this.state.directionName}/>
        </ScrollView>
      </View>
    );
  }
}

// export default connect(
// 	state => ({
//   	isReady: state.session.isReady,
// 	}),
// 	dispatch => ({
// 		updateReady: () => dispatch(updateReady()),
// 	})
// )(LineList);

export default LineInfo
