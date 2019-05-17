
import React from 'react';
import { Text } from 'native-base';
import {View} from 'react-native';

import NavigationBar from '../constants/NavigationBar';
import styles from '../constants/Style';

export default class Introduction extends React.Component {
  render() {
    return (
      <NavigationBar {...this.props}>
        <View style={styles.card}>
          <Text style={styles.title}>Introduction to Nature in{"\n"}Hwa Chong</Text>
          <Text style={styles.subtext}>海天辽阔 云树苍龙{"\n"}中有我华中</Text>
          <Text>{"\n"}</Text>

          <Text style={[styles.description, {textAlign: 'justify'}]}>Hwa Chong is blessed with a beautiful campus, with a plethora of flora and fauna. The tall trees and extensive bushes stand as testament to many years of cultivation, reflecting the school’s long-standing dedication as a premier institution that grooms generations of leaders in research, industry and government.</Text>
          <Text style={[styles.description, {textAlign: 'justify'}]}>Amongst the historic buildings and the state-of-the-art facilities stand many thoughtfully arranged trees, shrubs and bushes, all of which contribute to the beauty of our campus. The trees lining the top of the terraces provide shade after sports training, while some plants specimens used for dissections in biology classes are grown in-house.</Text>
          <Text style={[styles.description, {textAlign: 'justify'}]}>Moreover, it is fortunate that Singapore is situated along the East Asian-Australasian Migratory flyway, acting as an important stopover point for birds. Thus, one can see many species of birds hidden among the trees.</Text>
          <Text style={[styles.description, {textAlign: 'justify'}]}>With the flora and fauna closely complementing one another, the school has successfully shaped itself into a garden campus, attracting birds, butterflies and other forms of wildlife to flourish among us.</Text>
          <Text style={styles.subtext}>饮水思源 厚德载物</Text>
          <Text style={[styles.description, {textAlign: 'justify'}]}>The flora in our school is also a reflection of the school’s emphasis its Chinese values. Many of the school’s trees and plants were donated by the school alumni - a strong testimony of the value of 饮水思源.</Text>
          <Text style={[styles.description, {textAlign: 'justify'}]}>It is only with the devotion and dedication of generations of members of the Hwa Chong family that we are able to experience the exquisite garden campus today.</Text>
          <Text style={[styles.description, {textAlign: 'justify'}]}>This year, we are pleased to document and share the rich biodiversity of the school with everyone else. We present a specially curated list of flora and fauna, accompanied by a beautiful compendium of photos in an application and website. Do spare some time and allow yourself to be enthralled by the beauty of our school, our second home. </Text>
 
        </View>
      </NavigationBar>
    );
  }
}

