import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './constants/Style';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import Map from './screens/Map';
import FFList from './screens/FFList';
import Acknowledgements from './screens/Acknowledgements';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      data: {},
      last_update: ""
    }
    //this.datastoreRef = firebaseApp.database().ref();
  }

  render() {
    let {dataLoaded} = this.state;
    if (!dataLoaded) 
      return (
        <View style={styles.center}>
          <Text>Loading...</Text>
        </View>
      );

    return (
      <RootDrawer screenProps={data=this.state.data}/>
    );
  }

  listenForItems(datastoreRef) {
    let data = {};
    //Placeholder firebase data
    let fireBaseData = {
      'Flora&Fauna':{
        'Fauna-1':{
          'Name': 'Common Grackle',
          'Sciname': 'Quiscalus quiscula',
          'Description': 'A small blue bird that flies around',
          'Locations': 'Location-1\nLocation-2',
          'Photo': 'https://i.ytimg.com/vi/tQN-6GSNa_g/hqdefault.jpg'
        },
        'Flora-1':{
          'Name': 'A Flower',
          'Sciname': 'Flowerus Bloomus',
          'Description': 'A small less blue flower that flies around. Also has an extremely long description just for the purposes of testing text wrapping because I have too much time and can afford to type out this entire thing.',
          'Locations': 'Location-3\nLocation-4',
          'Photo': 'https://economictimes.indiatimes.com/blogs/wp-content/uploads/2017/10/Marigold_bccl.jpg'
        },
        'Flora-2':{
          'Name': 'Melastoma Malabathricum',
          'Sciname': 'Melastoma Malabathricum',
          'Description': 'A small slightly less blue flower that does not fly around.',
          'Locations': 'Location-3\nLocation-4',
          'Photo': 'http://keys.trin.org.au/key-server/data/0e0f0504-0103-430d-8004-060d07080d04/media/Images/1778012.jpg'
        },
        'Flora-3':{
          'Name': 'Desert Rose',
          'Sciname': 'Adenium Obesum',
          'Description': 'Often known as the desert rose, this succulent shrub is well-adapted to its native African desert environment with its caudex-shaped swollen, obese stem for water storage, from which its specific epithet  ‘obesum’  is derived. It also has fleshy roots where water is stored. Its luxurious, dark green foliages are adorned with showy blossoms of vibrant colours.  But be careful, for its sap is poisonous, and is often used as arrow and fish poison!',
          'Locations': 'Location-3\nLocation-4',
          'Photo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Adenium-obesum-001.jpg/220px-Adenium-obesum-001.jpg'
        }
      }
    };
    data = fireBaseData;
    // datastoreRef.once("value", datastore => {
    //   datastore.forEach(element => {
    //     data[element.key] = element.val();
    //     this.storeAsync(element.key, element.val());
    //   });

       let last_update = JSON.stringify(new Date().toISOString());
       this.setState({data, last_update})
       //AsyncStorage.setItem("last_update", last_update);
    // });
  }
  
  async loadData(){
    this.listenForItems(this.datastoreRef);
  }

  async componentDidMount() {
	  this.loadData()
    .then(() => this.setState({ dataLoaded: true}))
  }
}

const RootDrawer = createAppContainer(createDrawerNavigator({
  Home: HomeScreen,
  Map: Map,
  'Flora and Fauna': FFList,
  Acknowledgements: Acknowledgements
},
{
  initialRouteName: 'Home',
  titleOffset: 50,
}));


