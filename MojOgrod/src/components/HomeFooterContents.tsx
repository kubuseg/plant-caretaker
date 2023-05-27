import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import sizes from '../styles/sizes';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

function HomeFooterContents(): JSX.Element {
    const navigation = useNavigation();

    let addPlantButton = (
        <TouchableOpacity onPress={() => {
            navigation.navigate('PlantTypeChoice' as never);
        }}>
            <Image
                source={require('../../assets/add-button.png')}
                style={localStyles.footerButton}
                resizeMode='contain'
            />
        </TouchableOpacity >
    );

    return (
        < View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('PlantTypes' as never)
            }}>
                <Image
                    source={require('../../assets/book-button.png')}
                    style={localStyles.footerButton}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('PlantTypeChoice' as never);
            }}>
                <Image
                    source={require('../../assets/add-button.png')}
                    style={localStyles.footerButton}
                    resizeMode='contain'
                />
            </TouchableOpacity >

            <TouchableOpacity onPress={() => {
                navigation.navigate('InformationChoice' as never);
            }}>
                <Image
                    source={require('../../assets/info-button.png')}
                    style={localStyles.footerButton}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View >);
}


let localStyles = StyleSheet.create({
    footerButton: {
        width: sizes.homeFooterButtonW,
        height: sizes.homeFooterButtonH,
        marginHorizontal: sizes.homeFooterButtonHorizontalMargin,
        resizeMode: 'contain',
    },
});

export default HomeFooterContents;