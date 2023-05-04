import React from 'react';
import AppFooter from '../components/AppFooter'
import AppHeader from '../components/AppHeader'
import PlantTypesScrollView from '../components/PlantTypesScrollView';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';


function HomeScreen({ route }): JSX.Element {
    const headerContents = (
        <View>
            <Text style={styles.headerTitle}>Mój Ogród</Text>
        </View>);

    const footerContents = (
        < View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
                <Image
                    source={require('../../assets/icon.png')}
                    style={styles.footerButton}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image
                    source={require('../../assets/icon.png')}
                    style={styles.footerButton}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image
                    source={require('../../assets/icon.png')}
                    style={styles.footerButton}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View >);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppHeader children={headerContents} />
            <PlantTypesScrollView />
            <AppFooter children={footerContents} />
        </SafeAreaView>
    );
}

const screenHeight = Dimensions.get('screen').height;
const buttonScrRatio = 0.1;

const styles = StyleSheet.create({
    headerTitle: {
        textAlign: 'center',
        fontFamily: 'NewTitleRoman',
        fontSize: 24,
        color: 'white',
    },
    footerButton: {
        width: screenHeight * buttonScrRatio,
        height: screenHeight * buttonScrRatio,
        marginHorizontal: 10,
        resizeMode: 'contain',
    },
});


export default HomeScreen;
