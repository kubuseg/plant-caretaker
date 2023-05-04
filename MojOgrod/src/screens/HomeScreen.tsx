import React from 'react';
import AppFooter from '../components/AppFooter'
import AppHeader from '../components/AppHeader'
import PlantTypesScrollView from '../components/PlantTypesScrollView';
import { SafeAreaView } from 'react-native';


function HomeScreen(): JSX.Element {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppHeader />
            <PlantTypesScrollView />
            <AppFooter />
        </SafeAreaView>
    );
}

export default HomeScreen;
