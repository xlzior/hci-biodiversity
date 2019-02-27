import React from 'react';
import { Image } from 'react-native';
import { Text } from 'native-base';
import Dimensions from 'Dimensions';
const {height} = Dimensions.get('window');

import NavigationBar from '../constants/NavigationBar';
import MapView, { Marker, Overlay, Callout } from 'react-native-maps'

export default class Map extends React.Component {
  render() {
    let {data} = this.props.screenProps;
    let markersRaw = {}
    if (data.hasOwnProperty("Map")) {
      if (data["Map"].hasOwnProperty["Trail1"]) {
        markersRaw = this.props.screenProps.data["Map"]["Trail1"]
      }
    }
    markersRaw = Object.values(markersRaw)
    let markers = markersRaw.map(marker => {
      let {Title, Latitude, Longitude} = marker
      return (
      <Marker
        key={Title}
        coordinate={{latitude: Latitude, longitude: Longitude}}
      >
        <Callout>
          <Text>{Title}</Text>
          <Image
            style={{width: 50, height: 50}}
            source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
          />
        </Callout>
      </Marker>
    )})
    return (
      <NavigationBar {...this.props}>
        <MapView
          style={{flex: 1, height: height-50}}
          initialRegion={{
            latitude: 1.326029, 
            longitude: 103.804553,
            latitudeDelta: 0.0001,
            longitudeDelta: 0.006327
          }}
          showsUserLocation={true}
        >
        <Overlay
          image={require('./../assets/map.png')}
          bounds={[[1.328056, 103.801536], [1.324357, 103.807693]]}
        />
        {markers}
        </MapView>
      </NavigationBar>
    );
  }
}