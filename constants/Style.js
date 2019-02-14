
import { StyleSheet, Dimensions } from 'react-native';

var fullwidth = Dimensions.get('window').width; //full width
var fullheight = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,

  },
  title: {
    textAlign: 'center',
    fontSize: 35,
    color: '#646D77',
    fontWeight: '200',
    marginTop: 20,
  },
  subtext: {
    textAlign: 'center',
    fontSize: 20,
    color: '#A5B0BF',
    fontWeight: '200',
    marginTop: 10,
  },
});

export default styles;