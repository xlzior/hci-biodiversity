import React from 'react';
import { Image } from 'react-native';
import { Text } from 'native-base';
import Dimensions from 'Dimensions';
const { height } = Dimensions.get('window');
import { createStackNavigator } from 'react-navigation';
import MapView, { Marker, Overlay, Callout, Polygon } from 'react-native-maps';
import getFFEntryDetails from '../constants/FFEntryFetcher';

import NavigationBar from '../constants/NavigationBar';
import Overview from './Overview'
import FFEntry from './FFEntry';

class MapComponent extends React.Component {
  async componentDidMount() {
    const { Location, Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      return Location.getCurrentPositionAsync({enableHighAccuracy: true});
    } else {
      throw new Error('Location permission not granted');
    }
  }

  markers = {}

  updateSettings(newSettings, key = null) {
    if (key) {
      let oldSettings = this.state[key]
      this.setState({[key]: {...oldSettings, ...newSettings}})
    } else {
      this.setState(newSettings)
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      showBird: null,
      birds: {},
      type: {
        flora: true,
        fauna: true
      },
      trail: "all",
      sortBy: "alphabetical"
    }
  }

  componentDidMount() {
    let {data} = this.props.screenProps;

    let birds = {}
    if ('flora&fauna' in data) {
      for (let ff in data['flora&fauna']) {
        if (ff.indexOf('fauna') >= 0) birds[ff] = data['flora&fauna'][ff]
      }
    }

    this.setState({birds}) // save in state for future reference without reevaluating
  }

  render() {
    let {data} = this.props.screenProps;
    let {map} = data;
    let {type, trail} = this.state;

    /* ROUTE */

    for (let trailId in map) { // for each trail
      map[trailId]["markers"] = []
      let {name, color, route, markers} = map[trailId]
      if (trail == "all" || trail == trailId || type.flora) {
        for (let routeId in route) { // for each point in the trail
          let {title, latitude, longitude, smallImage, imageRef, points} = route[routeId]
          // TRAIL ROUTE MARKERS
          markers.push(
            <Marker
              key={title}
              coordinate={{latitude, longitude}}
              pinColor={color}
              ref={component => this.markers[`${trailId}/${routeId}`] = component}
            >
              <Callout
                onPress={() => this.props.navigation.navigate({
                  routeName: 'Overview',
                  params: { title, points, url: imageRef },
                  goBack: "Map"
                })}
              >
                <Text
                  style={{
                    minWidth: 100,
                    maxWidth: 180,
                    textAlign: "center"
                  }}
                >
                  {title}
                </Text>
                <Image
                  style={{ width: '100%', height: 100 }}
                  source={{ uri: smallImage }}
                />
              </Callout>
            </Marker>
          )
        }
      }
    }

    /* BIRDS */
    let {birds} = this.state, birdIds, birdRegions, birdMarkers, displayedBirdRegion
    if (type.fauna) {
      birdIds = Object.keys(birds)
      birdRegions = {}
      birdMarkers = Object.values(birds).map(({name, latitude, longitude, area}, index) => {
        if (!latitude) return null; // return null if this fauna does not have latitude and longitude data
        let birdId = birdIds[index]
        let details = getFFEntryDetails(birdId, this.props.screenProps.data["flora&fauna"])
        birdRegions[birdId] = (
          <Polygon
            key={birdId}
            coordinates={area}
            lineJoin="round"
            lineCap="round"
            fillColor="#0000FF20"
            strokeColor="#0000FF20"
            strokeWidth={3}
            tappable
            onPress={() => {
              this.props.navigation.navigate({
                routeName: "FFEntry",
                params: {details, markers: this.markers},
                goBack: "Map"
              })
            }}
          />
        )
        let {imageRef, smallImage} = details;
        // Map only displays the first image of each bird
        if (Array.isArray(imageRef)) imageRef = imageRef[0]

        return (
          <Marker
            key={birdId}
            title={name}
            coordinate={{latitude, longitude}}
            onPress={() => this.setState({showBird: birdId})}
            onCalloutPress={() => {
              this.props.navigation.navigate({
                routeName: "FFEntry",
                params: {details, markers: this.markers},
                goBack: "Map"
              })
            }}
          >
            <Image
              source={{uri: smallImage || imageRef}}
              style={{height: 40, width: 40, borderRadius: 20}}
            />
          </Marker>
        )
      })
  
      displayedBirdRegion = this.state.showBird ? birdRegions[this.state.showBird] : null;
    }

    // build up the display based on filter modes
    let display = []
    // deciding whether to include flora
    if (type.flora) {
      let trails = []
      if (trail == 'all') {
        for (let trail in map) {
          trails.push(map[trail].markers)
        }
      } else {
        display.push(map[trail].markers)
      }
      display.push(trails)
    }
    // deciding whether to include fauna
    if (type.fauna) {
      // TODO: account for the trails that the birds belong to
      display.push(birdMarkers, displayedBirdRegion)
    }

    return (
      <NavigationBar
        enableFilter={['type', 'trail']}
        updateSettings={(s, k) => this.updateSettings(s, k)}
        settings={{type, trail}}
        {...this.props}
      >
        <MapView
          style={{height: height-50}}
          initialRegion={{
            "latitude": 1.3252783969319353,
            "latitudeDelta": 0.010407239607321594,
            "longitude": 103.80472172,
            "longitudeDelta": 0.006327,
          }}
          showsUserLocation={true}
        >
        <Overlay
          image={require('../assets/maps/map_all.png')}
          bounds={[[1.328214, 103.800920], [1.324215, 103.807922]]}
        />
        {display}
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