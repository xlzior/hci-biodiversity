import React from 'react';
import { Image, ImageBackground, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Text, List, ListItem, Form, Item, Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation';

import NavigationBar from '../constants/NavigationBar';
import FFEntry from './FFEntry';
import styles from '../constants/Style';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const distanceBetween = (lat1, lon1, lat2, lon2) => {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

class FFList extends React.Component {
  state = {
    searchTerm: "",
    userCoordinates: {},
    geoNoPerm: false,
    type: {
      flora: true,
      fauna: true
    },
    trail: "all",
    sortBy: "alphabetical"
  }

  constructor(props){
    super(props);
    this.searchBarElement = React.createRef();
  }

  /**
   * Checks if the details of an entry were searched for in searchTerm
   * @param {*} details to be checked
   */
  isSearched(details){
    let {name, locations, sciName} = details
    let search = this.state.searchTerm.toLowerCase();
    //If search is unused, show everything
    if(search == null || search == "") return true;
    
    //Checks the entry's name, location and scientific name
    if(name.toLowerCase().includes(search)) return true;
    if(sciName.toLowerCase().includes(search)) return true;
    if(locations.toLowerCase().includes(search)) return true;
    return false;
  }

  /**
   * @returns whether or not the entry has been filtered by the search criteria
   * @param {*} entry refers to the entry dictionary to be checked
   */
  isFiltered(details){
    let {id, locations} = details;
    if(id.startsWith("flora-") && !this.state.type.flora) 
      return true;
    if(id.startsWith("fauna-") && !this.state.type.fauna) 
      return true;
    
    if(this.state.trail != "all"){
      if(!locations.includes(this.state.trail))
        return true;
    }
    return false; //Passed criterias.
  }

  /**
   * @returns a React Native Display of ListItems
   * @param {*} data refers to an array of objects of details of each flora / fauna item
   */
  generateDisplay(data) {
    if (this.state.sortBy == 'distance') data.sort((a, b) => a.distance - b.distance)
    else data.sort((a, b) => a.name < b.name ? -1 : 1)

    return data.map((details) => {
      let {id, name, description, smallImage} = details;
      // FFList only displays the first image
      if (this.isSearched(details) && !this.isFiltered(details)) {
        return (
          <ListItem
            style={styles.listItems}
            key={name}
            button onPress={() => this.props.navigation.navigate({
              routeName: 'FFEntry',
              params: {details}
            })}
          >
            <View style={styles.listItemImageHolder}>
              <Image
                style={{height: 100}}
                source={{uri: smallImage}}
                resizeMode='cover'/>
            </View>
            
            <View style={styles.listItemTextHolder}>
  
              <View style={{flex:3}}>
                <Text style={styles.miniTitle}>{name}</Text>
              </View>
  
              <View style={{flex:7}}>
                <Text ellipsizeMode='tail' numberOfLines={3} style={styles.miniDesc}>
                  {description}
                </Text>
              </View>
  
            </View>
          </ListItem>
        );
      }else{
        //All entries need a return value
        return null;
      }
    }).filter(entry => entry != null)
  }

  /**
   * @returns the main body of the page, be it 2 round image buttons, or a list of entries.
   * @param {*} fauna 
   * @param {*} flora 
   */
  generateBody(fauna, flora){
    if(this.state.searchTerm != null && this.state.searchTerm != ""){
      //Return the search results if requested.
      let faunaDivider = null;
      let floraDivider = null;
      
      //Removes the header if search criteria is only flora or only fauna
      if(this.state.type.flora && this.state.type.fauna){
        faunaDivider = (
          <ListItem itemDivider>
            <Text style={[styles.leftTitle2,{marginTop:0}]}>Fauna</Text>
          </ListItem>
        );
    
        floraDivider = (
          <ListItem itemDivider>
            <Text style={[styles.leftTitle2,{marginTop:0}]}>Flora</Text>
          </ListItem>
        );
      }
    
      //If the search results are empty, just display "No search results"
      if(fauna.length == 0 && flora.length == 0){
        return (
          <View style={styles.center}>
            <Text style={[styles.leftTitle,{marginTop:0}]}>No search results</Text>
          </View>
        );
      }

      //Returning search results
      return (
        <ScrollView>
          <List>
            {faunaDivider}
            {fauna}
            {floraDivider}
            {flora}
          </List>
        </ScrollView>
      );

    }else if(this.state.type.flora != this.state.type.fauna){
      //Return filtered list (Either only flora or only fauna)
      return (
        <ScrollView>
          <List>
            {fauna}
            {flora}
          </List>
        </ScrollView>
      );
    }else{
      //Return the two main buttons to go to other pages
      return (
        <View style={styles.container}>
            <TouchableOpacity onPress={
              ()=>{this.setState({type: {flora:true,fauna:false}});}
            }>
              <ImageBackground
                style={styles.ffListCircleImageBackground} 
                imageStyle={styles.ffListCircleImage}
                source={require('../assets/flora.jpg')}
                cache="force-cache"
                resizeMode='cover'
              >
                <Text style={styles.ffListCircleText}>Flora</Text>
              </ImageBackground>
            </TouchableOpacity>
          
            <TouchableOpacity onPress={
              ()=>{this.setState({type: {fauna: true,flora:false}});}
            }>
              <ImageBackground
                style={styles.ffListCircleImageBackground} 
                imageStyle={styles.ffListCircleImage}
                source={require('../assets/fauna.jpg')}
                resizeMode='cover'
              >
                <Text style={styles.ffListCircleText}>Fauna</Text>
              </ImageBackground>
            </TouchableOpacity>
        </View>
      );
    }
  }

  updateSettings(newSettings, key = null) {
    if (key) {
      let oldSettings = this.state[key]
      this.setState({[key]: {...oldSettings, ...newSettings}})
    } else {
      this.setState(newSettings)
    }
  }
  
  componentDidMount() {
    let data = this.props.screenProps.data["flora&fauna"] || {};

    // get user's coordinates
    this.watchId = navigator.geolocation.watchPosition(
      ({coords}) => {
        this.setState({ userCoordinates: {uLat: coords.latitude, uLon: coords.longitude} })
      },
      (err) => {
        if(err.code == "E_NO_PERMISSIONS"){
          Alert.alert("Geolocation Disabled","Location sorting will not work.");
        }else{
          console.error(`ERROR(${err.code}): ${err.message}`)
        }
      },
      options
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId)
  }

  render() {
    let flora = [], fauna = [];
    let {data} = this.props.screenProps;
    const ffData = data["flora&fauna"];
    const mapData = data["map"]

    // TODO: figure out how often this is running
    // Tidy up the data for each flora / fauna element in Firebase and calculate the distance
    for (let entry in ffData){
      let details = ffData[entry];
      if (details.locations != "") {
        // Calculate how far away this flora / fauna can be found
        let distances = details.locations.split(',').map(id => {
          let [trailId, routeId] = id.split('/')
          let {latitude, longitude} = mapData[trailId]['route'][routeId]
          let {uLat, uLon} = this.state.userCoordinates
          return distanceBetween(latitude, longitude, uLat, uLon) * 1000
        })
        let distance = Math.min(...distances)
  
        details = {id: entry, ...details, distance}
        if (entry.startsWith("flora-")) flora.push(details)
        else if (entry.startsWith("fauna-")) fauna.push(details)
      }
    }

    let faunaDisplay = this.generateDisplay(fauna)
    let floraDisplay = this.generateDisplay(flora)
    let body = this.generateBody(faunaDisplay, floraDisplay);

    // Cancel button
    let cancelButton = (
      <Icon type='MaterialIcons' name='cancel' style={styles.grayIcon} //Cancel icon button
        onPress={() => {
          this.searchBarElement.current.clear();
          this.setState({searchTerm:"",type:{flora:true,fauna:true}});
        }}
      />
    );

    //Hide the cancel button if there's no search term.
    if((this.state.searchTerm == null||this.state.searchTerm == "")
    && (this.state.type.flora == this.state.type.fauna)){
      cancelButton = null;
    }

    let {type, trail, sortBy} = this.state
    return (
      <NavigationBar
        enableFilter={['type', 'trail', 'sortBy']}
        updateSettings={(s, k) => this.updateSettings(s, k)}
        settings={{type, trail, sortBy}}
        {...this.props}
      >
        <Form style={styles.textForm}>
          <Item>
            <Icon type='MaterialIcons' name='search' style={styles.grayIcon} />
            <TextInput //Search bar
              onChangeText={searchTerm => {
                this.setState({searchTerm});
              }}
              ref={this.searchBarElement}
              placeholder="Search"
              returnKeyType="search"
              clearButtonMode="never"
              style={styles.searchBar}
            />
            {cancelButton}
          </Item>
        </Form>
        {body}
      </NavigationBar>
    )
  }

}

export default createStackNavigator({
  'Flora and Fauna': {
    screen: FFList,
    navigationOptions: ({
      header: null,
    })
  },
  FFEntry: {
    screen: FFEntry
  },
});

