import React, { useRef } from 'react';
import { Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PlantsSVTemplate from './PlantsSVTemplate';
import JsonFileManager from '../services/JsonFileManager';
import plantsNameCompare from '../services/plantsNameCompare';

function UserPlantsSV(): JSX.Element {
    const [plantTypes, setPlantTypes] = React.useState<any[]>([]);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useFocusEffect(
        React.useCallback(() => {
            const readPlants = async () => {
                const result = await JsonFileManager.read('userPlants');
                result.sort(plantsNameCompare);

                setPlantTypes(result);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            };
            readPlants();
        }, [fadeAnim]),
    );

    return (
        <PlantsSVTemplate
            plantsList={plantTypes}
            onTouchScreen={'UserPlantDetails'}
            fadeAnim={fadeAnim}
        />
    );
}

export default UserPlantsSV;
