import {
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import PlantsDB from '../services/PlantsDB.js';
import { CosmosClient } from '@azure/cosmos';
import axios from 'axios';
import homeScrollViewStyles from '../styles/homeScrollViewStyle'


const PlantTypesScrollView = () => {
    const [plantTypes, setPlantTypes] = useState([]);

    axios.defaults.baseURL = 'https://plants-function-app.azurewebsites.net/api';
    axios.defaults.params = {
        code: 'WaiEKsxHpgKVmkYBAS2jhmWoD-L1Sf289qwNmlcwTgViAzFuXSZLVg=='
    }
    useEffect(() => {
        axios.get('/plants')
            .then(function (response) {
                console.log(response);
                console.log(response.data);
                setPlantTypes(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, []);
    const pTypes = plantTypes; // use mock for platTypes instead of items from db
    const styles = homeScrollViewStyles;

    const navigation = useNavigation();
    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.container}>
                {pTypes.map((plantType: any) => (
                    <TouchableOpacity
                        key={plantType.id}
                        style={styles.card}
                        onPress={() => {
                            navigation.navigate('PlantTypeDetails' as never, { pType: plantType } as never);
                        }}
                    >
                        <View style={styles.cardInner}>
                            <Image style={styles.icon} source={require('../../assets/icon.png')} />
                            <Text style={styles.title}>{plantType.name}</Text>
                            <View style={styles.arrowContainer}>
                                <Image
                                    style={styles.icon}
                                    source={require('../../assets/icon.png')}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    )
}

export default PlantTypesScrollView;
