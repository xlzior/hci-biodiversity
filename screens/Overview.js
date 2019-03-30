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
    // let points = [
    //   { size: 50, top: 0.75, left: 0.35, pulse: 5, params: { name: 'Flora-1' } },
    //   { size: 30, top: 0.3, left: 0.8, pulse: 5, params: { name: 'Fauna-1' } }
    // ]
    // Note: ONLY flora and fauna data is passed onto ClickableImage.
    let uri = this.props.navigation.getParam('url')
    let points = this.props.navigation.getParam('points')
    let image
    if (uri) image = {uri}
    else image = require('./../assets/blockD.jpg')
    return (
      <Content contentContainerStyle={{flex: 1, display: 'flex'}}>
        <ClickableImage
          {...this.props}
          points={points}
          data={this.props.screenProps.data["Flora&Fauna"]}
          image={image}
        />
      </Content>
    )
  }
}
