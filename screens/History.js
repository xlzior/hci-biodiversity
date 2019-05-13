import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import FullWidthImage from '../constants/FullWidthImage'
import styles from '../constants/Style';
import NavigationBar from '../constants/NavigationBar';


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
      let descView = (<View style={styles.card}>
        <Text style={[styles.description, {textAlign: 'justify'}]}>{desc}</Text>
      </View>);
      if(desc == ""){
        descView = null;
      }
      display.push(
        <View key={key}> 
          <FullWidthImage source={{uri: imageURL}} />
          {descView}
        </View>
      );
    });
    return (
      <NavigationBar {...this.props}>
        <ScrollView>
          {display}
        </ScrollView>
      </NavigationBar>
    );
      
  }

}

export default History;

