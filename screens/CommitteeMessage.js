
import React from 'react';
import { Text } from 'native-base';
import {View} from 'react-native';

import NavigationBar from '../constants/NavigationBar';
import styles from '../constants/Style';

export default class CommitteeMessage extends React.Component {
  render() {
    return (
      <NavigationBar {...this.props}>
        <View style={styles.card}>
          <Text style={styles.title}>Message from the HC Garden Committee</Text>
          <Text style={styles.subtext}>‘If you truly love Nature, you will find beauty everywhere.’ - Vincent van Gogh</Text>
          <Text>{"\n"}</Text>

          <Text style={[styles.description, {textAlign: 'justify'}]}>As a group of nature lovers in Hwa Chong, we set out to discover the legacy of beauty in the greenery of our garden campus. Identifying the plethora of flora and fauna seemed daunting at first, but we ended up deeply enthralled by the boundless biodiversity in our school and the rich history behind it. </Text>
          <Text style={[styles.description, {textAlign: 'justify'}]}>We were also amazed by the amount of devotion behind the landscape of Hwa Chong - some plants are donations from alumni, while others are selections by teachers for biology class. The healthy ecosystem created by the artfully designed green spaces allowed a great variety of birds and insects to thrive on campus, bringing us closer to nature.</Text>
          <Text style={[styles.description, {textAlign: 'justify'}]}>Indeed, the excitement of identifying species and learning about the intriguing characteristics of each of them drove us to become more curious and observant each time we wander around in school. Every time we pause and marvel at the plants around us, we become more determined to inspire our friends to appreciate the beauty around us. With our website and mobile app that present selected flora and fauna on campus, we hope that you would also take time to wander, and pay attention to the hidden gems on our garden campus.</Text>
        </View>
      </NavigationBar>
    );
  }
}

