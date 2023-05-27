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
import chipColors from '../styles/chipColors';
import homeScrollViewStyles from '../styles/homeScrollViewStyle';
import BackButton from '../components/BackButton';

function PlantTypeDetails({ route }): JSX.Element {
    const plantInfo = route.params.plantInfo;
    const plantDescription = plantInfo.description;

    const shortDescriptions: string[] = plantDescription.text;
    const sunlightExposure: string[] = plantDescription.sunlightExposure;
    const watering: string[] = plantDescription.watering;
    const fertilization: string[] = plantDescription.fertilization;
    const commonIssues: string[] = plantDescription.commonIssues;
    const growthPeriods: string[] = plantDescription.growthPeriods;

    const plantHeaderContents = (
        <View style={styles.cardInner}>
            <Image style={styles.icon} source={{ uri: plantInfo.image }} />
            <View style={styles.descView}>
                {shortDescriptions.map((desc: string, index: number) => (
                    <Text key={index} style={styles.descLine}>{desc}</Text>
                ))}
            </View>
        </View>
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
    cardInner: {
        width: sizes.screenWidth * 0.7,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: sizes.SVelementHeight,
        height: sizes.SVelementHeight,
    },
    descView: homeScrollViewStyles.title,
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