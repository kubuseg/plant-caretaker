import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import sizes from '../styles/sizes';
import PlantDetailsSection from '../components/PlantDetailsSection';;
import { useNavigation } from '@react-navigation/native';

import PlantDetailsTemplate from './PlantDetailsTemplate';
import DataManager from '../services/DataManager';
import LoadingScreen from './LoadingScreen';
import appColors from '../styles/appColors';

const UserPlantDetailsEdit = ({ route }) => {
    const plantInfo = route.params.plantInfo;
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const [plantName, setPlantName] = useState(plantInfo.name);

    async function deletePlant() {
        setIsLoading(true);
        await DataManager.deletePlant(plantInfo.uuid.toString());
        setIsLoading(false);
        navigation.navigate('Home' as never);
    }

    async function saveEdit() {
        plantInfo.name = plantName;
        plantInfo.wateringIntervalInDays = wateringInterval;
        plantInfo.fertilizationIntervalInWeeks = fertilizationInterval;
        plantInfo.fertilizationMonthBetweenCondition[0] = fMonthStart;
        plantInfo.fertilizationMonthBetweenCondition[1] = fMonthEnd;
        setIsLoading(true);
        await DataManager.updatePlant(plantInfo.uuid, plantInfo)
        setIsLoading(false);
        navigation.navigate('UserPlantDetails' as never, { plantInfo: plantInfo } as never);
    }

    const appHeaderText = "Edycja rośliny";
    const plantHeaderContents = (
        <View style={styles.cardInner}>
            <Image style={styles.icon} source={{uri: plantInfo.image}} />
            <TextInput
                value={plantName}
                onChangeText={setPlantName}
            />
        </View>
    );

    const [wateringInterval, setWateringInterval] = useState(parseInt(plantInfo.wateringIntervalInDays));
    const [fertilizationInterval, setFertilizationInterval] = useState(parseInt(plantInfo.fertilizationIntervalInWeeks));
    const [fMonthStart, setFMonthStart] = useState(parseInt(plantInfo.fertilizationMonthBetweenCondition[0]));
    const [fMonthEnd, setFMonthEnd] = useState(parseInt(plantInfo.fertilizationMonthBetweenCondition[1]));

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
                    selectedValue={wateringInterval.toString()}
                    onValueChange={(itemValue) => setWateringInterval(parseInt(itemValue))}
                    style={styles.picker}
                >
                    {wateringIntervalOptions}
                </Picker>
            </PlantDetailsSection>

            <PlantDetailsSection title={'Czas między nawożeniem (tygodnie):'}>
                <Picker
                    selectedValue={fertilizationInterval.toString()}
                    onValueChange={(itemValue) => setFertilizationInterval(parseInt(itemValue))}
                    style={styles.picker}
                >
                    {fertilizationIntervalOptions}
                </Picker>
            </PlantDetailsSection>

            <PlantDetailsSection title={'Miesiące nawożenia: '}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Picker
                        selectedValue={fMonthStart.toString()}
                        onValueChange={(itemValue) => setFMonthStart(parseInt(itemValue))}
                        style={styles.picker}
                    >
                        {monthOptions}
                    </Picker>
                    <Text style={{ marginHorizontal: 5 }}>-</Text>
                    <Picker
                        selectedValue={fMonthEnd.toString()}
                        onValueChange={(itemValue) => setFMonthEnd(parseInt(itemValue))}
                        style={styles.picker}
                    >
                        {monthOptions}
                    </Picker>
                </View>
            </PlantDetailsSection>
            <Button title={"Zapisz"} onPress={saveEdit} />

            <Button title={"Usuń roślinę"} onPress={deletePlant} />

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
