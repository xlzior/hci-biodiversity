
import NavigationBar from '../navigation/NavigationBar';
import {Image, View} from 'react-native';
import { Text, List, ListItem, Left, Right, Icon, Input, Form, Item } from 'native-base';
import React from 'react';
import styles from '../constants/Style';
import FFEntry from '../constants/FFEntry';
import { createStackNavigator } from 'react-navigation';


class FFList extends React.Component {
  state = {
    searchTerm: ""
  }

  isSearched(name){
    let search = this.state.searchTerm.toLowerCase();
    //Search bar empty
    if(search == "")
      return true;

    if(name.toLowerCase().includes(search))
      return true;
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
          style={{
            height:100,
            width: '100%', 
            marginLeft: 0, 
            paddingLeft: 0, 
            paddingRight: 0, 
            marginRight: 0,
            flexDirection: 'row'}}
          key={details["Name"]}
          button onPress={() => this.props.navigation.navigate({
            routeName: 'FFEntry',
            params: { 
              name: details["Name"],
              sciname: details["Sciname"],
              locations: details["Locations"],
              description: details["Description"],
              photo: details["Photo"] 
            }
          })}
        >
          <View style={{height:100,width:100,marginRight:15}}>
            <Image
              style={{height: 100}}
              source={{uri: details["Photo"]}}
              resizeMode='cover'/>
          </View>
          <View style={{
            height:100,
            justifyContent: 'left', 
            alignItems: 'left',
            flexDirection: 'column'
          }}>
            <View style={{flex:0.3}}>
              <Text style={styles.minititle}>{details["Name"]}</Text>
            </View>
            <View style={{flex:0.7,width:'80%'}}>
              <Text ellipsizeMode='tail' numberOfLines={3} style={styles.minidesc}>
                {details["Description"]}
              </Text>
            </View>
          </View>
          
        </ListItem>
      );

      //Push the element under the right section, and display it only
      //when searched for (or when searchbar is empty)
      if(this.isSearched(details["Name"])){
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
                this.setState({searchTerm});
              }}
              value={this.state.searchTerm}
              placeholder="Search"
              returnKeyType="search"
              clearButtonMode="always"
            />
          </Item>
        </Form>
        <List>
          <ListItem itemDivider>
            <Text style={[styles.lefttitle2,{marginTop:0}]}>Fauna</Text>
          </ListItem>
          {fauna}
          <ListItem itemDivider>
            <Text style={[styles.lefttitle2,{marginTop:0}]}>Flora</Text>
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

