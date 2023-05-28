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

export const homeSVTypes = {
    userPlants: 1,
    plantTypes: 2,
};

function HomeScreen({ route }): JSX.Element {

    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    } = useAuth()


    let list;
    let headerText = "";
    list = <UserPlantsSV/>;
    headerText = <AppTitleText />


    const footerContents = HomeFooterContents();


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppHeader>
                {headerText}
            </AppHeader>
            {isLoggedIn ? list : <SignIn/>}
            <AppFooter children={footerContents} />
        </SafeAreaView>
    );
}


export default HomeScreen;
