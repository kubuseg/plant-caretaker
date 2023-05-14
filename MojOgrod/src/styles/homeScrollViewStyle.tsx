import { StyleSheet, Dimensions } from 'react-native';
import appColors from './appColors';
import sizes from './sizes';

const homeScrollViewStyles = StyleSheet.create({
    scrollView: {
        backgroundColor: appColors.darkerWhite
    },
    container: {
        flexDirection: 'column',
        marginVertical: sizes.mainViewMargin,
        alignItems: 'center'
    },
    card: {
        marginVertical: sizes.mainViewMargin,
        width: sizes.SVelementWidth,
        height: sizes.SVelementHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        elevation: 4,
    },
    cardInner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: sizes.SVelementHeight,
        height: sizes.SVelementHeight,
    },
    title: {
        fontSize: 16,
        marginLeft: 10,
        fontWeight: 'bold',
        color: 'black',
    },
    arrowContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});

export default homeScrollViewStyles;
