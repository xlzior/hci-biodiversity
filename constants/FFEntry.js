
import React, { Component } from 'react';
import styles from './Style';
import FullWidthImage from './FullWidthImage';
import { View, Text, Content } from 'native-base';

export default class FFEntry extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', ''),
    };
  };

 getParam = this.props.navigation.getParam;

  render() {
    let name = this.getParam('name', '');
    let sciname = this.getParam('sciname', '');
    let description = this.getParam('description', '');
    description = this.formatParagraph(description);
    let locations = this.getParam('locations', '');
    let photo = this.getParam('photo', '');
    let image;
    if(photo != 'none'){
      image = <FullWidthImage
        style={styles.contentImage}
        source={{uri: photo}}
      />
    }

    return (
      <Content>
        <View>
          {image}
        </View>
        <View style={{padding:20}}>
          <View style={{marginBottom: 100}}>
            <Text style={styles.lefttitle}>{name}</Text>
            <Text style={styles.subtitle}>{sciname}</Text>

            <Text style={styles.description}>{description}</Text>

            <Text style={styles.lefttitle2}>Location(s): </Text>
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

