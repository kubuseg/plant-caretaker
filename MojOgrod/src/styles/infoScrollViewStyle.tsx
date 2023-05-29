import { StyleSheet, Dimensions } from 'react-native';
import appColors from './appColors';
import sizes from './sizes';

const infoScrollViewStyle = StyleSheet.create({
    scrollView: {
        backgroundColor: appColors.darkerWhite
    },
    container: {
        flexDirection: 'column',
        marginVertical: sizes.mainViewMargin,
        alignItems: 'center',
    },
    card: {
        marginVertical: sizes.mainViewMargin,
        width: sizes.mainViewElementWidth,
        height: sizes.SVelementHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        elevation: 4,
    },
    cardInner: {
        alignItems: "center",
        flexDirection: "row"
    },
    icon: {
        width: sizes.SVelementHeight*0.6,
        height: sizes.SVelementHeight*0.6,
        resizeMode: "contain",
        marginLeft: 15,
        marginRight: 15
    },
    alertIcon: {
        width: sizes.SVelementHeight*0.5,
        height: sizes.SVelementHeight*0.5,
        resizeMode: "contain",
        marginRight: 15
    },
    title: {
        fontSize: 16,
        marginLeft: 10,
        color: 'black',
        fontFamily: 'OpenSans-Bold',
        maxWidth: 130
    },
    alertContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});

export default infoScrollViewStyle;
