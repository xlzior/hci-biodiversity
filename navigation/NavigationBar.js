import React, { Component } from 'react';
import { Container, Content, Header, Title, Body, Left, Right, Button, Icon, View } from 'native-base';
import styles from '../constants/Style';

export default class NavigationBar extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Body style={{flex: 1}}>
            <Title style={styles.header}>{this.props.navigation.state.routeName}</Title>
          </Body>
          <Left style={{position: 'absolute', left: 0, bottom: 0}}>
            <Button transparent onPress={()=>this.props.navigation.toggleDrawer()}>
              <Icon type='MaterialIcons' name='menu' />
            </Button>
          </Left>
          <Right  style={{flex:0}}/>
        </Header>
        <Content>
          {this.props.children}
        </Content>
      </Container>
    )
  }
}