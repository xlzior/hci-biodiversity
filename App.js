import React from 'react';
import {Image} from 'react-native';
import { Text, View } from 'native-base';
import { Font, Asset } from 'expo';
import styles from './constants/Style';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import * as firebase from 'firebase';
import HomeScreen from './screens/HomeScreen';
import MapView from './screens/Map';
import FFList from './screens/FFList';
import Acknowledgements from './screens/Acknowledgements';

const firebaseConfig = {
  apiKey: "AIzaSyBqqlRStr494376E0fE4Fg17LATiUYxNCI",
  authDomain: "hci-biodiversity.firebaseapp.com",
  databaseURL: "https://hci-biodiversity.firebaseio.com",
  storageBucket: "hci-biodiversity.appspot.com"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      console.log("Attempting prefetch");
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      data: {},
    }
    this.datastoreRef = firebaseApp.database().ref();
  }

  render() {
    if (!this.state.dataLoaded) {
      return (
        <View style={styles.center}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <RootDrawer screenProps={{
        data: this.state.data
      }}/>
    );
  }

  fetchFromFirebase(datastoreRef) {
    let data = {}
    datastoreRef.once("value", datastore => {
      datastore.forEach(element => {
        data[element.key] = element.val();
      });
    }).then(() => {
      this.setState({data})
    })
  }
  
  async loadData(){
    let fontLoading = Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Lato': require('./assets/Lato-Regular.ttf'),
      'Lato-Italic': require('./assets/Lato-Italic.ttf'),
      'Precious': require('./assets/Precious.ttf')
    });
    
    cacheImages([
      require('./assets/fauna.jpg'),
      require('./assets/flora.jpg'),
      require('./assets/homeimage.png')
    ]);
    
    let dataLoading = this.fetchFromFirebase(this.datastoreRef);
    
    return Promise.all([dataLoading, fontLoading])
  }

  async componentDidMount() {
	  this.loadData()
    .then(() => {
      this.setState({ dataLoaded: true})
      console.log("Done loading data");
    })
  }
}

const RootDrawer = createAppContainer(createDrawerNavigator({
  Home: HomeScreen,
  Map: MapView,
  'Flora and Fauna': FFList,
  Acknowledgements: Acknowledgements
},
{
  initialRouteName: 'Home',
  titleOffset: 50,
}));
