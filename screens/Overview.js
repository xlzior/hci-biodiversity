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
    let points = this.props.navigation.getParam('points')
    let image = uri ? {uri} : null;
    return (
      <Content contentContainerStyle={{height: '120%'}}>
        <ClickableImage
          {...this.props}
          points={points}
          data={this.props.screenProps.data["flora&fauna"]}
          image={image}
        />
      </Content>
    )
  }
}
