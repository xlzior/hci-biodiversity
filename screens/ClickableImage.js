import React from 'react';
import { ImageBackground, Image, TouchableOpacity, Animated, Dimensions, View } from 'react-native';
import getFFEntryDetails from '../constants/FFEntryFetcher';

export default class ClickableImage extends React.Component {
  constructor() {
    super()
    this.state = {
      layoutHeight: 0,
      layoutWidth: 0,
      imageHeight: -1,
      imageWidth: -1
    }
  }

  componentWillMount(){
    this.mounted = true;
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  setState(state){
    if(this.mounted) super.setState(state);
  }

  componentDidMount() {
    if (this.props.image && 'uri' in this.props.image) {
      Image.getSize(this.props.image.uri, (imageWidth, imageHeight) => {
        this.setState({imageWidth, imageHeight})
      })
    }
  }

  render() {
    let phoneHeight = Dimensions.get('window').height;
    let phoneWidth = Dimensions.get('window').width;
    let {imageHeight, imageWidth, layoutHeight, layoutWidth} = this.state;

    if (imageHeight < 0) return null
    if (!this.props.image) return null

    // generate pulsing circles
    let pulsingCircles = this.props.points.map((point, index) => {
      return (
        <PulsingCircle
          {...this.props}
          {...point}
          key={index}
          layoutHeight={layoutHeight}
          layoutWidth={layoutWidth}
        />
      )
    })
    
    // rotate the image if it's in landscape orientation
    let landscape = imageHeight < imageWidth;
    let scaledImageHeight, scaledImageWidth, offset
    if (landscape) {
      scaledImageWidth = imageWidth/imageHeight*phoneWidth
      scaledImageHeight = phoneWidth
      offset = scaledImageWidth / 2 - scaledImageHeight / 2
    } else {
      scaledImageWidth = phoneWidth
      scaledImageHeight = imageHeight/imageWidth*phoneHeight
    }
    return (
      <View
        style={{
          height: Math.max(scaledImageHeight, scaledImageWidth),
          width: Math.min(scaledImageHeight, scaledImageWidth)
        }}
      >
        <ImageBackground
          source={this.props.image}
          style={[
            {
              height: scaledImageHeight,
              width: scaledImageWidth,
            },
            landscape ? {
              transform: [{rotate: '90deg'}, {translateX: offset}, {translateY: offset}]
            } : null
          ]}
          onLayout={(e) => {
            let {height, width} = e.nativeEvent.layout;
            this.setState({layoutHeight: height, layoutWidth: width})
          }}
        >
        {layoutHeight > 0 ? pulsingCircles : null}
        </ImageBackground>
      </View>
    )
  }
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

class PulsingCircle extends React.Component {
  constructor(props) {
    super(props)
    let { size, top, left, layoutHeight, layoutWidth } = this.props;
    let scaledTop = top*layoutHeight-size/2
    let scaledLeft = left*layoutWidth-size/2
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
    let { animSize, animTop, animLeft, scaledTop, scaledLeft } = this.state;
    let { params, data } = this.props;
    let details = getFFEntryDetails(params.name,data);

    if (params.name == "MISSING INFO") return null
    /* FAUNA */
    if (params.name.includes('fauna')) return (
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: scaledTop,
          left: scaledLeft
        }}
        onPress={() => this.props.navigation.navigate({
          routeName: 'FFEntry',
          params: {details, markers: this.props.markers},
          goBack: 'Overview',
          key: 'Overview'
        })}
      >
        <Image
          source={{uri: details.smallImage}}
          style={{height: 40, width: 40, borderRadius: 20, borderWidth: 2, borderColor: 'white'}}
        />
      </TouchableOpacity>
    )

    /* FLORA */
    else return (
      <AnimatedTouchableOpacity
        style={{
          position: 'absolute',
          borderWidth: 3,
          borderColor: 'gold',
          borderRadius: animSize,
          height: animSize,
          width: animSize,
          top: animTop,
          left: animLeft
        }}
        onPress={() => this.props.navigation.navigate({
          routeName: 'FFEntry',
          params: {details, markers: this.props.markers},
          goBack: 'Overview',
          key: 'Overview'
        })}
      >
      </AnimatedTouchableOpacity>
    );
  }
}