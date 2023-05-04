import { StyleSheet, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

function style() {
    return StyleSheet.create({
        scrollView: {
            backgroundColor: 'white'
        },
        container: {
            flexDirection: 'column',
            marginVertical: screenHeight * 0.025,
            alignItems: 'center'
        },
        card: {
            marginHorizontal: 10,
            marginBottom: screenHeight * 0.025,
            width: screenWidth * 0.93,
            height: screenHeight * 0.1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: 'white',
            elevation: 5,
        },
        cardInner: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        icon: {
            width: screenHeight * 0.1,
            height: screenHeight * 0.1,
        },
        title: {
            fontSize: 16,
            marginLeft: 10,
            fontWeight: 'bold',
        },
        arrowContainer: {
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
        },
    });
}

export default style;
