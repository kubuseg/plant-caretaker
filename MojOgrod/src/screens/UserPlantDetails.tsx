import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import sizes from '../styles/sizes';
import PlantDetailsSection from '../components/PlantDetailsSection';
import { useNavigation } from '@react-navigation/native';
import PlantDetailsTemplate from './PlantDetailsTemplate';
import monthMap from '../services/monthMap';
import chipColors from '../styles/chipColors';
import homeScrollViewStyles from '../styles/homeScrollViewStyle';
import BackButton from '../components/BackButton';
import FooterTextButton from '../components/FooterTextButton';

const UserPlantDetails = ({ route }) => {
    const plantInfo = route.params.plantInfo;
    const navigation = useNavigation();

    async function plantTypeInfo() {
        navigation.navigate('PlantTypeDetails' as never, { plantInfo: plantInfo } as never);
    }

    const appHeaderText = "Szczegóły rośliny";
    const plantHeaderContents = (
        <>
            <Image style={styles.icon} source={{ uri: plantInfo.image }} />
            <Text style={homeScrollViewStyles.title}>{plantInfo.name}</Text>
        </>
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
        </View>
    );

    const onPressEdit = () => {
        navigation.navigate("UserPlantSettings" as never, { plantInfo: plantInfo } as never);
    }


    const footerContents = (
        <>
            <BackButton />
            <FooterTextButton text="EDYTUJ" onPress={onPressEdit} />
        </>
    );

    return (
        <PlantDetailsTemplate
            appHeaderText={appHeaderText}
            plantHeaderContents={plantHeaderContents}
            mainContents={mainContents}
            footerContents={footerContents}
        />
    );
};

const styles = StyleSheet.create({
    icon: homeScrollViewStyles.icon,
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