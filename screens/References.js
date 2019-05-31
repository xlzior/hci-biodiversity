
import React from 'react';
import { Text } from 'native-base';
import {View} from 'react-native';

import NavigationBar from '../constants/NavigationBar';
import styles from '../constants/Style';

export default class References extends React.Component {
  render() {
    return (
      <NavigationBar {...this.props}>
        <View style={styles.card}>
          <Text style={styles.description}>We would also like to acknowledge the key following sources of information for our writeups. We declare that no photographs from these sources have been used by us.</Text>
          <Text style={styles.description}>Chin, Jacqueline, and John Chin. John&Jacq's Garden. 2011. Accessed 2019. https://www.jaycjayc.com/.</Text>
          <Text style={styles.description}>Fern, Ken et al. "Useful Tropical Plants." Useful Tropical Plants. Accessed 2019. http://tropical.theferns.info/.</Text>
          <Text style={styles.description}>Flowers of India. Accessed 2019. http://www.flowersofindia.net/.</Text>
          <Text style={styles.description}>Master Gardener Program. 2019. Accessed 2019. https://wimastergardener.org/.</Text>
          <Text style={styles.description}>Missouri Botanical Garden. Accessed 2019. http://www.missouribotanicalgarden.org/.</Text>
          <Text style={styles.description}>Mound, Laurence A, Dom W Collins and Anne Hastings. Thysanoptera Britannica et Hibernica - Thrips of the British Isles. Lucidcentral.org, Identic Pty Ltd, Queensland, Australia. 2018. Accessed 2019. https://keys.lucidcentral.org</Text>
          <Text style={styles.description}>National Center for Biotechnology Information (NCBI). Accessed 2019. https://www.ncbi.nlm.nih.gov/.</Text>
          <Text style={styles.description}>National Library Board Singapore. eResources. 2019. Accessed 2019. http://eresources.nlb.gov.sg/.</Text>
          <Text style={styles.description}>National Parks Board (NParks). Accessed 2019. https://www.nparks.gov.sg/.</Text>
          <Text style={styles.description}>Plants For A Future. 2012. Accessed 2019. https://pfaf.org/user/Default.aspx.</Text>
          <Text style={styles.description}>Slik, Ferry et al. Plants of Southeast Asia. 2009. Accessed 2019. http://www.asianplant.net/.</Text>
          <Text style={styles.description}>Stuart, Godofredo U. StuartXchange. 2018. Accessed 2019. http://www.stuartxchange.org/.</Text>
          <Text style={styles.description}>Wikipedia. Accessed 2019. https://en.wikipedia.org/.</Text>
        </View>
      </NavigationBar>
    );
  }
}

