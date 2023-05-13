import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react';
import AppFooter from '../components/AppFooter'
import AppHeader from '../components/AppHeader'
import HomeFooterContents from '../components/HomeFooterContents'
import PlantTypesScrollView from '../components/PlantTypesScrollView';
import UserPlantsScrollView from '../components/UserPlantsScrollView';
import { SafeAreaView } from 'react-native';
import eventEmitter from '../services/eventEmitter';

export const homeSVTypes = {
    userPlants: 1,
    plantTypes: 2,
};


function HomeScreen({ route }): JSX.Element {

    const [SVType, setSVType] = useState(homeSVTypes.userPlants);

    useEffect(() => {
        const handleSVTypeChange = (newListType: number) => {
            setSVType(newListType);
        };

        eventEmitter.on('HomeScrollViewType', handleSVTypeChange);

        return () => {
            eventEmitter.off('HomeScrollViewType', handleSVTypeChange);
        };
    }, []);

    let list;

    if (SVType == homeSVTypes.plantTypes) {
        list = <PlantTypesScrollView />;
    }
    else if (SVType == homeSVTypes.userPlants) {
        list = <UserPlantsScrollView />;
    }

    const footerContents = HomeFooterContents();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppHeader>Mój Ogród</AppHeader>
            {list}
            <AppFooter children={footerContents} />
        </SafeAreaView>
    );
}


export default HomeScreen;
