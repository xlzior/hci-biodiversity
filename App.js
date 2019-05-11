import React from 'react';
import { Image } from 'react-native';
import { Font, Asset, AppLoading } from 'expo';
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

  fetchFromFirebase(datastoreRef) {
    let data = {}
    return datastoreRef.once("value", datastore => {
      datastore.forEach(element => {
        data[element.key] = element.val();
      });
    }).then(() => {
      this.setState({data})
    }).catch(() => {
      console.log('Failed to fetch data from firebase')
    })
  }
  
  async loadData(){
    let fontAssets = Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Lato': require('./assets/Lato-Regular.ttf'),
      'Lato-Italic': require('./assets/Lato-Italic.ttf'),
      'Precious': require('./assets/Precious.ttf')
    });
    
    let imageAssets = cacheImages([
      require('./assets/fauna.jpg'),
      require('./assets/flora.jpg'),
      require('./assets/homeimage.jpg')
    ]);
    
    let dataAssets = this.fetchFromFirebase(this.datastoreRef);
    
    return Promise.all([dataAssets, ...imageAssets, fontAssets])
  }

  render() {
    if (!this.state.dataLoaded) {
      return (
        <AppLoading
          startAsync={() => this.loadData()}
          onFinish={() => this.setState({ dataLoaded: true })}
          onError={console.log}
        />
      );
    }

    return <RootDrawer screenProps={{data: this.state.data}} />;
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
