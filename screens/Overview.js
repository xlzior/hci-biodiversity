import React from 'react'

import NavigationBar from '../constants/NavigationBar';
import { createStackNavigator } from 'react-navigation';
import ClickableImage from './ClickableImage'
import FFEntry from './FFEntry';



class Overview extends React.Component {

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
    //console.log(this.props)
    //Note: ONLY flora and fauna data is passed onto ClickableImage.
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



export default createStackNavigator({
  Overview: {
    screen: Overview,
    navigationOptions: ({
      header: null,
    })
  },
  FFEntry: FFEntry,
});