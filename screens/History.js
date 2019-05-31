import React from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import FullWidthImage from '../constants/FullWidthImage'
import styles from '../constants/Style';
import NavigationBar from '../constants/NavigationBar';

var fullWidth = Dimensions.get('window').width; //full width
let convertImgurURL = (url, size) => url.slice(0,url.length-4) + size + url.slice(url.length-4, url.length)

class History extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let {data} = this.props.screenProps;
    const historyData = data["historical"];
    let display = [];
    
    Object.keys(historyData).forEach(function(key) {
      history = historyData[key];
      let imageURL = history["imageRef"];
      let desc = history["description"];
      let imgWidth = history["width"];
      let imgHeight = history["height"];
      imgHeight = fullWidth/imgWidth * imgHeight;
      let descView = (
        <View style={styles.card}>
          <Text style={[styles.description, {textAlign: 'justify'}]}>{desc}</Text>
        </View>
      );
      if(desc == ""){
        descView = null;
      }
      display.push(
        <View key={key}> 
          <View style={{
            minWidth: fullWidth,
            minHeight: imgHeight,
            backgroundColor: "#DBDBDB"
          }}>
            <FullWidthImage source={{uri: convertImgurURL(imageURL, 'h')}} />
          </View>
          
          {descView}
        </View>
      );
    });
    return (
      <NavigationBar {...this.props}>
        <ScrollView>
          <View style={styles.card}>
            <Text style={[styles.description, {textAlign: 'justify'}]}>This page is dedicated for all alumni whom may be interested in the brief history of flora in Hwa Chong. Are you able to guess which years were these photos taken? </Text>
          </View>
          {display}
        </ScrollView>
      </NavigationBar>
    );
      
  }

}

export default History;

