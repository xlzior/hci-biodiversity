
import React from 'react';
import { Image, ImageBackground, View, TextInput, TouchableOpacity } from 'react-native';
import { Text, List, ListItem, Form, Item, Icon, Picker } from 'native-base';
import { createStackNavigator } from 'react-navigation';


import NavigationBar from '../constants/NavigationBar';
import FFEntry from './FFEntry';
import styles from '../constants/Style';

class FFList extends React.Component {
  state = {
    searchTerm: "",
    searchCriteria: "All"
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
    let search = this.state.searchTerm.toLowerCase();
    //If search is unused, show everything
    if(search == null || search == "")
      return true;
    
    //Checks the entry's name, location and scientific name
    if(details["Name"].toLowerCase().includes(search))
      return true;
    if(details["Locations"].toLowerCase().includes(search))
      return true;
    if(details["SciName"].toLowerCase().includes(search))
      return true;
    return false;
  }

  /**
   * @returns whether or not the entry has been filtered by the search criteria
   * @param {*} entry refers to the entry dictionary to be checked
   */
  isFiltered(entry){
    if(this.state.searchCriteria == "All") 
      return false; //No criteria set, so nothing's filtered
    if(entry.startsWith(this.state.searchCriteria)) 
      return false; //Fulfills critera, so not filtered
    return true; //Failed criteria and is filtered.
  }

  render() {
    let flora = [];
    let fauna = [];
    const data = this.props.screenProps.data["Flora&Fauna"];
    //Render all the flora and fauna elements from the data fetched from firebase
    for(let entry in data){
      let details = data[entry];

      //Lol fix here
      imageUrl = "https://firebasestorage.googleapis.com/v0/b/hci-biodiversity.appspot.com/o/images%2F" + 
      details["ImageRef"].split(" ").join("%20").split("/").join("%2F") + "?alt=media&token=d586edcd-eb2d-4b81-bd01-cdf425a4c54c";

      display = (
        <ListItem
          style={styles.listItems}
          key={details["Name"]}
          button onPress={() => this.props.navigation.navigate({
            routeName: 'FFEntry',
            params: {details}
          })}
        >
          <View style={styles.listItemImageHolder}>
            <Image
              style={{height: 100}}
              source={{uri: imageUrl}}
              resizeMode='cover'/>
          </View>
          
          <View style={styles.listItemTextHolder}>

            <View style={{flex:0.3}}>
              <Text style={styles.miniTitle}>{details["Name"]}</Text>
            </View>

            <View style={{flex:0.7}}>
              <Text ellipsizeMode='tail' numberOfLines={3} style={styles.miniDesc}>
                {details["Description"]}
              </Text>
            </View>

          </View>
        </ListItem>
      );

      //Push the element under the right section, and display it only
      //when searched for (or when searchbar is empty)
      if(entry.startsWith("Flora-") && this.isSearched(details)){
        if(!this.isFiltered(entry))
          flora.push(display);
      }else if(entry.startsWith("Fauna-") && this.isSearched(details,"Fauna")){
        if(!this.isFiltered(entry))
          fauna.push(display);
      }
    }

    let body = this.getBody(fauna, flora);
    return (
      <NavigationBar {...this.props}>
        <Form style={styles.textForm}>
          <Item>
            <Icon type='MaterialIcons' name='search' style={styles.grayIcon} />
            <TextInput //Search bar
              onChangeText={searchTerm => {
                // console.log("DEBUG SEARCH: {" + searchTerm +"}");
                this.setState({searchTerm});
              }}
              ref={this.searchBarElement}
              placeholder="Search"
              returnKeyType="search"
              clearButtonMode="never"
              style={styles.searchBar}
            />
            <Icon type='MaterialIcons' name='cancel' style={styles.grayIcon} //Cancel icon button
              onPress={() => {
                this.searchBarElement.current.clear();
                this.setState({searchTerm:"",searchCriteria:"All"});
              }}
            />
            <Picker //Code for the criteria picker (All, Flora, Fauna)
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{  }}
                placeholder="All"
                placeholderIconColor="#007aff"
                selectedValue={this.state.searchCriteria}
                onValueChange={searchCriteria => {
                  console.log(searchCriteria);
                  this.setState({searchCriteria});
                }}
              >
                <Picker.Item label="All" value="All" />
                <Picker.Item label="Flora" value="Flora" />
                <Picker.Item label="Fauna" value="Fauna" />
              </Picker>
          </Item>
        </Form>
        {body}
      </NavigationBar>
    )
  }

  /**
   * @returns the main body of the page, be it 2 round image buttons, or a list of entries.
   * @param {*} fauna 
   * @param {*} flora 
   */
  getBody(fauna, flora){
    if(this.state.searchTerm != null && this.state.searchTerm != ""){
      //Return the search results if requested.
      let faunaDivider = null;
      let floraDivider = null;
      
      //Removes the header if search criteria is only flora or only fauna
      if(this.state.searchCriteria == "All"){
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
      
      return (
        <List>
            {faunaDivider}
            {fauna}
            {floraDivider}
            {flora}
          </List>
      );

    }else if(this.state.searchCriteria != "All"){
      //Return filtered list (Either only flora or only fauna)
      return (
        <List>
          {fauna}
          {flora}
        </List>
      );
    }else{
      //Return the two main buttons to go to other pages
      return (
        <View style={styles.container}>
            <TouchableOpacity onPress={
              ()=>{this.setState({searchCriteria: "Flora"});}
            }>
              <ImageBackground
                style={styles.ffListCircleImageBackground} 
                imageStyle={styles.ffListCircleImage}
                source={require('../assets/flora.jpg')}
                resizeMode='cover'
              >
                <Text style={styles.ffListCircleText}>Flora</Text>
              </ImageBackground>
            </TouchableOpacity>
          
            <TouchableOpacity onPress={
              ()=>{this.setState({searchCriteria: "Fauna"});}
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

