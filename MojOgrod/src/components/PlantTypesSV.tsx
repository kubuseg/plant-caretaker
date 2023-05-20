import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import PlantsSVTemplate from './PlantsSVTemplate';
import JsonFileManager from '../services/JsonFileManager';

type PlantTypesSVParams = {
    onTouchScreen: string;
}

function PlantTypesSV({ onTouchScreen }: PlantTypesSVParams): JSX.Element {
    const [plantTypes, setPlantTypes] = React.useState<any[]>([]);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const readPlants = async () => {

        const result = await JsonFileManager.read('typesDescriptions');
        setPlantTypes(result);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        readPlants();
    }, []);

    return (
        <PlantsSVTemplate
            plantsList={plantTypes}
            onTouchScreen={onTouchScreen}
            fadeAnim={fadeAnim}
        />
    );
}

export default PlantTypesSV;
