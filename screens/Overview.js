import React from 'react'

import NavigationBar from '../constants/NavigationBar';
import ClickableImage from './ClickableImage'

export default class Overview extends React.Component {
  render() {
    // let points = [
    //   { size: 100, top: 0.5, left: 0.5, pulse: 5 },
    //   { size: 50, top: 0.25, left: 0.5, pulse: 5 },
    //   { size: 30, top: 0.5, left: 0.25, pulse: 5 },
    //   { size: 50, top: 0.5, left: 0.75, pulse: 5 },
    // ]
    let points = [
      { size: 100, top: 0.5, left: 0.5, pulse: 5, params: { name: 'Fauna-1' } }
    ]
    return (
      <NavigationBar {...this.props} >
        <ClickableImage
          {...this.props}
          points={points}
          image={require('./../assets/blockD.jpg')}
        />
      </NavigationBar>
    )
  }
}