
import { StyleSheet, Dimensions } from 'react-native';

var fullWidth = Dimensions.get('window').width; //full width
var fullHeight = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  image: { //For main page
    height: fullWidth*(0.75),
    width: fullWidth,
    flex: 1,
  },
  container: { //For main page
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center'
  },
  button: { //For main page
    margin: 10,
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    width: 0.7*fullWidth,
    justifyContent: 'center'
  },
  header: { //For navigation bar
    textAlign: 'center',
    color: '#222222',
    fontWeight: '500',
  },
  title: { //Used generally.
    textAlign: 'center',
    fontSize: 33,
    color: '#646D77',
    fontWeight: '200',
    marginTop: 15,
  },
  subtext: { //For main page (Center aligned)
    textAlign: 'center',
    fontSize: 12,
    color: '#A5B0BF',
    fontWeight: '200',
    marginTop: 5,
  },
  paragraph: { //For main page (Center aligned)
    textAlign: 'center',
    fontSize: 20,
    color: '#636C76',
    fontWeight: '300',
    marginTop: 10
  },
  leftTitle: { //For General Use (left Aligned)
    textAlign: 'left',
    fontSize: 27,
    color: '#646D77',
    fontWeight: '500',
    marginTop: 10,
  },
  leftTitle2: { //For General Use (left Aligned), smaller
    textAlign: 'left',
    fontSize: 23,
    color: '#646D77',
    fontWeight: '500',
    marginTop: 10,
  },
  subtitle: { //For General Use (left Aligned)
    textAlign: 'left',
    fontSize: 17,
    fontStyle: 'italic',
    color: '#616B75',
    fontWeight: '400',
    marginTop: 5,
  },
  description: { //For General Use (Left Aligned)
    textAlign: 'left',
    fontSize: 18,
    color: '#636C76',
    fontWeight: '300',
    marginTop: 10
  },
  center: { //Meant for general use to center objects.
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: { //For Acknowledgements
    padding: 20,
    marginTop: 5,
    marginBottom: 10, 
    marginLeft: 10,
    marginRight: 10
  },
  miniTitle: { //For the F&F List
    textAlign: 'left',
    fontSize: 17,
    color: '#636C76',
    fontWeight: '600',
    alignSelf: 'stretch',
    marginTop: 10
  },
  miniDesc: { //For the F&F List
    textAlign: 'left',
    fontSize: 13,
    color: '#636C76',
    fontWeight: '400',
    alignSelf: 'stretch',
    marginTop: 10
  },
  listItems: { //Meant for each list-item in F&F List
    width: '100%', 
    marginLeft: 0, 
    paddingLeft: 0, 
    paddingRight: 0, 
    marginRight: 0,
    height: 100
  },
  listItemImageHolder: { //For the square image in F&F List
    height:100,
    width:100,
    marginRight:15
  },
  listItemTextHolder: { //Holds the header and description of each entry in the F&F List
    height:100,
    width: '65%',
  }
});

export default styles;