import React, { Component } from 'react';
import { Container, Content, Header, Title, Body, Left, Right, Button, Icon } from 'native-base';
import FilterModal from './../screens/FilterModal'
import styles from './Style';

export default class NavigationBar extends Component {
  state = {
    modalVisible: false
  }

  render() {
    let right = this.props.enableFilter ?
    <Right style={{flex: 1, alignItems: 'flex-end'}}>
      <Button transparent onPress={() => this.setState({modalVisible: true})}>
        <Icon type="Octicons" name='settings'/>
      </Button>
    </Right> :
    <Right style={{flex: 1, alignItems: 'flex-end'}} />

    return (
      <Container>
        <Header style={{flexDirection: 'row'}}>
          <Left style={{flex: 1, alignItems: 'flex-start'}}>
            <Button transparent onPress={()=>this.props.navigation.toggleDrawer()}>
              <Icon type='MaterialIcons' name='menu' />
            </Button>
          </Left>
          <Body style={{flex: 4, alignItems: 'center'}}>
            <Title style={styles.header}>{this.props.navigation.state.routeName}</Title>
          </Body>
          {right}
        </Header>
        <Content contentContainerStyle={this.props.style}>
          {this.props.children}
        </Content>
        {this.props.enableFilter &&
          <FilterModal
            modalVisible={this.state.modalVisible}
            closeModal={()=>this.setState({modalVisible: false})}
            {...this.props}
          />
        }
      </Container>
    )
  }
}