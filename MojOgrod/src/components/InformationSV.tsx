import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import InformationSVTemplate from './InformationSVTemplate';
import JsonFileManager from '../services/JsonFileManager';
import PlantsDBApi from '../services/PlantsDBApi';

type InformationSVParams = {
    onTouchScreen: string;
}

function InformationSV({ onTouchScreen }: InformationSVParams): JSX.Element {
    const [infoController, setInfoController] = React.useState<any[]>([]);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const readInformation = async () => {
        const result = await PlantsDBApi.getMicrocontroller("1"); // TODO getUserMicrocontroller
        setInfoController(result);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        readInformation();
    }, []);

    return (
        <InformationSVTemplate
            infoList={infoController}
            onTouchScreen={onTouchScreen}
            fadeAnim={fadeAnim}
        />
    );
}

export default InformationSV;
