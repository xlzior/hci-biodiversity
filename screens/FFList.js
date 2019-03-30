
import React from 'react';
import { Image, View, TextInput } from 'react-native';
import { Text, List, ListItem, Form, Item, Icon, H1, Button, Picker } from 'native-base';
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

  isFiltered(entry){
    if(this.state.searchCriteria == "All") 
      return false;
    if(entry.startsWith(this.state.searchCriteria)) 
      return false;
    return true;
  }

  render() {
    let flora = [];
    let fauna = [];
    const data = this.props.screenProps.data["Flora&Fauna"];

    //Render all the flora and fauna elements from the data fetched from firebase
    for(let entry in data){
      let details = data[entry];
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
              source={{uri: details["Photo"]}}
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
            <TextInput
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
            <Icon type='MaterialIcons' name='cancel' style={styles.grayIcon}
              onPress={() => {
                this.searchBarElement.current.clear();
                this.setState({searchTerm:"",searchCriteria:"All"});
              }}
            />
            <Picker
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

  getBody(fauna, flora){
    if(this.state.searchTerm != null && this.state.searchTerm != ""){
      //Return the search results if requested.
      return (
        <List>
            <ListItem itemDivider>
              <Text style={[styles.leftTitle2,{marginTop:0}]}>Fauna</Text>
            </ListItem>
            {fauna}
            <ListItem itemDivider>
              <Text style={[styles.leftTitle2,{marginTop:0}]}>Flora</Text>
            </ListItem>
            {flora}
          </List>
      );

    }else if(this.state.searchCriteria == "Flora"||
              this.state.searchCriteria == "Fauna"){
      //Return filtered list
      return (
        <List>
          {fauna}
          {flora}
        </List>
      );
    }else{
      //Return the two main buttons to go to other pages
      return (
        <View>
          <Button style={styles.card}
            onPress={() => {
              this.setState({searchCriteria: "Flora"});
            }}
          >
            <H1>Flora</H1>
          </Button>
          <Button style={styles.card}
            onPress={() => {
              this.setState({searchCriteria: "Fauna"});
            }}
          >
            <H1>Fauna</H1>
          </Button>
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

