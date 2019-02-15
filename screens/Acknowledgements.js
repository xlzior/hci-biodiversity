
import NavigationBar from '../navigation/NavigationBar';
import { Text, H1, Card } from 'native-base';
import {Image} from 'react-native';
import React from 'react';
import styles from '../constants/Style';
import FullWidthImage from '../constants/FullWidthImage';

export default class Acknowledgements extends React.Component {
  render() {
    console.log(this.props.navigation.state);
    return (
      <NavigationBar {...this.props}>
        <Card style={styles.card}>
          <H1>Acknowledgements</H1>
          <Text>This application was created by students from Hwa Chong Infocomm and Robotics Society in Conjuction with the Science Students' Research Council.</Text>
        </Card>
      </NavigationBar>
    );
  }
}

