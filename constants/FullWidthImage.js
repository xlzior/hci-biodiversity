import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import { View } from 'native-base';

export default class FullWidthImage extends Component {
  constructor() {
    super();
    
    this.state = {
      width: 0,
      height: 0,
      isMounted: true
    };
  }
  
  componentWillUnmount(){
    this.setState( { isMounted: false } )
  }
  
  _onLayout(event) {
    const containerWidth = Dimensions.get('window').width;
    if(!this.state.isMounted) return;
    if (this.props.ratio) {
      this.setState({
        width: containerWidth,
        height: containerWidth * this.props.ratio
      });
    } else {
      Image.getSize(this.props.source.uri, (width, height) => {
        this.setState({
          width: containerWidth,
          height: containerWidth * height / width
        });
      });
      
    }
  }
  
  render() {
    return (
      <View onLayout={this._onLayout.bind(this)}>
      <Image
      source={this.props.source}
      style={{
        width: this.state.width,
        height: this.state.height
      }} />
      </View>
      );
    }
  }