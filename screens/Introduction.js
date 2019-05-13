
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
          <Text style={styles.title}>Introduction</Text>
          <Text style={styles.littleTitle}>海天辽阔 云树苍龙 中有我华中</Text>
          <Text>{"\n"}</Text>
          <Text style={styles.description}>Hwa Chong is blessed with a beautiful campus, with a plethora of flora and fauna. The tall trees and extensive bushes in our school stand as testament to many years of cultivation and care. Indeed, their age reflects upon the school’s long-standing dedication as a premier institution that that grooms generations of leaders in research, industry and government.</Text>

          <Text style={styles.description}>Amongst the historic buildings and the state-of-the-art facilities stand many thoughtfully arranged old trees, shrubs and bushes, all of which play an integral part in contributing to the beauty of our campus. Students often rest under the trees lining the top of the terraces after sports training, while some plants specimens found in our school used for dissections in biology classes.</Text>

          <Text style={styles.description}>Moreover, it is fortunate that Singapore is situated along the East Asian-Australasian Migratory flyway, acting as an important stopover point for migratory birds. Along with the lush greenery and a vast diversity of flora, it is not uncommon to see many species of birds residing in the canopies of various trees all around our school at different times of the year.</Text>
          
          <Text style={styles.description}>With the flora and fauna closely complementing one another, the school has successfully shaped itself into a garden campus, attracting birds, butterflies and other forms of wildlife to flourish among us.</Text>

          <Text>{"\n"}</Text>
          <Text style={styles.littleTitle}>饮水思源 厚德载物</Text>
          <Text style={styles.description}>The flora in our school is also a reflection of the school’s emphasis its Chinese values. Many of the school’s trees and plants were donated by the school alumni over the past few decades - a strong testimony of the value of 饮水思源.</Text>

          <Text style={styles.description}>It is only with the devotion and dedication of countless generations of Hwa Chong staff and students that we are able to experience the exquisite garden campus today.</Text>

          <Text style={styles.description}>Hence, this year, on Hwa Chong’s 100th anniversary, we are pleased to document and share the rich biodiversity of the school with everyone else. We have presented a specially curated list of flora and fauna, accompanied by a beautiful compendium of photos in an easy-to-access application and a convenient website, to accentuate the beauty of the school. We hope that you will spare some time and allow yourself to be enthralled by the beauty of our school, our second home. </Text>
        </View>
      </NavigationBar>
    );
  }
}

