import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import appColors from '../styles/appColors';

type FooterTextButtonProps = {
    text: string;
    onPress?: () => void; // Przykładowy typ funkcji - void oznacza brak zwracanej wartości
};

function FooterTextButton({ text, onPress }: FooterTextButtonProps): JSX.Element {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => {
                if (onPress) {
                    onPress();
                }
            }}
            style={styles.button}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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

export default FooterTextButton;
