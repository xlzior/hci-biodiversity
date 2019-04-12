
import React, { Component } from 'react';
import { View, Text, Content, Button } from 'native-base';

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
    this.props.screenProps.imagesRef.child(imageRef).getDownloadURL()
    .then(imageURL => {
      this.setState({ imageURL })
    })
  }

  render() {
    let data = this.props.screenProps.data['map']
    let {name, sciName, description, locations} = this.props.navigation.getParam("details");
    description = this.formatParagraph(description);

    let locationButtons = locations.split(',').map(location => {
      let [trailId, routeId] = location.split('/');
      let {title} = data[trailId]['route'][routeId]
      return (
        <Button
          key={location}
          onPress={() => {
            console.log("we're going on a trip to", title)
            this.props.navigation.navigate({
              routeName: "Map",
              params: { location }
            })
          }}
        >
          <Text>{title}</Text>
        </Button>
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

            <Text style={styles.leftTitle2}>Location(s): </Text>
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

