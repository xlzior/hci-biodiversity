import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './constants/Style';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import Map from './screens/Map';
import FFList from './screens/FFList';
import Acknowledgements from './screens/Acknowledgements';

export default class App extends React.Component {
  render() {
    return (
      <RootDrawer />
    );
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


