import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import sizes from '../styles/sizes';
import PlantDetailsSection from '../components/PlantDetailsSection';
import { useNavigation } from '@react-navigation/native';
import PlantDetailsTemplate from './PlantDetailsTemplate';
import monthMap from '../services/monthMap';
import homeScrollViewStyles from '../styles/homeScrollViewStyle';
import BackButton from '../components/BackButton';
import FooterTextButton from '../components/FooterTextButton';
import chipStyles, { chipColors } from '../styles/chip';
import appColors from '../styles/appColors';

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
            <PlantDetailsSection title={`Opis gatunku ${plantInfo.type}:`}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        plantTypeInfo();
                    }}
                >
                    <Text style={styles.buttonText}>Opis</Text>
                </TouchableOpacity>
            </PlantDetailsSection>
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
        ...chipStyles.chip,
        fontSize: 20,
        marginBottom: '3%',
        color: appColors.grey
    },

    button: {
        width: "35%",
        padding: 3.5,
        backgroundColor: "#AFAFAF",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    }
});

export default UserPlantDetails;