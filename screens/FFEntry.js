
import React, { Component } from 'react';
import { View, Text, Content } from 'native-base';

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
    let {name, sciName, description, locations} = this.props.navigation.getParam("details");
    description = this.formatParagraph(description);

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
            <Text style={styles.description}>{locations}</Text>
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

