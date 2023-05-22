import React, { PropsWithChildren, PropsWithRef } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import sizes from '../styles/sizes';
import appColors from '../styles/appColors';

type SectionProps = PropsWithChildren<{
    title: string;
}>;

type ChipListProps = {
    items: string[];
    containerColor: string;
};

const PlantDetailsSection = ({ children, title }: SectionProps): JSX.Element => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.sectionMainContainer}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        maxWidth: '100%',
    },
    sectionTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: '2%',
    },
    sectionMainContainer: {
        marginLeft: '2.5%',
    },
});

export default PlantDetailsSection;