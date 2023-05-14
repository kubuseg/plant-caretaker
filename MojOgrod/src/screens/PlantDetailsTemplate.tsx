import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import AppFooter from '../components/AppFooter';
import BackButton from '../components/BackButton';
import AppHeader from '../components/AppHeader';
import appColors from '../styles/appColors';
import sizes from '../styles/sizes';

type PTypeDetailsProps = {
    appHeaderText: string;
    plantHeaderContents: React.ReactNode;
    mainContents: React.ReactNode;
};

function PlantDetailsTemplate(props: PTypeDetailsProps): JSX.Element {
    const { appHeaderText, plantHeaderContents, mainContents } = props;
    const footerContents = BackButton();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppHeader>{appHeaderText}</AppHeader>
            <View style={localStyles.container}>
                <View style={localStyles.plantHeader}>
                    {plantHeaderContents}
                </View>

                <View style={localStyles.mainContents}>
                    {mainContents}
                </View>

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
        marginVertical: sizes.mainViewMargin,
    },
    plantHeader: {
        marginVertical: sizes.mainViewMargin,
        width: sizes.mainViewElementWidth,
        height: sizes.plantHeaderHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'white',
        marginVertical: sizes.mainViewMargin
    },
    mainContents: {
        marginVertical: sizes.mainViewMargin,
        width: sizes.mainViewElementWidth,
        height: '75%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    }
});

export default PlantDetailsTemplate;
