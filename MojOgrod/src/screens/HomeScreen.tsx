import 'react-native-get-random-values';
import React from 'react';
import AppFooter from '../components/AppFooter'
import AppHeader from '../components/AppHeader'
import HomeFooterContents from '../components/HomeFooterContents'
import PlantTypesScrollView from '../components/PlantTypesScrollView';
import UserPlantsScrollView from '../components/UserPlantsScrollView';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';


function HomeScreen({ route }): JSX.Element {
    const headerContents = (
        <View>
            <Text style={styles.headerTitle}>Mój Ogród</Text>
        </View>);

    const footerContents = HomeFooterContents();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppHeader children={headerContents} />
            <PlantTypesScrollView />
            <AppFooter children={footerContents} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        textAlign: 'center',
        fontFamily: 'NewTitleRoman',
        fontSize: 24,
        color: 'white',
    },
});


export default HomeScreen;
