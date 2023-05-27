import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import textButtonStyles from '../styles/textButtonStyle';

type EditButtonProps = {
    onPress: () => void; // Przykładowy typ funkcji - void oznacza brak zwracanej wartości
};

function EditPlantButton({ onPress }: EditButtonProps): JSX.Element {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => {
                onPress();
            }}
            style={textButtonStyles.button}
        >
            <Text style={textButtonStyles.buttonText}>EDYTUJ</Text>
        </TouchableOpacity>
    );
}

export default EditPlantButton;
