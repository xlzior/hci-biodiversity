import React from 'react';
import { Image } from 'react-native';
import { Text } from 'native-base';
import Dimensions from 'Dimensions';
const {height} = Dimensions.get('window');
import { createStackNavigator } from 'react-navigation';

import NavigationBar from '../constants/NavigationBar';
import Overview from './Overview'
import FFEntry from './FFEntry';
import MapView, { Marker, Overlay, Callout } from 'react-native-maps'

class MapComponent extends React.Component {
  markers = {}

  render() {
    let {data} = this.props.screenProps;
    let routesRaw = "Map" in data ? Object.values(data["Map"]) : []
    let markers = routesRaw.map(routeDetails => {
      let {Name, Color, Route} = routeDetails
      this.markers[Name] = []
      Route = Object.values(Route)
      let markers = Route.map(marker => {
        let {Title, Latitude, Longitude, ImageURL} = marker;
        return (
          <Marker
            key={Title}
            coordinate={{latitude: Latitude, longitude: Longitude}}
            pinColor={Color}
            ref={component => this.markers[Name].push(component)}
          >
            <Callout
              onPress={() => this.props.navigation.navigate({
                routeName: 'Overview',
                params: { ImageURL }
              })}
            >
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
    // showCallout can't do more than 1 callout at a time
    // <Button onPress={() => this.markers['College Section'].map(marker => marker.showCallout())}><Text>Show</Text></Button>
    return (
      <NavigationBar {...this.props}>
        <MapView
          style={{flex: 1, height: height-50}}
          initialRegion={{
            "latitude": 1.3252783969319353,
            "latitudeDelta": 0.010407239607321594,
            "longitude": 103.80472172,
            "longitudeDelta": 0.006327,
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

export default createStackNavigator({
  Map: {
    screen: MapComponent,
    navigationOptions: ({
      header: null,
    })
  },
  Overview: {
    screen: Overview,
    navigationOptions: ({
      header: null,
    })
  },
  FFEntry: FFEntry
});