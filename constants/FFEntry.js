
import React, { Component } from 'react';
import styles from './Style';
import FullWidthImage from './FullWidthImage';
import { View, Text, Content } from 'native-base';

export default class FFEntry extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("details")["Name"],
    };
  };

 getParam = this.props.navigation.getParam;

  render() {
    let name = this.getParam("details")["Name"];
    let sciName = this.getParam("details")["SciName"];
    let description = this.getParam("details")["Description"];
    description = this.formatParagraph(description);
    let locations = this.getParam("details")["Locations"];
    let photo = this.getParam("details")["Photo"];
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

