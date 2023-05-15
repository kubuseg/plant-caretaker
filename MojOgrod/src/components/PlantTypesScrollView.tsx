import {
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import homeScrollViewStyles from '../styles/homeScrollViewStyle'

const userId = "1";
axios.defaults.baseURL = 'https://plants-function-app.azurewebsites.net/api';
axios.defaults.params = {
    code: 'hshWx3wyNS3KAVX2CG-m9HQHAYR8QupoBMcvhUTj86zbAzFuT1bcdQ=='
}

const PlantTypesScrollView = () => {
    const [plantTypes, setPlantTypes] = useState([]);

    const refreshPlants = async (userId: string) => {
        axios.get(`/plants/${userId}`)
        .then( (response) => {
            setPlantTypes(response.data);
        })
        .catch( (error) => {
            console.error(error);
        })
    }

    useEffect(() => {
        refreshPlants(userId);
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
