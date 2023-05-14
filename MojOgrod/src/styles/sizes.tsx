import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const sizes = {
    screenHeight: screenHeight,
    screenWidth: screenWidth,

    footerHeight: '14%',
    headerHeight: '14%',

    backButtonWidth: '50%',
    backButtonHeight: '50%',

    homeFooterButtonW: screenHeight * 0.1,
    homeFooterButtonH: screenHeight * 0.1,

    mainViewMargin: screenHeight * 0.0125,
    SVelementWidth: screenWidth * 0.93,
    SVelementHeight: screenHeight * 0.1,
};

export default sizes;