import React from 'react';
import { Location, Permissions } from 'expo';
import { Alert, Image, ImageBackground, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Text, List, ListItem, Form, Item, Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation';

import NavigationBar from '../constants/NavigationBar';
import FFEntry from './FFEntry';
import styles from '../constants/Style';

let convertImgurURL = (url, size) => url.slice(0,url.length-4) + size + url.slice(url.length-4, url.length)

const distanceBetween = (lat1, lon1, lat2, lon2) => {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

class FFList extends React.Component {
  constructor(props){
    super(props);
    this.searchBarElement = React.createRef();
  }

  state = {
    searchTerm: "",
    userCoordinates: {},
    flora: [],
    fauna: [],
    geoNoPerm: false,
    type: {
      flora: true,
      fauna: true
    },
    trail: "all",
    sortBy: "alphabetical"
  }

  componentDidMount() {
    // TODO: check location every 1min?
    this.startWatchingLocation()
  }

  /**
   * Gets the user's location and stores in state
   */
  startWatchingLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status == 'granted') {
      Location.watchPositionAsync({enableHighAccuracy: true}, ({coords}) => {
        let flora = [], fauna = []
        let uLat = coords.latitude, uLon = coords.longitude

        let {data} = this.props.screenProps
        const ffData = data["flora&fauna"];
        const mapData = data["map"]
        // Tidy up the data for each flora / fauna element in Firebase and calculate the distance
        for (let entry in ffData){
          let details = ffData[entry];

          // Calculate how far away this flora / fauna can be found
          let distance = 9999; //Placeholder Distance
          if(uLat && uLon && details.locations){
            let distances = details.locations.split(',').map(id => {
              let [trailId, routeId] = id.split('/')
              let {latitude, longitude} = mapData[trailId]['route'][routeId]
              return distanceBetween(latitude, longitude, uLat, uLon) * 1000
            })

            distance = Math.min(...distances)
          }
          details = {id: entry, ...details, distance}
          if (entry.startsWith("flora-")) flora.push(details)
          else if (entry.startsWith("fauna-")) fauna.push(details)
        }
        this.setState({flora, fauna, userCoordinates: {uLat, uLon}})
      });
    }
  };

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
      let {id, name, description, imageRef} = details;
      if (Array.isArray(imageRef)) imageRef = imageRef[0]
      let smallImage = convertImgurURL(imageRef, 'm')

      if (this.isSearched(details) && !this.isFiltered(details)) {
        return (
          <ListItem
            style={styles.listItems}
            key={name}
            button onPress={() => this.props.navigation.navigate({
              routeName: 'FFEntry',
              params: { details, markers: this.props.screenProps.markers}
            })}
          >
            <View style={styles.listItemImageHolder}>
            {
              smallImage ?
                <Image
                  style={{height: 100}}
                  source={{uri: smallImage}}
                  resizeMode='cover'
                /> :
                null
            }
            </View>
            
            <View style={styles.listItemTextHolder}>
  
              <View style={[styles.center,{flex:0.35}]}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.miniTitle}>{name}</Text>
              </View>
  
              <View style={{flex:0.65}}>
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
                <Text numberOfLines={1} ellipsizeMode='clip' style={styles.ffListCircleText}>Flora</Text>
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
                <Text numberOfLines={1} ellipsizeMode='clip' style={styles.ffListCircleText}>Fauna</Text>
              </ImageBackground>
            </TouchableOpacity>
        </View>
      );
    }
  }

  /**
   * Callback function for NavigationBar's filtering features
   */
  updateSettings(newSettings, key = null) {
    let {uLat, uLon} = this.state.userCoordinates
    if(newSettings["sortBy"] == "distance" && (!uLat||!uLon)){
      Alert.alert("Please try again","We're still trying to find your location");
      return;
    }
    if (key) {
      let oldSettings = this.state[key]
      this.setState({[key]: {...oldSettings, ...newSettings}})
    } else {
      this.setState(newSettings)
    }
    
  }

  render() {
    let {flora, fauna} = this.state
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
    if((this.state.searchTerm == null||this.state.searchTerm == "")){
      cancelButton = null;
    }

    // Back button
    let backButton = null;
    if (this.state.type.flora != this.state.type.fauna) {
      backButton = (
        <Icon type='Ionicons' name='ios-arrow-back' style={styles.grayIcon} //Cancel icon button
          onPress={() => {
            this.searchBarElement.current.clear();
            this.setState({searchTerm:"",type:{flora:true,fauna:true}});
          }}
        />
      )
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
            {backButton}
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

