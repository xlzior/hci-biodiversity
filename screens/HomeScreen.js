
import NavigationBar from '../navigation/NavigationBar';
import { View, Text, Button } from 'native-base';
import {Image} from 'react-native';
import React from 'react';
import styles from '../constants/Style';
import FullWidthImage from '../constants/FullWidthImage';

export default class HomeScreen extends React.Component {
    render() {
        console.log(this.props.navigation.state);
        return (
          <NavigationBar {...this.props}>
          <Image
            style={styles.image}
            source={require('../assets/homeimage.png')}
          />
            <View style={styles.container}>
                <Text style={styles.title}>
                  A Garden Campus
                </Text>
                <Text style={styles.subtext}>
                  In celebration of Hwa Chong's 100th Anniversary
                </Text>
                <Text style={styles.paragraph}>
                  Welcome to Hwa Chong's very own Biodiversity Trails app!
                </Text>
                <Text style={styles.paragraph}>
                  Explore the extensive flora and fauna of our garden campus with interactive maps and bite-sized writeups 
                </Text>
                <View flex style={{height: 50}}/>
                <View flex style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Button info
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate("Map", {test: "Moooo"})}
                  >
                    <Text>Let's Go!</Text>
                  </Button>
                </View>  
            </View>
          </NavigationBar>
        );
      }
}