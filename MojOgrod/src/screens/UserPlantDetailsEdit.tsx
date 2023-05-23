import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import sizes from '../styles/sizes';
import PlantDetailsSection from '../components/PlantDetailsSection';
import { deleteUserPlants } from '../services/PlantsDBApi';
import { useNavigation } from '@react-navigation/native';

import PlantDetailsTemplate from './PlantDetailsTemplate';
import DataManager from '../services/DataManager';
import LoadingScreen from './LoadingScreen';
import appColors from '../styles/appColors';

const UserPlantDetailsEdit = ({ route }) => {
    const plantInfo = route.params.plantInfo;
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    async function deletePlant() {
        setIsLoading(true);
        await deleteUserPlants("1", plantInfo.uuid.toString());
        await DataManager.updateUserPlants("1");
        setIsLoading(false);
        navigation.navigate('Home' as never);
    }

    const appHeaderText = "Edycja rośliny";
    const plantHeaderContents = (
        <View style={styles.cardInner}>
            <Image style={styles.icon} source={require('../../assets/icon.png')} />
            <Text>{plantInfo.name}</Text>
        </View>
    );

    const [wateringInterval, setWateringInterval] = useState(plantInfo.wateringIntervalInDays.toString());
    const [fertilizationInterval, setFertilizationInterval] = useState(plantInfo.fertilizationIntervalInWeeks.toString());
    const [fMonthStart, setFMonthStart] = useState(plantInfo.fertilizationMonthBetweenCondition[0].toString());
    const [fMonthEnd, setFMonthEnd] = useState(plantInfo.fertilizationMonthBetweenCondition[1].toString());

    const wateringIntervalOptions = Array.from({ length: 100 }, (_, i) => i + 1).map((m) => (
        <Picker.Item key={m} label={m.toString()} value={m.toString()} />
    ));

    const fertilizationIntervalOptions = Array.from({ length: 30 }, (_, i) => i + 1).map((m) => (
        <Picker.Item key={m} label={m.toString()} value={m.toString()} />
    ));

    const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
        <Picker.Item key={m} label={m.toString()} value={m.toString()} />
    ));

    const mainContents = (
        <View>
            <PlantDetailsSection title={'Czas między podlewaniem (dni):'}>
                <Picker
                    selectedValue={wateringInterval}
                    onValueChange={setWateringInterval}
                    style={styles.picker}
                >
                    {wateringIntervalOptions}
                </Picker>
            </PlantDetailsSection>

            <PlantDetailsSection title={'Czas między nawożeniem (tygodnie):'}>
                <Picker
                    selectedValue={fertilizationInterval}
                    onValueChange={setFertilizationInterval}
                    style={styles.picker}
                >
                    {fertilizationIntervalOptions}
                </Picker>
            </PlantDetailsSection>

            <PlantDetailsSection title={'Miesiące nawożenia: '}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Picker
                        selectedValue={fMonthStart}
                        onValueChange={setFMonthStart}
                        style={styles.picker}
                    >
                        {monthOptions}
                    </Picker>
                    <Text style={{ marginHorizontal: 5 }}>-</Text>
                    <Picker
                        selectedValue={fMonthEnd}
                        onValueChange={setFMonthEnd}
                        style={styles.picker}
                    >
                        {monthOptions}
                    </Picker>
                </View>
            </PlantDetailsSection>
            <Button title={"Usuń roślinę"} onPress={() => {
                deletePlant();
            }
            } />

        </View>
    );

    if (isLoading) {
        return (
            <LoadingScreen />
        );
    }
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
        backgroundColor: appColors.turquoise,
        width: sizes.screenWidth * 0.25,
    },
});

export default UserPlantDetailsEdit;