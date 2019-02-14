
import { StyleSheet, Dimensions } from 'react-native';

var fullwidth = Dimensions.get('window').width; //full width
var fullheight = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  image: {
    height: fullheight/2.7,
    width: fullwidth,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center'
  },
  button: {
    margin: 10,
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    width: 0.7*fullwidth,
    justifyContent: 'center'
  },
  header: {
    textAlign: 'center',
    color: '#636C76',
    fontWeight: '400',
  },
  title: {
    textAlign: 'center',
    fontSize: 33,
    color: '#646D77',
    fontWeight: '200',
    marginTop: 15,
  },
  subtext: {
    textAlign: 'center',
    fontSize: 12,
    color: '#A5B0BF',
    fontWeight: '200',
    marginTop: 5,
  },
  paragraph: {
    textAlign: 'center',
    fontSize: 20,
    color: '#636C76',
    fontWeight: '300',
    marginTop: 10

  }
});

export default styles;