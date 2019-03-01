import React from 'react';
import { ImageBackground, TouchableOpacity, Animated } from 'react-native';

export default class ClickableImage extends React.Component {
  constructor() {
    super()
    this.state = {
      height: 0,
      width: 0
    }
  }
  render() {
    let points = [
      { size: 100, top: 0.5, left: 0.5, pulse: 5 },
      { size: 50, top: 0.25, left: 0.5, pulse: 5 },
      { size: 30, top: 0.5, left: 0.25, pulse: 5 },
      { size: 50, top: 0.5, left: 0.75, pulse: 5 },
    ]
    let pulsingCircles = points.map((point, index) => {
      return (
        <PulsingCircle
          {...point}
          key={index}
          height={this.state.height}
          width={this.state.width}
        />
      )
    })
    return (
      <ImageBackground
        source={require('./../assets/blockD.jpg')}
        style={{width: '100%', height: '100%'}}
        onLayout={(e) => {
          let {height, width} = e.nativeEvent.layout
          this.setState({height, width})
        }}
      >
      {this.state.height > 0 ? pulsingCircles : null}
      </ImageBackground>
    )
  }
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

class PulsingCircle extends React.Component {
  constructor(props) {
    super(props)
    let { size, top, left, height, width } = this.props;
    let scaledTop = top*height-size/2
    let scaledLeft = left*width-size/2
    this.state = {
      scaledTop,
      scaledLeft,
      animSize: new Animated.Value(size),
      animTop: new Animated.Value(scaledTop),
      animLeft: new Animated.Value(scaledLeft)
    }
  }

  componentDidMount() {
    let { size, pulse } = this.props;
    let { scaledTop, scaledLeft, animSize, animTop, animLeft } = this.state;
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(animSize, { toValue: size+2*pulse, duration: 1000 }),
          Animated.timing(animTop, { toValue: scaledTop-pulse, duration: 1000 }),
          Animated.timing(animLeft, { toValue: scaledLeft-pulse, duration: 1000 }),
        ]),
        Animated.parallel([
          Animated.timing(animSize, { toValue: size, duration: 1000 }),
          Animated.timing(animTop, { toValue: scaledTop, duration: 1000 }),
          Animated.timing(animLeft, { toValue: scaledLeft, duration: 1000 })
        ])
      ])
    ).start()
  }

  render() {
    let { animSize, animTop, animLeft } = this.state;
    let { style } = this.props;

    return (
      <AnimatedTouchableOpacity
        style={{
          ...style,
          position: 'absolute',
          borderWidth: 3,
          borderColor: 'gold',
          borderRadius: animSize,
          height: animSize,
          width: animSize,
          top: animTop,
          left: animLeft
        }}
      >
      </AnimatedTouchableOpacity>
    );
  }
}