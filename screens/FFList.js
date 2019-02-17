
import NavigationBar from '../navigation/NavigationBar';
import {Image, View} from 'react-native';
import { Text, List, ListItem, Input, Form, Item } from 'native-base';
import React from 'react';
import styles from '../constants/Style';
import FFEntry from '../constants/FFEntry';
import { createStackNavigator } from 'react-navigation';


class FFList extends React.Component {
  state = {
    searchTerm: ""
  }

  isSearched(details){
    let search = this.state.searchTerm.toLowerCase();
    //Search bar empty
    console.log("Searching: " +  search);
    if(search == "" || search == null)
      return true;
    
    //Checks the entry's name, location and scientific name
    if(details["Name"].toLowerCase().includes(search))
      return true;
    if(details["Locations"].toLowerCase().includes(search))
      return true;
    if(details["SciName"].toLowerCase().includes(search))
      return true;

    console.log("isSearched: FALSE");
    return false;
  }

  render() {    
    let flora = [];
    let fauna = [];
    const data = this.props.screenProps.data["Flora&Fauna"];

    //Render all the cca elements from the data fetched from firebase
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
      if(this.isSearched(details)){
        if (entry.startsWith("Flora-")){
          flora.push(display);
        } else if(entry.startsWith("Fauna-")){
          fauna.push(display);
        }
      }
    }
    
    return (
      <NavigationBar {...this.props}>
        <Form>
          <Item>
            <Input
              onChangeText={searchTerm => {
                console.log("DEBUG SEARCH: {" + searchTerm +"}");
                this.setState({searchTerm});
              }}
              placeholder="Search"
              returnKeyType="search"
              clearButtonMode="always"
            />
          </Item>
        </Form>
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
      </NavigationBar>
    )
  }
}

export default createStackNavigator({
  'Flora & Fauna': {
    screen: FFList,
    navigationOptions: ({
      header: null
    })
  },
  FFEntry: FFEntry,
});

