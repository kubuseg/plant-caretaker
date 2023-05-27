import { StyleSheet } from 'react-native';
import appColors from './appColors';

const textButtonStyles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '35%',
        height: '50%',
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white', // Biały kolor tła
        borderRadius: 20,
        flexDirection: 'row',
    },
    buttonText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        color: appColors.turquoise,
        fontFamily: "OpenSans-Bold" // nie zmienia sie
    },
});

export default textButtonStyles;