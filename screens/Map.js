import React from 'react';
import { Permissions } from 'expo';
import { Image } from 'react-native';
import { View, Text, ListItem, Right, Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import MapView, { Marker, Overlay, Callout, Polygon } from 'react-native-maps';
import getFFEntryDetails from '../constants/FFEntryFetcher';

import NavigationBar from '../constants/NavigationBar';
import Overview from './Overview'
import FFEntry from './FFEntry';

class MapComponent extends React.Component {
  async componentDidMount() {
    Permissions.askAsync(Permissions.LOCATION);
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
    let legend = []
    for (let trailId in map) { // for each trail
      let trailMarkerIds = []
      map[trailId]["markers"] = []
      let {name, color, route, markers} = map[trailId]

      if (trail == "all" || trail == trailId || type.flora) {
        for (let routeId in route) { // for each point in the trail
          let {title, latitude, longitude, smallImage, imageRef, points} = route[routeId]
          trailMarkerIds.push(title)
          // TRAIL ROUTE MARKERS
          markers.push(
            <Marker
              key={title}
              identifier={title}
              coordinate={{latitude, longitude}}
              pinColor={color}
              ref={component => {
                this.markers[`${trailId}/${routeId}`] = component;
                this.props.screenProps.saveMarkers(this.markers)
              }}
            >
              <Callout
                onPress={() => this.props.navigation.navigate({
                  routeName: 'Overview',
                  params: { title, points, url: imageRef, markers: this.markers },
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

      // LEGEND(S NEVER DIE)
      if (name && color) legend.push(
        <ListItem
          key={trailId}
          onPress={() => this.mapView.fitToSuppliedMarkers(trailMarkerIds, {edgePadding: {top: 50, bottom: 50, left: 50, right: 50}})}
        >
          <View style={{backgroundColor: color, height: 20, width: 20, borderRadius: 10, margin: 2}}></View>
          <Text style={{flex: 1, marginLeft: 5}}>{name}</Text>
          <Right><Icon type='Ionicons' name='ios-arrow-forward'/></Right>
        </ListItem>
      )
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
        /* POLYGONAL BIRD REGIONS */
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
                params: { details, markers: this.markers },
                goBack: "Map"
              })
            }}
          />
        )
        let {imageRef, smallImage} = details;
        // Map only displays the first image of each bird
        if (Array.isArray(imageRef)) imageRef = imageRef[0]
        
        /* CIRCULAR BIRD ICONS */
        return (
          <Marker
            key={birdId}
            title={name}
            coordinate={{latitude, longitude}}
            onPress={() => {
              if (this.state.showBird == birdId) {
                this.setState({showBird: null})
              } else {
                this.setState({showBird: birdId})
              }
            }}
            onCalloutPress={() => {
              this.props.navigation.navigate({
                routeName: "FFEntry",
                params: { details, markers: this.markers },
                goBack: "Map"
              })
            }}
          >
            <Image
              source={{uri: smallImage || imageRef}}
              style={{
                height: 44,
                width: 44, 
                borderRadius: 22, 
                borderWidth: 2, 
                borderColor: 'white',
                backgroundColor: 'lightgrey'
              }}
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
      display.push(birdMarkers, displayedBirdRegion)
    }

    return (
      <NavigationBar
        enableFilter={['type', 'trail']}
        updateSettings={(s, k) => this.updateSettings(s, k)}
        settings={{type, trail}}
        style={{display: 'flex', flex: 1}}
        {...this.props}
      >

        <MapView
          style={{flex: 1}}
          initialRegion={{
            "latitude": 1.3262123389431508,
            "latitudeDelta": 0.007104620633147096,
            "longitude": 103.80525180497608,
            "longitudeDelta": 0.0072654564431218205,
          }}
          showsUserLocation={true}
          ref={(component) => this.mapView = component}
        >
          <Overlay
            image={require('../assets/maps/map_all.png')}
            bounds={[[1.328214, 103.800920], [1.324215, 103.807922]]}
          />
          {display}
        </MapView>
        <View
          style={{
            padding: 5,
            width: '100%'
          }}
        >
          {legend}
        </View>
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