import React from 'react';
import { ImageBackground, TouchableOpacity, StyleSheet, View, Animated } from 'react-native';
import { Text } from 'native-base';

export default class ClickableImage extends React.Component {
  render() {
    let whiteTags = (
      <View style={{width: '100%', height: '100%'}}>
        <TouchableOpacity
          style={[styles.button, {top: "70%", left: "20%", borderBottomLeftRadius: 0}]}
          onPress={() => console.log('HELLLOOOO')}
        >
          <Text style={styles.text}>Bush</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {top: "50%", left: "50%", borderBottomRightRadius: 0}]}
          onPress={() => console.log('HELLLOOOO')}
        >
          <Text style={styles.text}>Tree</Text>
        </TouchableOpacity>
      </View>
    )
    let greyCircle = (
      <View style={{width: '100%', height: '100%'}}>
        <PulsingCircle />
      </View>
    )
    return (
      <ImageBackground
        source={require('./../assets/blockD.jpg')}
        style={{width: '100%', height: '100%'}}
      >
        {greyCircle}
      </ImageBackground>
    )
  }
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

class PulsingCircle extends React.Component {
  state = {
    size: new Animated.Value(70),
    top: new Animated.Value(80),
    left: new Animated.Value(80)
  }

  componentDidMount() {
    let { size, top, left } = this.state;
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(size, { toValue: 80, duration: 1000 }),
          Animated.timing(top, { toValue: 75, duration: 1000 }),
          Animated.timing(left, { toValue: 75, duration: 1000 }),
        ]),
        Animated.parallel([
          Animated.timing(size, { toValue: 70, duration: 1000 }),
          Animated.timing(top, { toValue: 80, duration: 1000 }),
          Animated.timing(left, { toValue: 80, duration: 1000 })
        ])
      ])
    ).start()
  }

  render() {
    let { size, top, left } = this.state;
    let { style } = this.props;

    return (
      <AnimatedTouchableOpacity
        style={{
          ...style,
          position: 'absolute',
          top: top,
          left: left,
          borderWidth: 3,
          borderColor: 'lightgrey',
          borderRadius: 40,
          height: size,
          width: size
        }}
      >
      </AnimatedTouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  'button': {
    backgroundColor: 'white',
    position: 'absolute', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
  },
  'text': {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10
  }
})