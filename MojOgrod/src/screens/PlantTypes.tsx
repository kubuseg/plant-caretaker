import 'react-native-get-random-values';
import React from 'react';
import AppFooter from '../components/AppFooter'
import AppHeader from '../components/AppHeader'
import HomeFooterContents from '../components/HomeFooterContents'
import PlantTypesSV from '../components/PlantTypesSV';
import { SafeAreaView } from 'react-native';
import BackButton from '../components/BackButton';


export const homeSVTypes = {
    userPlants: 1,
    plantTypes: 2,
};

function PlantTypes(): JSX.Element {

    const headerText = "BAZA WIEDZY";

    const footerContents = BackButton();


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppHeader>
                {headerText}
            </AppHeader>
            <PlantTypesSV onTouchScreen='PlantTypeDetails' ></PlantTypesSV>
            <AppFooter children={footerContents} />
        </SafeAreaView>
    );

}

export default PlantTypes;
