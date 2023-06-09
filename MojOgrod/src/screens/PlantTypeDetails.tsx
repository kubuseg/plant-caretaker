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
import PlantDetailsSection from '../components/PlantDetailsSection';
import monthMap from '../services/monthMap';
import appColors from '../styles/appColors';
import chipStyles from '../styles/chip';

function PlantTypeDetails({ route }): JSX.Element {
    const plantInfo = route.params.plantInfo;
    const plantDescription = plantInfo.description;

    const shortDescription: string[] = plantDescription.text;
    const sunlightExposure: string[] = plantDescription.sunlightExposure;
    const watering: string[] = plantDescription.watering;
    const fertilization: string[] = plantDescription.fertilization;
    const commonIssues: string[] = plantDescription.commonIssues;
    const growthPeriods: string[] = plantDescription.growthPeriods;
    const wateringInterval = plantInfo.wateringIntervalInDays.toString();
    const fertilizationInterval = plantInfo.fertilizationIntervalInWeeks.toString();
    const fMonthStart = plantInfo.fertilizationMonthBetweenCondition[0].toString();
    const fMonthEnd = plantInfo.fertilizationMonthBetweenCondition[1].toString();

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
                items={watering}
                containerColor={chipColors.blue} />

            <PlantTypeDetailsSection
                title="Nawożenie"
                items={fertilization}
                containerColor={chipColors.brown} />

            <PlantTypeDetailsSection
                title="Nasłonecznienie"
                items={sunlightExposure}
                containerColor={chipColors.yellow} />

            <PlantTypeDetailsSection
                title="Okresy wzrostu"
                items={growthPeriods}
                containerColor={chipColors.green} />
            <PlantTypeDetailsSection
                title="Częste problemy"
                items={commonIssues}
                containerColor={chipColors.red} />

            <PlantDetailsSection title={'Czas między podlewaniem:'}>
                <Text style={[styles.detailsText, { backgroundColor: chipColors.blue }]}>{wateringInterval} dni</Text>
            </PlantDetailsSection>

            <PlantDetailsSection title={'Czas między nawożeniem:'}>
                <Text style={[styles.detailsText, { backgroundColor: chipColors.blue }]}>{fertilizationInterval} tygodni</Text>
            </PlantDetailsSection>

            <PlantDetailsSection title={'Miesiące nawożenia: '}>
                <Text style={[styles.detailsText, { backgroundColor: chipColors.blue }]}>
                    {monthMap.get(parseInt(fMonthStart, 10))}  -  {monthMap.get(parseInt(fMonthEnd, 10))}
                </Text>
            </PlantDetailsSection>
        </ScrollView>
    );

    const appHeaderText = "OPIS: " + plantInfo.type;
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
    detailsText: {
        ...chipStyles.chip,
        fontSize: 16,
        marginBottom: '3%',
        color: appColors.grey
    },
});

export default PlantTypeDetails;