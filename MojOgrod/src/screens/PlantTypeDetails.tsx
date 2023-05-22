import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView
} from 'react-native';
import React from 'react';
import PlantDetailsTemplate from "./PlantDetailsTemplate";
import sizes from "../styles/sizes";
import PlantTypeDetailsSection from '../components/PlantTypeDetailsSection';

function PlantTypeDetails({ route }): JSX.Element {
    const plantDescription = route.params.plantInfo.description;

    const shortDescriptions: string[] = plantDescription.text;
    const sunlightExposure: string[] = plantDescription.sunlightExposure;
    const watering: string[] = plantDescription.watering;
    const fertilization: string[] = plantDescription.fertilization;
    const commonIssues: string[] = plantDescription.commonIssues;
    const growthPeriods: string[] = plantDescription.growthPeriods;

    const plantHeaderContents = (
        <View style={styles.cardInner}>
            <Image style={styles.icon} source={require('../mocks/plant_photos/mieta.png')} />
            <View style={styles.descView}>
                {shortDescriptions.map((desc: string, index: number) => (
                    <Text key={index} style={styles.descLine}>{desc}</Text>
                ))}
            </View>
        </View>
    );

    const mainContents = (
        <ScrollView style={{ flex: 1 }}>
            <PlantTypeDetailsSection title="Podlewanie" items={sunlightExposure} containerColor="#d3e9ff" />
            <PlantTypeDetailsSection title="Nawożenie" items={watering} containerColor="#bc8c74" />
            <PlantTypeDetailsSection title="Nasłonecznienie" items={fertilization} containerColor="#fff1c1" />
            <PlantTypeDetailsSection title="Okresy wzrostu" items={growthPeriods} containerColor="#beed9c" />
            <PlantTypeDetailsSection title="Częste problemy" items={commonIssues} containerColor="#ff664a" />
        </ScrollView>
    );

    const appHeaderText = "OPIS: " + plantDescription.name;
    return PlantDetailsTemplate({
        appHeaderText,
        plantHeaderContents,
        mainContents,
    });
}

const styles = StyleSheet.create({
    cardInner: {
        width: sizes.screenWidth * 0.7,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: sizes.SVelementHeight,
        height: sizes.SVelementHeight,
    },
    descView: {
        flexDirection: 'column',
        marginLeft: '3%',
    },
    descLine: {
        fontWeight: 'bold',
        color: 'black',
    },
    arrowContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});

export default PlantTypeDetails;