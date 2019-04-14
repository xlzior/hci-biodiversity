import React, { Component } from 'react'
import { Content, Body, List, ListItem, CheckBox, Radio, Text, Left, Right, Icon, Button } from 'native-base';
import { Modal, View } from 'react-native';
import styles from '../constants/Style';

export default class FilterModal extends Component {

  render() {
    let {type, trail, sortBy} = this.props.settings;
    let {modalVisible, closeModal, enableFilter, updateSettings} = this.props;

    /* TYPE SETTINGS */
    let typeOptions = [
      {id: 'flora', name: 'Flora'},
      {id: 'fauna', name: 'Fauna'}
    ]
    let typeSettings = (
      <View>
        <Text style={styles.leftTitle2}>Types</Text>
        <List style={{marginBottom: 30}}>
          {typeOptions.map(({id, name}) => (
            <ListItem key={id} onPress={() => updateSettings({[id]: !type[id]}, 'type')}>
              <CheckBox checked={type[id]} onPress={() => updateSettings({[id]: !type[id]}, 'type')}/>
              <Body><Text>{name}</Text></Body>
            </ListItem>
          ))}
        </List>
      </View>
    )

    /* TRAIL SETTINGS */
    let trailOptions = [
      {id: 'trail-01', name: 'College Section'},
      {id: 'trail-02', name: 'Clock Tower'},
      {id: 'trail-03', name: 'High School'},
      {id: 'all', name: 'All'}
    ]
    let trailSettings = (
      <View>
        <Text style={styles.leftTitle2}>Trail</Text>
        <List style={{marginBottom: 30}}>
          {trailOptions.map(({id, name}) => (
            <ListItem
              key={id}
              selected={trail == id}
              onPress={() => updateSettings({trail: id})}
            >
              <Left><Text>{name}</Text></Left>
              <Right><Radio selected={trail == id}/></Right>
            </ListItem>
          ))}
        </List>
      </View>
    )

    /* SORT SETTINGS */
    let sortOptions = [
      {id: 'alphabetical', name: 'Alphabetical order'},
      {id: 'distance', name: 'Distance'}
    ]
    let sortSettings = (
      <View>
        <Text style={styles.leftTitle2}>Sort by</Text>
        <List style={{marginBottom: 30}}>
          {sortOptions.map(({id, name}) => (
            <ListItem
              key={id}
              selected={sortBy == id}
              onPress={() => updateSettings({sortBy: id})}
            >
              <Left><Text>{name}</Text></Left>
              <Right><Radio selected={sortBy == id}/></Right>
            </ListItem>
          ))}
        </List>
      </View>
    )

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => closeModal()}
      >
        <Content style={{marginTop: 15, padding: 10}}>
          {enableFilter.includes('type') && typeSettings}
          {enableFilter.includes('trail') && trailSettings}
          {enableFilter.includes('sortBy') && sortSettings}

          <Button
            transparent
            onPress={() => closeModal()}
            style={{position: 'absolute', right: 0, top: 0}}>
            <Icon type="MaterialIcons" name="close"/>
          </Button>
        </Content>
      </Modal>
    )
  }
}