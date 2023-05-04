import React from 'react';
import AppFooter from '../components/AppFooter'
import AppHeader from '../components/AppHeader'
import type { PropsWithChildren } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    ScrollView,
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import plantTypes from '../mocks/plantTypes';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const pTypes = plantTypes();

function HomeScreen(): JSX.Element {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppHeader />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                <View style={styles.container}>
                    {pTypes.map((plantType) => (
                        <TouchableOpacity
                            key={plantType.id}
                            style={styles.card}
                            onPress={() => {
                                // navigation.navigate('PlantDetails' as never, { pType: plantType } as never);
                            }}
                        >
                            <View style={styles.cardInner}>
                                <Image style={styles.icon} source={plantType.icon} />
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
            <AppFooter />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white'
    },
    container: {
        flexDirection: 'column',
        marginVertical: screenHeight * 0.025,
        alignItems: 'center'
    },
    card: {
        marginHorizontal: 10,
        marginBottom: screenHeight * 0.025,
        width: screenWidth * 0.93,
        height: screenHeight * 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        elevation: 5,
    },
    cardInner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: screenHeight * 0.1,
        height: screenHeight * 0.1,
    },
    title: {
        fontSize: 16,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    arrowContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});

export default HomeScreen;
