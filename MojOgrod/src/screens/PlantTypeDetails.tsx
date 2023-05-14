import {
    View,
    StyleSheet,
    Text,
    Image,
} from 'react-native';
import React from 'react';
import PlantDetailsTemplate from "./PlantDetailsTemplate";
import sizes from "../styles/sizes";
import PlantDetailsSection from '../components/PlantDetailsSection';

function PlantTypeDetails({ route }): JSX.Element {
    const pType = route.params.pType;
    const description = pType.description;

    const shortDescriptions: string[] = description.text;
    const sunlightExposure = description.sunlightExposure;

    const plantHeaderContents = (
        <View style={styles.cardInner}>
            <Image style={styles.icon} source={require('../../assets/icon.png')} />
            <View style={styles.descView}>
                {shortDescriptions.map((desc: string, index: number) => (
                    <Text key={index} style={styles.descLine}>- {desc}</Text>
                ))}
            </View>
        </View>
    );

    const mainContents = (
        <PlantDetailsSection title="Nasłonecznienie" items={sunlightExposure} containerColor="yellow" />
    );

    const appHeaderText = "OPIS: " + pType.name;
    return PlantDetailsTemplate({
        appHeaderText,
        plantHeaderContents,
        mainContents,
    });
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
    descView: {
        flexDirection: 'column',
        marginLeft: '3%',
    },
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