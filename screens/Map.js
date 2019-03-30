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

  constructor(props) {
    super(props);
    this.state = {
      firebaseDownloadURLs: {}
    }
  }

  componentDidMount() {
    let {data} = this.props.screenProps;
    let routesRaw = "Map" in data ? Object.values(data["Map"]) : []

    routesRaw.map(({Route}) => {
      Object.values(Route).forEach(({ImageRef}) => {
        this.props.screenProps.imagesRef.child(ImageRef).getDownloadURL()
        .then(url => {
          let {firebaseDownloadURLs} = this.state;
          firebaseDownloadURLs[ImageRef] = url
          this.setState({ firebaseDownloadURLs })
        })
      })
    })
  }

  render() {
    let {data} = this.props.screenProps;
    let routesRaw = "Map" in data ? Object.values(data["Map"]) : []

    // create a list of markers
    let markers = routesRaw.map(({Name, Color, Route}) => {

      // return the markers for this route
      return Object.values(Route).map(marker => {
        let {Title, Latitude, Longitude, ImageRef, Points} = marker;
        let url = this.state.firebaseDownloadURLs[ImageRef]
        
        return (
          <Marker
            key={Title}
            coordinate={{latitude: Latitude, longitude: Longitude}}
            pinColor={Color}
          >
            <Callout
              onPress={() => this.props.navigation.navigate({
                routeName: 'Overview',
                params: { url, points: Points },
                goBack: "Map"
              })}
            >
              <Text>{Title}</Text>
              <Image
                style={{width: 100, height: 100}}
                source={{ uri: url }}
              />
            </Callout>
          </Marker>
        )
      })
    })

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
  Overview: Overview,
  FFEntry: FFEntry
},
{
  initialRouteName: 'Map',
});