import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import { View } from 'native-base';

export default class FullWidthImage extends Component {
  constructor() {
    super();
    
    this.state = {
      width: 0,
      height: 0
    };
  }

  componentWillMount(){
    this.mounted = true;
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  setState(state){
    if(this.mounted)
      super.setState(state);
  }
  
  _onLayout(event) {
    const containerWidth = Dimensions.get('window').width;
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
      <View style={{backgroundColor:'#ededed'}} onLayout={this._onLayout.bind(this)}>
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