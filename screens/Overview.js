import React, { Component } from 'react';
import { Content } from 'native-base';

import ClickableImage from './ClickableImage'

export default class Overview extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Overview", // TODO: change this to the location name
    };
  };

  render() {
    // Note: ONLY flora and fauna data is passed onto ClickableImage.
    let uri = this.props.navigation.getParam('url')
    console.log('uri: ', uri);
    let points = this.props.navigation.getParam('points')
    let image = uri ? {uri} : null;
    // else image = require('./../assets/blockD.jpg')
    return (
      <Content contentContainerStyle={{flex: 1, display: 'flex'}}>
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
