
import React from 'react';
import { Text } from 'native-base';
import {View} from 'react-native';

import NavigationBar from '../constants/NavigationBar';
import styles from '../constants/Style';

export default class Acknowledgements extends React.Component {
  render() {
    return (
      <NavigationBar {...this.props}>
        <View style={styles.card}>
          <Text style={styles.title}>Acknowledgements</Text>
          <Text style={styles.subtext}>“If I have seen further, it is by standing on the shoulders of giants.” - Sir Isaac Newton</Text>
          <Text>{"\n"}</Text>
          <Text style={styles.description}>This project would certainly not have been possible without the generous assistance of many of our Hwa Chong teachers, alumni and students.. </Text>

          <Text style={styles.description}>We would like to express our heartfelt appreciation and sincere gratitude to our Principal Mr. Pang Choon How and Deputy Principals for their support; in particular, Deputy Principal/Special Projects, Mr. Tan Pheng Tiong for sharing with us more about Hwa Chong’s rich history and landscaping, as well as the historical photographs of the school; Dean of Research Studies, Dr. Chia Hui Ping, for sharing her expertise and knowledge in Botany with us; Dr. Lim Jit Ning, for his endless encouragement; Dr. Adeline Chia, for her guidance and mentorship throughout this entire journey; Dr. Sandra Tan, for her invaluable recommendations and assistance in the publicity of the project, as well as vetting of write-ups; Mr. Tang Koon Loon and Mr. Lau Soo Yen, for sharing their passion for birds and vivid photographs of fauna in the school with us; Mr. Mark Tan, for his innovative suggestions, comprehensive proofreading of the write-ups, and training us as trail guides; together with Ms. Tan Wei Qian, for her constructive suggestions concerning the write-ups.</Text>

          <Text style={styles.description}>We would also like to extend our gratitude to school alumni who have contributed to our school landscape. In particular to Mr. Mak Chin On, for the contributions of fauna that he has made over the past few decades, and for sharing his wealth of knowledge on the great variety of trees in the school with us.</Text>

          <Text style={styles.description}>The estate staff and school gardeners are our unsung heroes - working tirelessly over many years to shape the landscape in school, amd making it the thriving Garden Campus it is today.</Text>

          <Text style={styles.description}>Last but not least, we would like thank the school for providing us with the opportunity to work on this very meaningful project. This journey has taught us to appreciate Hwa Chong from a different perspective, and proves that this hundred year-old campus still has many surprises waiting to be uncovered.</Text>

          <Text style={styles.description}>This work is dedicated to all the giants in our lives.</Text>
          <Text>{"\n"}</Text>
          <Text style={styles.leftTitle2}>Biodiversity Trails Student Committee</Text>
          <Text style={styles.description}>Members of the student committee who have made contributions, in one way or another, to various aspects of the project are listed below</Text>

          <Text>{"\n"}</Text>

          <Text style={styles.leftTitle2}>Write-ups for Flora</Text>
          <Text style={styles.description}>Hu Yi</Text>
          <Text style={styles.description}>Sin Wei Chuen</Text>
          <Text style={styles.description}>Li Tanfei</Text>
          <Text style={styles.description}>Li Ming Jun</Text>
          <Text style={styles.description}>Sae Xilong</Text>
          <Text style={styles.description}>Cheong Huey Yew</Text>
          <Text style={styles.description}>Jenny Ma Junyi</Text>
          <Text style={styles.description}>Ong Wei Jun</Text>
          <Text>{"\n"}</Text>

          <Text style={styles.leftTitle2}>Write-ups for Fauna</Text>
          <Text style={styles.description}>Fan Xilin</Text>
          <Text style={styles.description}>Shan Yunhong</Text>
          <Text>{"\n"}</Text>

          <Text style={styles.leftTitle2}>Photography</Text>
          <Text style={styles.description}>Amanda Koh Kai Yen</Text>
          <Text style={styles.description}>Winnie Lim Wen Ying</Text>
          <Text style={styles.description}>Faith Teo Kai En</Text>
          <Text style={styles.description}>Cheong Huey Yew</Text>
          <Text style={styles.description}>Jenny Ma Junyi</Text>
          <Text>{"\n"}</Text>

          <Text style={styles.leftTitle2}>Website Design</Text>
          <Text style={styles.description}>Faith Teo Kai En</Text>
          <Text style={styles.description}>Winnie Lim Wen Ying</Text>
          <Text>{"\n"}</Text>

          <Text style={styles.leftTitle2}>App Design</Text>
          <Text style={styles.description}>Lye Wen Jun</Text>
          <Text style={styles.description}>Leonard Ong Rui Fu</Text>

        </View>
      </NavigationBar>
    );
  }
}

