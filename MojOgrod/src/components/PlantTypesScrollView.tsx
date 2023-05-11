import {
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import PlantsDB from '../services/PlantsDB';
import plantTypes, { PlantType } from '../mocks/plantTypes';

import homeScrollViewStyles from '../styles/homeScrollViewStyle'

const PlantTypesScrollView = () => {
    //  const db = new PlantsDB();
    // const [plantTypes, setPlantTypes] = useState([]);

    // useEffect(() => {
    //     async function getPlantTypes() {
    //         try {
    //             const types = await db.getPlantsDescription(); //error here
    //             setPlantTypes(types as never);
    //         } catch (error) {
    //             console.log("Error while getting plant types: ", error);
    //         }
    //     }
    //     getPlantTypes();
    // }, []);

    const pTypes = plantTypes(); // use mock for platTypes instead of items from db
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
