import React, {
  Component,
  Text,
  Image,
  ListView,
  ProgressBarAndroid,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './LineModule.styles';
import { colors } from '../global.styles';
import * as api from '../config/api';
import Router from '../config/Router';
let endpoint = require('../assets/endpoint/endpoint.png');


export default class LineModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: true,
      nodes: new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2}),
      info: null,
    }
  }

  goReverse() {
    Router.replace(Router.pages.LineInfo, {
      lineNumber: this.props.lineNumber,
      direction: this.props.direction==0 ? 1 : 0,
    })
  }

  componentDidMount() {
    this.refreshBus();
  }

  async check() {
    let disabled = await api.isStop(this.props.lineNumber);
    try {
      if(disabled == true) {
        this.setState({
          isStop: true
        })
      } else {
        this.refreshBus();
      }
    }
    catch(error) {
      throw error;
    }
  }

  async refreshBus() {
    try {
      let info = await api.getInfo(this.props.lineNumber, this.props.direction);
      console.log(info);
      this.setState({
        info,
        nodes: this.state.nodes.cloneWithRows(info.stations),
      })
    }
    catch(error) {
      throw error;
    }
  }

  renderNode(node) {
    return (
      <View>
        <View style={styles.node}>
          <View style={styles.dot}>
          </View>
          <Text>
            {node.name}
          </Text>
        </View>
        <View style={styles.branch}>
        </View>
      </View>
    )
    // let style = styles.dotWay;
    // if(node.id == 1)
    //   style = styles.dotStart;
    // if(node.name == this.props.directionName)
    //   style = styles.dotEnd;

  }

  render() {
    const {isStop, info} = this.state;
    let ProgressBar = Platform.OS === 'ios'
      ? null
      : (<ProgressBarAndroid styleAttr={'Inverse'} indeterminate={true} color={colors.primary} />);
    if(isStop) {
      Alert.alert("提示","当前路线已停止营运！",[{text: "好"}])
      return(
        <View style={styles.loadingView}>
          <Text style={styles.info}>当前线路已停止营运！</Text>
        </View>
      );
    }
    if(!info) {
      return(
        <View style={styles.container}>
          <View style={styles.loadingView}>
            {ProgressBar}
          </View>
        </View>
      );
    }
    console.log(info);
    // <View style={styles.scheduleItem} key={key}>
    // <Text style={styles.scheduleItemText}>{item.name}</Text>
    // <Text style={styles.scheduleItemText}>{item.name}： {item.value} </Text>
    // </View>
    // <ListView
    //   style={styles.container}
    //   renderRow={this.renderNode.bind(this)}
    //   dataSource={this.state.nodes}>
    // </ListView>
    const {stations, basic, gps} = info;
    const start = stations[0];
    const end = stations[stations.length - 1];
    return(
      <View　style={styles.container}>
        <View style={styles.header}>
          <View style={styles.bus}>
            <Text style={styles.number}>{this.props.lineNumber}</Text>
            <Text style={styles.directionName}>至 {this.props.directionName}</Text>
            <TouchableOpacity onPress={this.goReverse.bind(this)} style={styles.reverseButton}>
              <Text style={styles.reverseText}>点击更换方向</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.schedule}>
          {
            basic.map((item, key) => {
              return(
                <View style={styles.scheduleItem} key={key}>
                  <Text style={styles.scheduleItemText}>{item.name}： {item.value} </Text>
                </View>
              )
            })
          }
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.chart}>
            <View sytle={styles.chartItem}>
              <View style={styles.node}>
                <View style={styles.dotStart}>
                </View>
                <Text style={styles.nodeText}>{start.name}</Text>
              </View>
              <View style={styles.branch}>
              </View>
            </View>
            {
              stations.map((item, key) => {
                if(key==0 || key==stations.length - 1) return;
                return(
                  <View sytle={styles.chartItem} key={key}>
                    <View style={styles.node}>
                      <View style={styles.dot}>
                      </View>
                      <Text style={styles.nodeText}>{item.name}</Text>
                    </View>
                    <View style={styles.branch}>
                    </View>
                  </View>
                )
              })
            }
            <View sytle={styles.chartItem}>
              <View style={styles.node}>
                <View>
                  <Image source={endpoint} style={{height: 40, width: 40,}}></Image>
                </View>
                <Text style={styles.nodeText}>{end.name}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
