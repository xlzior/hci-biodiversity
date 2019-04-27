
import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { View, Text, Content, Icon, ListItem, Right } from 'native-base';
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
            <Text style={styles.subtitle}>{sciName}</Text>

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
}

