import React from 'react';
import { Image } from 'react-native';
import { Text } from 'native-base';
import NavigationBar from '../navigation/NavigationBar';
import MapView, { Marker, Overlay, Callout } from 'react-native-maps'
import Dimensions from 'Dimensions';
const {height} = Dimensions.get('window');

export default class Map extends React.Component {
  render() {
    let markersRaw = this.props.screenProps.data["Map"]["Trail1"] || {}
    markersRaw = Object.values(markersRaw)
    console.log('markersRaw: ', markersRaw);
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
            latitude: 1.325307, 
            longitude: 103.806137,
            latitudeDelta: 0.00005,
            longitudeDelta: 0.006327
          }}
          showsUserLocation={true}
        >
        <Overlay
          image={require('./../assets/oha_map.png')}
          bounds={[[1.327320, 103.804719], [1.324026, 103.808213]]}
        />
        {markers}
        </MapView>
      </NavigationBar>
    );
  }
}