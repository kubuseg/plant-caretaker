import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import sizes from '../styles/sizes';
import PlantDetailsSection from '../components/PlantDetailsSection';

import PlantDetailsTemplate from './PlantDetailsTemplate';

const UserPlantDetails = ({ route }) => {
    const plantInfo = route.params.plantInfo;
    const editMode = false;

    const appHeaderText = "Szczegóły rośliny";
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

    const pickerDropdownIconColor = editMode ? 'black' : 'white';
    const pickerBGColor = editMode ? 'gray' : 'white'

    const mainContents = (
        <View>
            <PlantDetailsSection title={'Czas między podlewaniem (dni):'}>
                <Picker
                    selectedValue={wateringInterval}
                    enabled={editMode}
                    onValueChange={setWateringInterval}
                    style={[styles.picker, { backgroundColor: pickerBGColor }]}
                    dropdownIconColor={pickerDropdownIconColor}
                >
                    {wateringIntervalOptions}
                </Picker>
            </PlantDetailsSection>

            <PlantDetailsSection title={'Czas między nawożeniem (tygodnie):'}>
                <Picker
                    selectedValue={fertilizationInterval}
                    enabled={editMode}
                    onValueChange={setFertilizationInterval}
                    style={[styles.picker, { backgroundColor: pickerBGColor }]}
                    dropdownIconColor={pickerDropdownIconColor}
                >
                    {fertilizationIntervalOptions}
                </Picker>
            </PlantDetailsSection>

            <PlantDetailsSection title={'Miesiące nawożenia: '}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Picker
                        selectedValue={fMonthStart}
                        enabled={editMode}
                        onValueChange={setFMonthStart}
                        style={[styles.picker, { backgroundColor: pickerBGColor }]}
                        dropdownIconColor={pickerDropdownIconColor}
                    >
                        {monthOptions}
                    </Picker>
                    <Text style={{ marginHorizontal: 5 }}>-</Text>
                    <Picker
                        selectedValue={fMonthEnd}
                        enabled={editMode}
                        onValueChange={setFMonthEnd}
                        style={[styles.picker, { backgroundColor: pickerBGColor }]}
                        dropdownIconColor={pickerDropdownIconColor}
                    >
                        {monthOptions}
                    </Picker>
                </View>
            </PlantDetailsSection>

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
});

export default UserPlantDetails;