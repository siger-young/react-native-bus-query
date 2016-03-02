import React, {
  Component,
  ToolbarAndroid,
} from 'react-native';

import styles from './NavBar.styles';
import { colors } from '../global.styles';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <ToolbarAndroid
        style={styles.toolbar}
        title={this.props.title}
        titleColor={colors.text}
        subtitle={this.props.subtitle}
        subtitleColor={colors.light} />
    )
  }
}
