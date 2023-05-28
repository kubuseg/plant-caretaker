import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView
} from 'react-native';
import React from 'react';
import PlantDetailsTemplate from "./PlantDetailsTemplate";
import PlantTypeDetailsSection from '../components/PlantTypeDetailsSection';
import { chipColors } from '../styles/chip';
import homeScrollViewStyles from '../styles/homeScrollViewStyle';
import BackButton from '../components/BackButton';

function PlantTypeDetails({ route }): JSX.Element {
    const plantInfo = route.params.plantInfo;
    const plantDescription = plantInfo.description;

    const shortDescription: string[] = plantDescription.text;
    const sunlightExposure: string[] = plantDescription.sunlightExposure;
    const watering: string[] = plantDescription.watering;
    const fertilization: string[] = plantDescription.fertilization;
    const commonIssues: string[] = plantDescription.commonIssues;
    const growthPeriods: string[] = plantDescription.growthPeriods;

    const plantHeaderContents = (
        <>
            <Image style={styles.icon} source={{ uri: plantInfo.image }} />
            <Text style={styles.descLine}>{shortDescription[0]}</Text>
        </>
    );

    const mainContents = (
        <ScrollView style={{ flex: 1 }}>
            <PlantTypeDetailsSection
                title="Podlewanie"
                items={sunlightExposure}
                containerColor={chipColors.blue} />

            <PlantTypeDetailsSection
                title="Nawożenie"
                items={watering}
                containerColor={chipColors.brown} />

            <PlantTypeDetailsSection
                title="Nasłonecznienie"
                items={fertilization}
                containerColor={chipColors.yellow} />

            <PlantTypeDetailsSection
                title="Okresy wzrostu"
                items={growthPeriods}
                containerColor={chipColors.green} />
            <PlantTypeDetailsSection
                title="Częste problemy"
                items={commonIssues}
                containerColor={chipColors.red} />
        </ScrollView>
    );

    const appHeaderText = "OPIS: " + plantInfo.name;
    const footerContents = BackButton();
    return (
        <PlantDetailsTemplate
            appHeaderText={appHeaderText}
            plantHeaderContents={plantHeaderContents}
            mainContents={mainContents}
            footerContents={footerContents}
        />
    );
}

const styles = StyleSheet.create({
    icon: homeScrollViewStyles.icon,
    descLine: {
        fontWeight: 'bold',
        color: 'black',
        marginLeft: '3%',
        width: '68%',
    },
    arrowContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});

export default PlantTypeDetails;