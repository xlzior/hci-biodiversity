import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './constants/Style';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './screen/HomeScreen';

export default class App extends React.Component {
  render() {
    return (
      <RootDrawer />
    );
  }
}

const RootDrawer = createAppContainer(createDrawerNavigator({
  Home: HomeScreen
},
{
  initialRouteName: 'Home'
}));


