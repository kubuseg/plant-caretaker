import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import AppFooter from '../components/AppFooter';
import BackButton from '../components/BackButton';
import AppHeader from '../components/AppHeader';
import PlantTypesSV from '../components/PlantTypesSV';

function PlantTypeChoice(route): JSX.Element {
    const footerContents = BackButton();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppHeader>NOWA ROŚLINA</AppHeader>
            <PlantTypesSV onTouchScreen='UserPlantSettings' />
            <AppFooter children={footerContents} />
        </SafeAreaView>
    );
}

export default PlantTypeChoice;
