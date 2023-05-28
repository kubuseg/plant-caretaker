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
import homeScrollViewStyles from '../styles/homeScrollViewStyle';
import BackButton from '../components/BackButton';
import FooterTextButton from '../components/FooterTextButton';
import PlantDetailsPickerOptions from '../services/PlantDetailsPickerOptions';

const UserPlantSettings = ({ route }) => {
    const plantInfo = route.params.plantInfo;
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const [plantName, setPlantName] = useState(plantInfo.name);
    const [wateringInterval, setWateringInterval] = useState(parseInt(plantInfo.wateringIntervalInDays));
    const [fertilizationInterval, setFertilizationInterval] = useState(parseInt(plantInfo.fertilizationIntervalInWeeks));
    const [fMonthStart, setFMonthStart] = useState(parseInt(plantInfo.fertilizationMonthBetweenCondition[0]));
    const [fMonthEnd, setFMonthEnd] = useState(parseInt(plantInfo.fertilizationMonthBetweenCondition[1]));

    async function deletePlant() {
        setIsLoading(true);
        await DataManager.deletePlant(plantInfo.uuid.toString());
        setIsLoading(false);
        navigation.navigate('Home' as never);
    }

    async function onPressSave() {
        plantInfo.name = plantName;
        plantInfo.wateringIntervalInDays = wateringInterval;
        plantInfo.fertilizationIntervalInWeeks = fertilizationInterval;
        plantInfo.fertilizationMonthBetweenCondition[0] = fMonthStart;
        plantInfo.fertilizationMonthBetweenCondition[1] = fMonthEnd;

        setIsLoading(true);
        await DataManager.savePlantInfo(plantInfo);
        setIsLoading(false);

        navigation.navigate('Home' as never);
    }

    const appHeaderText = "Edycja rośliny";
    const plantHeaderContents = (
        <>
            <Image style={styles.icon} source={{ uri: plantInfo.image }} />
            <TextInput
                value={plantName}
                onChangeText={setPlantName}
                style={[homeScrollViewStyles.title, { marginLeft: 6, backgroundColor: appColors.onEditGrey }]}
                maxLength={28}
            />
        </>
    );

    const mainContents = (
        <View>
            <PlantDetailsSection title={'Czas między podlewaniem (dni):'}>
                <Picker
                    selectedValue={wateringInterval.toString()}
                    onValueChange={(itemValue) => setWateringInterval(parseInt(itemValue))}
                    style={styles.picker}
                >
                    {PlantDetailsPickerOptions.wateringIntervalOptions}
                </Picker>
            </PlantDetailsSection>

            <PlantDetailsSection title={'Czas między nawożeniem (tygodnie):'}>
                <Picker
                    selectedValue={fertilizationInterval.toString()}
                    onValueChange={(itemValue) => setFertilizationInterval(parseInt(itemValue))}
                    style={styles.picker}
                >
                    {PlantDetailsPickerOptions.fertilizationIntervalOptions}
                </Picker>
            </PlantDetailsSection>

            <PlantDetailsSection title={'Miesiące nawożenia: '}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Picker
                        selectedValue={fMonthStart.toString()}
                        onValueChange={(itemValue) => setFMonthStart(parseInt(itemValue))}
                        style={styles.picker}
                    >
                        {PlantDetailsPickerOptions.monthOptions}
                    </Picker>
                    <Text style={{ marginHorizontal: 5 }}>-</Text>
                    <Picker
                        selectedValue={fMonthEnd.toString()}
                        onValueChange={(itemValue) => setFMonthEnd(parseInt(itemValue))}
                        style={styles.picker}
                    >
                        {PlantDetailsPickerOptions.monthOptions}
                    </Picker>
                </View>
            </PlantDetailsSection>

            <Button title={"Usuń roślinę"} onPress={deletePlant} />

        </View>
    );

    const footerContents = (
        <>
            <BackButton />
            <FooterTextButton text="ZAPISZ" onPress={onPressSave} />
        </>
    );

    if (!isLoading) {
        return (
            <PlantDetailsTemplate
                appHeaderText={appHeaderText}
                plantHeaderContents={plantHeaderContents}
                mainContents={mainContents}
                footerContents={footerContents}
            />
        );
    }

    return (
        <LoadingScreen />
    );
};

const styles = StyleSheet.create({
    icon: homeScrollViewStyles.icon,
    picker: {
        backgroundColor: appColors.onEditGrey,
        width: sizes.screenWidth * 0.25,
    },
});

export default UserPlantSettings;
