import React, { useRef } from 'react';
import userPlants from '../mocks/userPlants';
import PlantsSVTemplate from './PlantsSVTemplate';
import { Animated } from 'react-native';

const plants = userPlants();

const UserPlantsSV = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
    }).start();

    return PlantsSVTemplate({
        plantsList: plants,
        onTouchScreen: '',
        fadeAnim: fadeAnim,
    });
}

export default UserPlantsSV;
