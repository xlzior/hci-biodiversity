
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

  state = {
    imageURL: "",
    isMounted: true
  }

  
  componentWillUnmount(){
    this.setState( { isMounted: false } )
  }

  componentDidMount() {
    if(!this.state.isMounted) return;
    let {ImageRef} = this.props.navigation.getParam("details");
    this.props.screenProps.imagesRef.child(ImageRef).getDownloadURL()
    .then(imageURL => {
      this.setState({ imageURL })
      console.log('imageURL: ', imageURL);
    })
  }

  render() {
    let {Name, SciName, Description, Locations} = this.props.navigation.getParam("details");
    Description = this.formatParagraph(Description);

    console.log('RENDER this.state.imageURL: ', this.state.imageURL);
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

