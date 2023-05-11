import 'react-native-get-random-values';
import React from 'react';
import AppFooter from '../components/AppFooter'
import AppHeader from '../components/AppHeader'
import HomeFooterContents from '../components/HomeFooterContents'
import PlantTypesScrollView from '../components/PlantTypesScrollView';
import UserPlantsScrollView from '../components/UserPlantsScrollView';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';


function HomeScreen({ route }): JSX.Element {

    const footerContents = HomeFooterContents();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppHeader>Mój Ogród</AppHeader>
            <PlantTypesScrollView />
            <AppFooter children={footerContents} />
        </SafeAreaView>
    );
}


export default HomeScreen;
