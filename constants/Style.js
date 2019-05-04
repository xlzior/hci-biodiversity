
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
    width: 0.7*fullWidth,
    justifyContent: 'center'
  },
  header: { //For navigation bar
    textAlign: 'center',
    fontWeight: '500',
  },
  title: { //Used generally.
    textAlign: 'center',
    fontSize: 33,
    color: '#646D77',
    fontWeight: '200',
    marginTop: 15,
    fontFamily: 'Lato'
  },
  subtext: { //For main page (Center aligned)
    textAlign: 'center',
    fontSize: 14,
    color: '#798493',
    fontWeight: '200',
    fontStyle: 'italic',
    marginTop: 5,
  },
  paragraph: { //For main page (Center aligned)
    textAlign: 'center',
    fontSize: 17,
    color: '#636C76',
    fontWeight: '300',
    marginTop: 10,
    fontFamily: 'Lato'
  },
  leftTitle: { //For General Use (left Aligned)
    textAlign: 'left',
    fontSize: 27,
    color: '#646D77',
    fontWeight: '500',
    marginTop: 10,
    fontFamily: 'Lato'
  },
  leftTitle2: { //For General Use (left Aligned), smaller
    textAlign: 'left',
    fontSize: 19,
    marginTop: 10,
    fontFamily: 'Lato'
  },
  subtitle: { //For General Use (left Aligned)
    textAlign: 'left',
    fontSize: 17,
    color: '#616B75',
    fontWeight: '400',
    marginTop: 5,
    fontFamily: 'Lato'
  },
  italicSubtitle: { //For General Use (left Aligned)
    textAlign: 'left',
    fontSize: 17,
    color: '#616B75',
    fontWeight: '400',
    marginTop: 5,
    fontFamily: 'Lato-Italic'
  },
  description: { //For General Use (Left Aligned)
    textAlign: 'left',
    fontSize: 18,
    color: '#636C76',
    fontWeight: '300',
    marginTop: 10,
    fontFamily: 'Lato'
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
    fontWeight: '500',
    alignSelf: 'stretch',
    marginTop: 10,
    fontFamily: 'Lato'
  },
  miniDesc: { //For the F&F List
    textAlign: 'left',
    fontSize: 13,
    color: '#636C76',
    fontWeight: '400',
    alignSelf: 'stretch',
    marginTop: 10,
    fontFamily: 'Lato'
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
    marginRight:15,
    backgroundColor: '#ededed'
  },
  listItemTextHolder: { //Holds the header and description of each entry in the F&F List
    height:100,
    width: '65%',
  },
  searchBar:{
    height: 50,
    fontSize: 17,
    flex: 1
  },
  textForm: {
    paddingRight: 10,
  },
  grayIcon: {
    color: '#999999',
  },
  ffListCircleImageBackground: { //For the circle image background
    marginTop: 40,
    height: 200,
    width: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ffListCircleImage: { //For the image inside the circle image background in FFList
    height: 200,
    width: 200,
    borderRadius: 100
  },
  ffListCircleText: { //For the text in the main circle images in FFList
    fontSize: 45,
    color: '#F6F8FA',
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 20,
    fontFamily: 'Precious',
    padding: 35
  },
  entryLocationListItem: { //Meant for each location in FF Entry location views
    width: '100%', 
    marginLeft: 0, 
    marginRight: 0,
    paddingLeft: 15,
    height: 50,
    flexDirection: 'row'
  },
});

export default styles;