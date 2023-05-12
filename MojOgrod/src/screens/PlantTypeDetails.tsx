import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import AppFooter from '../components/AppFooter';
import BackButton from '../components/BackButton';
import AppHeader from '../components/AppHeader';
import appColors from '../styles/appColors';
import homeScrollViewStyles from '../styles/homeScrollViewStyle';
import sizes from '../styles/sizes';

const screenHeight = Dimensions.get('screen').height;
const marginSize = screenHeight * 0.025;
const viewHeight = screenHeight * 0.1;

function PlantDetails({ route }): JSX.Element {
    const pType = route.params.pType;
    const footerContents = BackButton();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppHeader>{pType.name}</AppHeader>
            <View style={localStyles.container}>
                <View style={localStyles.header}>
                    {/*  */}
                </View>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={[localStyles.scrollView, { margin: marginSize }]}>
                    {/*  */}
                </ScrollView>
            </View>
            <AppFooter children={footerContents} />
        </SafeAreaView>
    );
}

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.darkerWhite,
        alignItems: 'center',
        marginVertical: sizes.mainViewMarginTop,
    },
    header: homeScrollViewStyles.card,
    scrollView: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default PlantDetails;
