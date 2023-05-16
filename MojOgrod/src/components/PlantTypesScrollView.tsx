import {
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import homeScrollViewStyles from '../styles/homeScrollViewStyle'
import { getPlantsDescriptions } from '../services/PlantsDBApi';

const PlantTypesScrollView = () => {
    const [plantTypes, setPlantTypes] = useState<any[]>([]);

    const refreshPlants = async () => {
        const result = await getPlantsDescriptions();
        setPlantTypes(result);
    }

    useEffect(() => {
        refreshPlants();
    }, []);
    const styles = homeScrollViewStyles;

    const navigation = useNavigation();
    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.container}>
                {plantTypes.map((plantType: any) => (
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
