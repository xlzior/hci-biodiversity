
import React, { Component } from 'react';
import { View, Text, Content, Icon, ListItem, Right } from 'native-base';

import FullWidthImage from '../constants/FullWidthImage';
import styles from '../constants/Style';

export default class FFEntry extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("details")["name"],
    };
  };

  state = {
    imageURL: ""
  }

  componentDidMount() {
    let {imageRef} = this.props.navigation.getParam("details");
    // TODO: accept array imageRefs
    if (Array.isArray(imageRef)) imageRef = imageRef[0]
    this.props.screenProps.imagesRef.child(imageRef).getDownloadURL()
    .then(imageURL => {
      this.setState({ imageURL })
    })
  }

  render() {
    let data = this.props.screenProps.data['map']
    let {name, sciName, description, locations} = this.props.navigation.getParam("details");
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
            this.state.imageURL ?
            <FullWidthImage source={{uri: this.state.imageURL}}/> :
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

