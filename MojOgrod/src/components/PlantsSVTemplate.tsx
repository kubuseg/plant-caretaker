import {
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import homeScrollViewStyles from '../styles/homeScrollViewStyle';

const styles = homeScrollViewStyles;

type PlantSVParams = {
    plantsList: any[];
    onTouchScreen: string;
}

function PlantsSVTemplate({ plantsList, onTouchScreen }: PlantSVParams): JSX.Element {
    const navigation = useNavigation();
    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.container}>
                {plantsList.map((plant: any) => (
                    <TouchableOpacity
                        key={plant.id}
                        style={styles.card}
                        onPress={() => {
                            navigation.navigate(onTouchScreen as never, { plantInfo: plant } as never);
                        }}
                    >
                        <View style={styles.cardInner}>
                            <Image style={styles.icon} source={require('../../assets/icon.png')} />
                            <Text style={styles.title}>{plant.name}</Text>
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

export default PlantsSVTemplate;
