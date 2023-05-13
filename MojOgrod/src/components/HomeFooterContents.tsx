import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import sizes from '../styles/sizes';
import eventEmitter from '../services/eventEmitter';
import { homeSVTypes } from '../screens/HomeScreen';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const selectList = (selectedList: number) => {
    eventEmitter.emit('HomeScrollViewType', selectedList)
}

function HomeFooterContents(): JSX.Element {
    const navigation = useNavigation();

    let addPlantButton = (
        <TouchableOpacity>
            <Image
                source={require('../../assets/add-button.png')}
                style={localStyles.footerButton}
                resizeMode='contain'
            />
        </TouchableOpacity >
    );

    const [midButton, setMidButton] = useState(addPlantButton);

    let userPlantsButton = (
        <TouchableOpacity onPress={() => {
            selectList(homeSVTypes.userPlants);
            setMidButton(addPlantButton);
        }}>
            <Image
                source={require('../../assets/icon.png')}
                style={localStyles.footerButton}
                resizeMode='contain'
            />
        </TouchableOpacity>
    );

    return (
        < View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => {
                selectList(homeSVTypes.plantTypes);
                setMidButton(userPlantsButton);
            }}>
                <Image
                    source={require('../../assets/icon.png')}
                    style={localStyles.footerButton}
                    resizeMode='contain'
                />
            </TouchableOpacity>

            {midButton}

            <TouchableOpacity>
                <Image
                    source={require('../../assets/icon.png')}
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
        marginHorizontal: 10,
        resizeMode: 'contain',
    },
});

export default HomeFooterContents;