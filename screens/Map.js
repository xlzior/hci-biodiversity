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
    let routesRaw = "Map" in data ? Object.values(data["Map"]) : []
    let markers = routesRaw.map(routeDetails => {
      let {Name, Color, Route} = routeDetails
      Route = Object.values(Route)
      let markers = Route.map(marker => {
        let {Title, Latitude, Longitude, ImageURL} = marker
        return (
          <Marker
            key={Title}
            coordinate={{latitude: Latitude, longitude: Longitude}}
            pinColor={Color}
          >
            <Callout>
              <Text>{Title}</Text>
              <Image
                style={{width: 50, height: 50}}
                source={{uri: ImageURL}}
              />
            </Callout>
          </Marker>
        )
      })
      return markers
    })

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
          bounds={[[1.32804, 103.80153], [1.32434354, 103.807746]]}
        />
        {markers}
        </MapView>
      </NavigationBar>
    );
  }
}