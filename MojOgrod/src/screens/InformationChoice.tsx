import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import AppFooter from '../components/AppFooter';
import BackButton from '../components/BackButton';
import AppHeader from '../components/AppHeader';
import InformationSV from '../components/InformationSV';

function InformationChoice(route): JSX.Element {
    const footerContents = BackButton();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppHeader>INFORMACJE</AppHeader>
            <InformationSV onTouchScreen='' />
            <AppFooter children={footerContents} />
        </SafeAreaView>
    );
}

export default InformationChoice;