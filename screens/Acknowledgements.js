
import NavigationBar from '../navigation/NavigationBar';
import { View, Text, Button } from 'native-base';
import {Image} from 'react-native';
import React from 'react';
import styles from '../constants/Style';
import FullWidthImage from '../constants/FullWidthImage';

export default class Acknowledgements extends React.Component {
    render() {
        console.log(this.props.navigation.state);
        return (
          <NavigationBar {...this.props}>
          </NavigationBar>
        );
      }
}