import { StyleSheet, Dimensions } from 'react-native';
import appColors from './appColors';
import sizes from './sizes';

const homeScrollViewStyles = StyleSheet.create({
    scrollView: {
        backgroundColor: appColors.darkerWhite
    },
    container: {
        flexDirection: 'column',
        marginTop: sizes.mainViewMarginTop,
        alignItems: 'center'
    },
    card: {
        marginHorizontal: 10,
        marginBottom: sizes.screenHeight * 0.025,
        width: sizes.screenWidth * 0.93,
        height: sizes.screenHeight * 0.1,
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
        width: sizes.screenHeight * 0.1,
        height: sizes.screenHeight * 0.1,
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

export default homeScrollViewStyles;
