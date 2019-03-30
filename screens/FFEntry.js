
import React, { Component } from 'react';
import { View, Text, Content } from 'native-base';

import FullWidthImage from '../constants/FullWidthImage';
import styles from '../constants/Style';

export default class FFEntry extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("details")["Name"],
    };
  };

  render() {
    let {Name, SciName, Description, Locations, Photo} = this.props.navigation.getParam("details");
    Description = this.formatParagraph(Description);
    let image;
    if(Photo != 'none'){
      image = <FullWidthImage
        source={{uri: Photo}}
      />
    }

    return (
      <Content>
        <View>
          {image}
        </View>
        <View style={{padding:20}}>
          <View style={{marginBottom: 100}}>
            <Text style={styles.leftTitle}>{Name}</Text>
            <Text style={styles.subtitle}>{SciName}</Text>

            <Text style={styles.description}>{Description}</Text>

            <Text style={styles.leftTitle2}>Location(s): </Text>
            <Text style={styles.description}>{Locations}</Text>
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

