import React from 'react';
import { Image } from 'react-native';
import { Text, Picker, Icon } from 'native-base';
import Dimensions from 'Dimensions';
const {height} = Dimensions.get('window');
import { createStackNavigator } from 'react-navigation';

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
      filterMode: "all"
    }
  }

  componentDidMount() {
    let {data} = this.props.screenProps;
    let routes = "map" in data ? Object.values(data["map"]) : []

    routes.map(({route}) => {
      route.forEach(({imageRef}) => {
        this.props.screenProps.imagesRef.child(imageRef).getDownloadURL()
        .then(url => {
          let {firebaseDownloadURLs} = this.state;
          firebaseDownloadURLs[imageRef] = url
          this.setState({ firebaseDownloadURLs })
        })
      })
    })
  }

  render() {
    let {data} = this.props.screenProps
    let {map} = data;
    let {filterMode} = this.state;

    /* FILTER */

    let trailPickers = []
    for (let trailId in map) {
      let trailName = map[trailId]["name"]
      trailPickers.push(<Picker.Item key={trailId} label={trailName} value={trailId}/>)
    }

    /* ROUTE */

    for (let trailId in map) {
      console.log('trailId: ', trailId);
      console.log('filterMode: ', filterMode);
      let {name, color, route} = map[trailId]
      if (filterMode == "all" || filterMode == "flora" || filterMode == trailId) {
        map[trailId]["markers"] = route.map(marker => {
          let {title, latitude, longitude, imageRef, points} = marker;
          let url = this.state.firebaseDownloadURLs[imageRef]
          
          return (
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
        })
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
        birdRegions[birdId] = <Polygon coordinates={area} />
        return (
          <Marker
            key={birdId}
            image={require('./../assets/raven.png')}
            coordinate={{latitude, longitude}}
            onPress={() => this.setState({showBird: birdId})}
          />
        )
      })
  
      displayedBirdRegion = this.state.showBird ? birdRegions[this.state.showBird] : null;
    }

    let display = []
    if (filterMode == "all" || filterMode == "flora") {
      let trails = []
      for (let trail in map) {
        trails.push(map[trail].markers)
      }
      display.push(trails)
    }
    if (filterMode == "all" || filterMode == "fauna") {
      display.push(birdMarkers, displayedBirdRegion)
    }
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