
import NavigationBar from '../navigation/NavigationBar';
import { H1, View, Text } from 'native-base';
import {Image} from 'react-native';
import React from 'react';
import styles from '../constants/Style';
import FullWidthImage from '../constants/FullWidthImage';

export default class HomeScreen extends React.Component {
    render() {
        console.log(this.props.navigation.state);
        return (
          <NavigationBar {...this.props}>
          <FullWidthImage
            source={require('../assets/homeimage.jpg')}
          />
            <View style={styles.container}>
                <Text style={styles.title}>
                  A Garden Campus
                </Text>
                <Text style={styles.subtext}>
                  In celebration of Hwa Chong's 100th Anniversary
                </Text>
            </View>
          </NavigationBar>
        );
      }
}