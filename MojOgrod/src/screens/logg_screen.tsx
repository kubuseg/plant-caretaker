import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react';
import AppFooter from '../components/AppFooter'
import AppHeader from '../components/AppHeader'
import AppTitleText from '../components/AppTitleText';
import HomeFooterContents from '../components/HomeFooterContents'
import PlantTypesSV from '../components/PlantTypesSV';
import UserPlantsSV from '../components/UserPlantsSV';
import { Text, SafeAreaView } from 'react-native';
import eventEmitter from '../services/eventEmitter';
import {useAuth} from '../auth/AuthContext';
import SignIn from '../components/SignIn';
import DataManager from '../services/DataManager';
import { useNavigation } from '@react-navigation/native';


export const homeSVTypes = {
    userPlants: 1,
    plantTypes: 2,
};

function LoggScreen({ route }): JSX.Element {
    const [cos, setCos] = React.useState('');
    const navigation = useNavigation();

    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    } = useAuth()


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppHeader>
                <AppTitleText/>
            </AppHeader>
            <SignIn/>
        </SafeAreaView>
    );
}


export default LoggScreen;
