import React, { Component } from 'react';
import { Content } from 'native-base';

import ClickableImage from './ClickableImage'

export default class Overview extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };

  render() {
    // Note: ONLY flora and fauna data is passed onto ClickableImage.
    let uri = this.props.navigation.getParam('url')
    let image = uri ? {uri} : null;
    let points = this.props.navigation.getParam('points')
    let markers = this.props.navigation.getParam('markers')
    return (
      <Content>
        <ClickableImage
          {...this.props}
          image={image}
          points={points}
          markers={markers}
          data={this.props.screenProps.data["flora&fauna"]}
        />
      </Content>
    )
  }
}
