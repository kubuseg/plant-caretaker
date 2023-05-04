import React from 'react';
import AppFooter from '../components/AppFooter'
import AppHeader from '../components/AppHeader'
import PlantTypesScrollView from '../components/PlantTypesScrollView';
import {
    Dimensions,
    SafeAreaView
} from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

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
