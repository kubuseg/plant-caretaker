import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import sizes from '../styles/sizes';

import PlantDetailsTemplate from './PlantDetailsTemplate';

const UserPlantDetails = ({ route }) => {
    const plantInfo = route.params.plantInfo;
    const editMode = false;
    const [wateringIntervalInDays, setWateringIntervalInDays] = useState(plantInfo.wateringIntervalInDays.toString());
    const [fertilizationIntervalInWeeks, setFertilizationIntervalInWeeks] = useState(plantInfo.fertilizationIntervalInWeeks.toString());
    const [fertilizationMonthStart, setFertilizationMonthStart] = useState(plantInfo.fertilizationMonthBetweenCondition[0].toString());
    const [fertilizationMonthEnd, setFertilizationMonthEnd] = useState(plantInfo.fertilizationMonthBetweenCondition[1].toString());

    const wateringIntervalOptions = Array.from({ length: 100 }, (_, i) => i + 1).map((m) => (
        <Picker.Item key={m} label={m.toString()} value={m.toString()} />
    ));

    const fertilizationIntervalOptions = Array.from({ length: 30 }, (_, i) => i + 1).map((m) => (
        <Picker.Item key={m} label={m.toString()} value={m.toString()} />
    ));

    const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
        <Picker.Item key={m} label={m.toString()} value={m.toString()} />
    ));

    const appHeaderText = "Szczegóły rośliny";
    const plantHeaderContents = (
        <View style={styles.cardInner}>
            <Image style={styles.icon} source={require('../../assets/icon.png')} />
            <Text>{plantInfo.name}</Text>
        </View>
    );
    const mainContents = (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>Interwał nawadniania(dni): </Text>
                <Picker
                    selectedValue={wateringIntervalInDays}
                    enabled={editMode}
                    onValueChange={setWateringIntervalInDays}
                    style={{ width: '30%' }}
                    dropdownIconColor={editMode ? 'gray' : 'white'}
                >
                    {wateringIntervalOptions}
                </Picker>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>Interwał nawożenia(tygodnie): </Text>
                <Picker
                    selectedValue={fertilizationIntervalInWeeks}
                    enabled={editMode}
                    onValueChange={setFertilizationIntervalInWeeks}
                    style={{ width: '30%' }}
                    dropdownIconColor={editMode ? 'gray' : 'white'}
                >
                    {fertilizationIntervalOptions}
                </Picker>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>Miesiące nawożenia: </Text>
                <Picker
                    selectedValue={fertilizationMonthStart}
                    enabled={editMode}
                    onValueChange={setFertilizationMonthStart}
                    style={{ width: '30%' }}
                    dropdownIconColor={editMode ? 'gray' : 'white'}
                >
                    {monthOptions}
                </Picker>
                <Text style={{ marginHorizontal: 5 }}>-</Text>
                <Picker
                    selectedValue={fertilizationMonthEnd}
                    enabled={editMode}
                    onValueChange={setFertilizationMonthEnd}
                    style={{ width: '30%' }}
                    dropdownIconColor={editMode ? 'gray' : 'white'}
                >
                    {monthOptions}
                </Picker>
            </View>
        </View>
    );


    return (
        <PlantDetailsTemplate appHeaderText={appHeaderText} plantHeaderContents={plantHeaderContents} mainContents={mainContents} />
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
});

export default UserPlantDetails;