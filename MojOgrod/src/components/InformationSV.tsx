import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import InformationSVTemplate from './InformationSVTemplate';
import JsonFileManager from '../services/JsonFileManager';
import PlantsDBApi from '../services/PlantsDBApi';
import {useAuth} from '../auth/AuthContext';
import DataManager from '../services/DataManager';
type InformationSVParams = {
    onTouchScreen: string;
}

function InformationSV({ onTouchScreen }: InformationSVParams): JSX.Element {
    const [infoController, setInfoController] = React.useState<any[]>([]);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
        } = useAuth()

    const readInformation = async () => {
        if(authUser){
            await DataManager.updateController(authUser.mcId);
            const result = await  JsonFileManager.read('Controller');
            setInfoController(result);
        }
        else{
            const result = "";
            setInfoController("");
        }
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        readInformation();
    }, [authUser]);

    return (
        <InformationSVTemplate
            infoList={infoController}
            onTouchScreen={onTouchScreen}
            fadeAnim={fadeAnim}
        />
    );
}

export default InformationSV;
