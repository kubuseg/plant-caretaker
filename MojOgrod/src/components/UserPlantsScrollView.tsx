import {
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import style from '../styles/homeScrollViewStyle'
import userPlants from '../mocks/userPlants';
const plants = userPlants();

const styles = style();

function UserPlantsScrollView(): JSX.Element {
    const navigation = useNavigation();
    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.container}>
                {plants.map((plant) => (
                    <TouchableOpacity
                        key={plant.id}
                        style={styles.card}
                        onPress={() => {
                            // navigation.navigate('plantDetails' as never, { pType: plant } as never);
                        }}
                    >
                        <View style={styles.cardInner}>
                            <Image style={styles.icon} source={plant.icon} />
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

export default UserPlantsScrollView;
