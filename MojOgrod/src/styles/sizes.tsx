import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const sizes = {
    screenHeight: screenHeight,
    screenWidth: screenWidth,

    footerHeight: screenHeight * 0.13,
    headerHeight: screenHeight * 0.13,

    backButtonWidth: screenWidth * 0.5,
    backButtonHeight: screenHeight * 0.06,

    homeFooterButtonW: screenHeight * 0.1,
    homeFooterButtonH: screenHeight * 0.1,

    mainViewMargin: screenHeight * 0.0125,
};

export default sizes;