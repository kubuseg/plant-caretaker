import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import textButtonStyles from '../styles/textButtonStyle';

function BackButton(): JSX.Element {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.goBack();
            }}
            style={textButtonStyles.button}
        >
            <Text style={textButtonStyles.buttonText}>POWRÓT</Text>
        </TouchableOpacity>
    );
}

export default BackButton;
