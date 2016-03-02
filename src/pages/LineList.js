import React, {
  Animated,
  Image,
  ListView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import lines from '../config/lines';
import styles from './LineList.styles';
import { colors } from '../global.styles';
import NavBar from '../components/NavBar';
import Router from '../config/Router';
// import  from '../redux/modules/session';

class LineList extends React.Component {
  constructor(props) {
    super(props);

    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});

    this.state = {
      lastText: '',
      dataSource: dataSource,
    }
  }

  search() {
    const {searchText, lastText} = this.state;
    if (!searchText || searchText === "") {
        return;
    }
    if (searchText === lastText) {
        return;
    }
    let result = [];
    for(let i = 0; i < lines.length; i++) {
      if(lines[i].toString().startsWith(searchText))
        result.push(lines[i]);
    }
    this.setState({
      lastText: searchText,
      dataSource: this.state.dataSource.cloneWithRows(result),
    })
  }

  componentDidMount() {
    console.log(colors.light);
    //this.props.updateReady();
  }

  viewBus(lineNumber) {
    Router.gotoPage(Router.pages.LineInfo, {
      lineNumber: lineNumber,
    })
  }

  renderRow(rowData) {
    return (
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} underlayColor={colors.light} onPress={() => this.viewBus(rowData)}>
          <Text style={styles.rowText}>
            {rowData}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar title={this.props.title} />
        <View style={styles.searchBox}>
          <TextInput
            maxLength={3}
            style={styles.textBox}
            onChangeText={(text) => this.setState({searchText: text})}
            onSubmitEditing={() => this.search()}
            placeholder={"输入号码查询"}
            editable/>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => this.search()}>
            <Text style={{color: 'white'}}>搜索</Text>
          </TouchableOpacity>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          initialListSize={10}
          renderRow={this.renderRow.bind(this)} />
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

export default LineList
