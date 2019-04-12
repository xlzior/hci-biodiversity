import React from 'react';
import { Image } from 'react-native';
import { Text, Picker, Icon } from 'native-base';
import Dimensions from 'Dimensions';
const { height } = Dimensions.get('window');
import { createStackNavigator } from 'react-navigation';
import getFFEntryDetails from '../constants/FFEntryFetcher';

import NavigationBar from '../constants/NavigationBar';
import Overview from './Overview'
import FFEntry from './FFEntry';
import MapView, { Marker, Overlay, Callout, Polygon } from 'react-native-maps'

class MapComponent extends React.Component {
  markers = {}

  constructor(props) {
    super(props);
    this.state = {
      firebaseDownloadURLs: {},
      showBird: null,
      filterMode: "all",
      mapURL: ""
    }
  }

  componentDidMount() {
    let {data, imagesRef} = this.props.screenProps;

    imagesRef.child('maps/map_all.png').getDownloadURL()
    .then(mapURL => {
      this.setState({mapURL})
    })

    let routes = "map" in data ? Object.values(data["map"]) : []

    routes.map(({route}) => {
      Object.values(route).forEach(({imageRef}) => {
        imagesRef.child(imageRef).getDownloadURL()
        .then(url => {
          let {firebaseDownloadURLs} = this.state;
          firebaseDownloadURLs[imageRef] = url
          this.setState({ firebaseDownloadURLs })
        })
      })
    })
  }

  render() {
    let {data} = this.props.screenProps;
    let {map} = data;
    let {filterMode} = this.state;

    /* FILTER */

    let trailPickers = []
    for (let trailId in map) {
      let trailName = map[trailId]["name"]
      trailPickers.push(<Picker.Item key={trailId} label={trailName} value={trailId}/>)
    }

    /* GO TO MAP */
    let goToLocation = this.props.navigation.getParam('location', null)
    // TODO: find out from GitHub history how to open a callout and do it
    // TODO: find out how often all this is rendering

    /* ROUTE */

    for (let trailId in map) {
      map[trailId]["markers"] = []
      let {name, color, route, markers} = map[trailId]
      if (filterMode == "all" || filterMode == "flora" || filterMode == trailId) {
        for (let routeId in route) {
          let {title, latitude, longitude, imageRef, points} = route[routeId];
          let url = this.state.firebaseDownloadURLs[imageRef]
          
          markers.push(
            <Marker
              key={title}
              coordinate={{latitude, longitude}}
              pinColor={color}
            >
              <Callout
                onPress={() => this.props.navigation.navigate({
                  routeName: 'Overview',
                  params: { url, points: points },
                  goBack: "Map"
                })}
              >
                <Text>{title}</Text>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: url }}
                />
              </Callout>
            </Marker>
          )
        }
      }
    }

    /* BIRDS */
    let birds = {}, birdIds, birdRegions, birdMarkers, displayedBirdRegion
    if (filterMode == "all" || filterMode == "fauna") {
      for (let ff in data['flora&fauna']) {
        if (ff.indexOf('fauna') >= 0) birds[ff] = data['flora&fauna'][ff]
      }
  
      birdIds = Object.keys(birds)
      birdRegions = {}
      birdMarkers = Object.values(birds).map(({name, latitude, longitude, area}, index) => {
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
                params: {details},
                goBack: "Map"
              })
            }}
            />
        )
        return (
          <Marker
            key={birdId}
            title={name}
            image={require('./../assets/raven.png')}
            coordinate={{latitude, longitude}}
            onPress={() => this.setState({showBird: birdId})}
            ref={component => this.markers[birdId] = component}
          />
        )
      })
  
      displayedBirdRegion = this.state.showBird ? birdRegions[this.state.showBird] : null;
    }

    // build up the display based on filter modes
    let display = []
    // deciding whether to include flora
    if (filterMode == "all" || filterMode == "flora") {
      let trails = []
      for (let trail in map) {
        trails.push(map[trail].markers)
      }
      display.push(trails)
    }
    // deciding whether to include fauna
    if (filterMode == "all" || filterMode == "fauna") {
      display.push(birdMarkers, displayedBirdRegion)
    }
    // deciding which trails to include
    if (filterMode.indexOf('trail') >= 0) {
      display.push(map[filterMode].markers)
    }
    return (
      <NavigationBar {...this.props}>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          style={{width: "100%"}}
          placeholder="All"
          selectedValue={this.state.filterMode}
          onValueChange={filterMode => {
            this.setState({filterMode})
          }}
        >
          <Picker.Item label="All" value="all"/>
          <Picker.Item label="Flora" value="flora"/>
          <Picker.Item label="Fauna" value="fauna"/>
          {trailPickers}
        </Picker>
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
        {this.state.mapURL ? <Overlay
          image={{uri: this.state.mapURL}}
          bounds={[[1.328214, 103.800920], [1.324215, 103.807922]]}
        /> : null}
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