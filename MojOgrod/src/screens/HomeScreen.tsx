import React from 'react';
import AppFooter from '../components/AppFooter'
import AppHeader from '../components/AppHeader'
import HomeFooter from '../components/HomeFooter'
import PlantTypesScrollView from '../components/PlantTypesScrollView';
import UserPlantsScrollView from '../components/UserPlantsScrollView';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';


function HomeScreen({ route }): JSX.Element {
    const headerContents = (
        <View>
            <Text style={styles.headerTitle}>Mój Ogród</Text>
        </View>);

    const footerContents = HomeFooter();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppHeader children={headerContents} />
            <UserPlantsScrollView />{/* error with <PlantTypesScrollView /> */}
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
