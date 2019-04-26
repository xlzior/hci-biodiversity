import React from 'react';
import { ImageBackground, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
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
      position: 'absolute',
      top: phoneWidth/2.568493151,
      left: -phoneWidth/2.568493151,
      right: 0,
      bottom: 0,
      height: phoneWidth,
      width: phoneHeight,
      transform: [{rotate: '90deg'}]
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
          phoneWidth={phoneWidth}
        />
      )
    })
    if (!this.props.image) return null
    return (
      <ImageBackground
        source={this.props.image}
        style={style}
        onLayout={(e) => {
          let {height, width} = e.nativeEvent.layout;
          this.setState({height, width})
        }}
        ref={view => this.imageBackground = view}
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
    let { size, top, left, height, width, landscape, phoneWidth } = this.props;
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
    let { params, data } = this.props;
    let details = getFFEntryDetails(params.name,data);

    return (
      <AnimatedTouchableOpacity
        style={{
          position: 'absolute',
          borderWidth: 3,
          borderColor: (params.name.indexOf('flora') >= 0) ? 'gold' : 'skyblue',
          borderRadius: animSize,
          height: animSize,
          width: animSize,
          top: animTop,
          left: animLeft
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