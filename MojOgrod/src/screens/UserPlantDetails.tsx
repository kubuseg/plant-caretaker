import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import sizes from '../styles/sizes';
import PlantDetailsSection from '../components/PlantDetailsSection';
import { useNavigation } from '@react-navigation/native';
import PlantDetailsTemplate from './PlantDetailsTemplate';
import monthMap from '../services/monthMap';
import JsonFileManager from '../services/JsonFileManager';
import chipColors from '../styles/chipColors';

const UserPlantDetails = ({ route }) => {
    const plantInfo = route.params.plantInfo;
    const navigation = useNavigation();

    async function plantTypeInfo() {
        navigation.navigate('PlantTypeDetails' as never, { plantInfo: plantInfo } as never);
    }

    const appHeaderText = "Szczegóły rośliny";
    const plantHeaderContents = (
        <View style={styles.cardInner}>
            <Image style={styles.icon} source={require('../../assets/icon.png')} />
            <Text>{plantInfo.name}</Text>
        </View>
    );

    const wateringInterval = plantInfo.wateringIntervalInDays.toString();
    const fertilizationInterval = plantInfo.fertilizationIntervalInWeeks.toString();
    const fMonthStart = plantInfo.fertilizationMonthBetweenCondition[0].toString();
    const fMonthEnd = plantInfo.fertilizationMonthBetweenCondition[1].toString();

    const mainContents = (
        <View style={{ width: '100%' }}>
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
            <Button
                title={"Opis gatunku"}
                onPress={async () => {
                    plantTypeInfo();
                }}
            />
            <Button
                title={"Edytuj roślinę"}
                onPress={() => {
                    navigation.navigate("UserPlantDetailsEdit" as never, { plantInfo: plantInfo } as never);
                }}
            />

        </View>
    );

    return (
        <PlantDetailsTemplate
            appHeaderText={appHeaderText}
            plantHeaderContents={plantHeaderContents}
            mainContents={mainContents} />
    );
};

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
    picker: {
        color: 'black',
        width: sizes.screenWidth * 0.25,
    },
    detailsText: {
        fontSize: 20,
        marginBottom: '3%'
    },
});

export default UserPlantDetails;