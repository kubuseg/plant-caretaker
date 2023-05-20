import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import appColors from '../styles/appColors';
import { useNavigation } from '@react-navigation/native';
import sizes from '../styles/sizes';

function BackButton(): JSX.Element {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.goBack();
            }}
            style={backButtonStyles.button}
        >
            <Text style={backButtonStyles.buttonText}>POWRÓT</Text>
        </TouchableOpacity>
    );
}

const backButtonStyles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: sizes.backButtonWidth,
        height: sizes.backButtonHeight,
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
        fontSize: 14,
        color: appColors.turquoise,
        fontFamily: "OpenSans-Bold" // nie zmienia sie
    },
});

export default BackButton;
