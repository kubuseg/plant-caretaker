import React from 'react';
import { View, Text } from 'react-native';

function PlantDetails({ route }): JSX.Element {
    const pType = route.params.pType;
    return (
        <View>
            <Text>{pType.id}</Text>
        </View >
    );
}

export default PlantDetails;
