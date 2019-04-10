import React from 'react';
import { ImageBackground, Image, TouchableOpacity, Animated, View, Dimensions } from 'react-native';
import getFFEntryDetails from '../constants/FFEntryFetcher';

export default class ClickableImage extends React.Component {
  constructor() {
    super()
    this.state = {
      height: 0,
      width: 0,
      imageHeight: -1,
      imageWidth: -1
    }
  }

  componentDidMount() {
    if (this.props.image && 'uri' in this.props.image) {
      Image.getSize(this.props.image.uri, (imageHeight, imageWidth) => {
        this.setState({imageHeight, imageWidth})
      })
    }
  }

  render() {
    let phoneHeight = Dimensions.get('window').height;
    let phoneWidth = Dimensions.get('window').width;
    let {imageHeight, imageWidth} = this.state;

    if (imageHeight < 0) return null
    let landscape = imageHeight > imageWidth;
    // rotate the image if it's in landscape orientation
    let style = landscape ?
    {
      height: phoneWidth+20,
      width: phoneHeight-50,
      transform: [{ rotate: '90deg' }, { translateY: phoneWidth/3 }, { translateX: 100 }]
    } :
    {
      height: '100%',
      width: '100%'
    }
    
    let pulsingCircles = this.props.points.map((point, index) => {
      return (
        <PulsingCircle
          {...this.props}
          {...point}
          key={index}
          height={this.state.height}
          width={this.state.width}
          landscape={landscape}
        />
      )
    })

    if (!this.props.image) return null
    return (
      <ImageBackground
        source={this.props.image}
        style={style}
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
    console.log('pulsing circle dimensions', height, width)
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
    let { params, data, landscape } = this.props;
    let details = getFFEntryDetails(params.name,data);

    let shiftedPositions = landscape ?
    {
      right: animTop,
      top: animLeft
    } :
    {
      top: animTop,
      left: animLeft
    }
    return (
      <AnimatedTouchableOpacity
        style={{
          position: 'absolute',
          borderWidth: 3,
          borderColor: (params.name.indexOf('flora') >= 0) ? 'gold' : 'skyblue',
          borderRadius: animSize,
          height: animSize,
          width: animSize,
          ...shiftedPositions
        }}
        onPress={() => this.props.navigation.navigate({
          routeName: 'FFEntry',
          params: {details},
          goBack: 'Overview',
          key: 'Overview'
        })}
      >
      </AnimatedTouchableOpacity>
    );
  }
}