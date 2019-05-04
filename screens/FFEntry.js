
import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { View, Content, Icon, ListItem, Right } from 'native-base';
import FullWidthImage from '../constants/FullWidthImage'
import ImageView from 'react-native-image-view';

import styles from '../constants/Style';

export default class FFEntry extends Component {
  state = {
    isImageViewVisible: false
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("details")["name"],
    };
  };

  render() {
    let data = this.props.screenProps.data['map']
    let {name, sciName, description, locations, imageRef} = this.props.navigation.getParam("details");

    let images = imageRef.map(src => ({source: { uri: src }}))
    let markers = this.props.navigation.getParam('markers', {})
    description = this.formatParagraph(description);

    let locationButtons = locations.split(',').map(location => {
      let [trailId, routeId] = location.split('/');
      let {title} = data[trailId]['route'][routeId]
      return (
        <ListItem 
          key={location} 
          style={styles.entryLocationListItem}
          onPress={() => {
            this.props.navigation.navigate({
              routeName: "Map"
            })
            if (location in markers) markers[location].showCallout()
          }}
        >
          <Text style={{flex:1}}>{title}</Text>
          <Right>
            <Icon 
              type='MaterialIcons' 
              name='arrow-forward'
            />
          </Right>
          
        </ListItem>
        
      )
    })
    
    return (
      <Content>
        <View>
          {
            imageRef ?
            <View>
              <TouchableOpacity onPress={()=>this.setState({isImageViewVisible: true})}>
                <FullWidthImage source={images[0].source} />
              </TouchableOpacity>
              <ImageView
                images={images}
                imageIndex={0}
                isVisible={this.state.isImageViewVisible}
                onClose={()=>this.setState({isImageOpen: false})}
              />
            </View> :
            null
          }
        </View>
        <View style={{padding:20}}>
          <View style={{marginBottom: 100}}>
            <Text style={styles.leftTitle}>{name}</Text>
            <Text style={styles.subtitle}>{this.formatSciName(sciName)}</Text>

            <Text style={styles.description}>{description}</Text>
            <Text>{'\n'}</Text>
            <Text style={styles.leftTitle2}>Locations: </Text>
            {locationButtons}
          </View>
        </View>
      </Content>
    );
    
  }
  
  formatParagraph(paragraph) {
    //Double all line spacing
    return paragraph.split('\n').join('\n\n');
  }

  formatSciName(sciname) {
    /**
     * 2 part name: Italicised: 1st letter caps 2nd word all lower case
        (First word is genus; 2nd word is specific epithet)
        If one word, means genus. No specific epithet due to extensive hybridisation. 
        i.e. italicise the word, caps first letter, rest lower case.
        3 part name: Italicise. last word is variety, lower case

        Salix matsudana koidz

        var. = variety: Don’t italicise “var.”
        text in apostrophe is also variety but not in latin. Part of scientific name but don’t italicise.

        Samanea saman (yellow leaf var.)
        Heliconia ‘American Dwarf’

        If any name ends with L. pls delete L.
    */

    //First, capitalise
    sciname =  sciname.charAt(0).toUpperCase() + sciname.slice(1);

    //Remove heading and trailing whitespaces
    sciname = sciname.trim();

    //Check for "L."
    if(sciname.endsWith("L.")){
      sciname = sciname.substr(0, sciname.length-2);
    }

    let sections = sciname.split(" ");
    let italicise = true;
    let i = 0;

    //Italicising process. 
    let list = sections.map((section) => {
      i++;
      if(section.startsWith("'")){
        italicise = !italicise;
      }else if(section.startsWith("(")){
        italicise = false;
      }
      
      let element = (
        <Text key={i} style={{fontFamily:"Lato-Italic"}}>
          {section + " "}
        </Text>
      );
      if(!italicise || section == "var."){
        element = (
          <Text key={i}>
            {section + " "}
          </Text>
        );
      }

      if(section.endsWith("'")){
        italicise = !italicise;
      }else if(section.endsWith(")")){
        console.log("Non-ital");
        italicise = true;
      }

      return element;
    });

    return list;
  }
}

