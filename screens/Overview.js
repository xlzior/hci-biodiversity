import React from 'react'

import NavigationBar from '../constants/NavigationBar';
import ClickableImage from './ClickableImage'

export default class Overview extends React.Component {

  render() {
    let points = [
      { size: 50, top: 0.75, left: 0.35, pulse: 5, params: { name: 'Flora-1' } },
      { size: 30, top: 0.3, left: 0.8, pulse: 5, params: { name: 'Fauna-1' } }
    ]
    // Note: ONLY flora and fauna data is passed onto ClickableImage.
    console.log('hello', this.props.navigation.getParam('ImageURL', ''));
    let uri = this.props.navigation.getParam('ImageURL')
    let image
    if (uri) image = {uri}
    else image = require('./../assets/blockD.jpg')
    return (
      <NavigationBar {...this.props} >
        <ClickableImage
          {...this.props}
          points={points}
          data={this.props.screenProps.data["Flora&Fauna"]}
          image={require('./../assets/blockD.jpg')}
        />
      </NavigationBar>
    )
  }
}
