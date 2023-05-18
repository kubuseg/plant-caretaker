import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import sizes from '../styles/sizes';
import appColors from '../styles/appColors';

type SectionProps = {
    title: string;
    items: string[];
    containerColor: string;
};

const PlantDetailsSection = ({ title, items, containerColor }: SectionProps): JSX.Element => {
    if (items.length === 0) {
        return <View />;
    }
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.chipListContainer}>
                {items.map((item, index) => (
                    <View style={[styles.chipContainer, { backgroundColor: containerColor }]} key={`${item}-${index}`}>
                        <Text style={styles.chipText}>{item}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        maxWidth: '100%',
        paddingHorizontal: '2.5%',
    },
    sectionTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: '2%',
    },
    chipListContainer: {
        marginLeft: '2.5%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chipContainer: {
        borderRadius: 20,
        paddingHorizontal: 13,
        paddingVertical: 6,
        marginVertical: 5,
        marginRight: 10,
        justifyContent: 'center',
    },
    chipText: {
        fontSize: 16,
        color: appColors.grey,
    },
});

export default PlantDetailsSection;