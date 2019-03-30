
import React from 'react';
import { Text, H1, Card } from 'native-base';

import NavigationBar from '../constants/NavigationBar';
import styles from '../constants/Style';

export default class Acknowledgements extends React.Component {
  render() {
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

