import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const SVelementHeight = screenHeight * 0.11;

const sizes = {
    screenHeight: screenHeight,
    screenWidth: screenWidth,

    footerHeight: '14%',
    headerHeight: '14%',

    backButtonWidth: '50%',
    backButtonHeight: '50%',

    homeFooterButtonW: screenHeight * 0.1,
    homeFooterButtonH: screenHeight * 0.1,
    homeFooterButtonHorizontalMargin: screenWidth * 0.025,

    mainViewMargin: screenHeight * 0.0125,
    mainViewElementWidth: '93%',

    SVelementHeight: SVelementHeight,
    plantHeaderHeight: SVelementHeight,
};

export default sizes;