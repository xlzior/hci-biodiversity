import React, { Component } from 'react';
import { Container, Content, Header, Title, Body, Left, Right, Button, Icon, View } from 'native-base';
import styles from './Style';

export default class NavigationBar extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Body style={{alignItems: 'center', flex: 1}}>
            <Title style={styles.header}>{this.props.navigation.state.routeName}</Title>
          </Body>
          <Left style={{position: 'absolute', left: 5, bottom: 0}}>
            <Button transparent onPress={()=>this.props.navigation.toggleDrawer()}>
              <Icon type='MaterialIcons' name='menu' />
            </Button>
          </Left>
          <Right style={{flex: 0}}/>
        </Header>
        <Content contentContainerStyle={{flex: 1, display: 'flex'}}>
          {this.props.children}
        </Content>
      </Container>
    )
  }
}