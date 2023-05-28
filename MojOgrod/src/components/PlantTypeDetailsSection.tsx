import React, { PropsWithChildren, PropsWithRef } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import appColors from '../styles/appColors';
import PlantDetailsSection from './PlantDetailsSection';
import chipStyles from '../styles/chip';

type SectionProps = {
    title: string;
    items: string[];
    containerColor: string;
};

type ChipListProps = {
    items: string[];
    containerColor: string;
};

const ChipList = ({ items, containerColor }: ChipListProps): JSX.Element => {
    return (
        <View style={styles.chipList}>
            {items.map((item, index) => (
                <View style={[styles.chipContainer, { backgroundColor: containerColor }]} key={`${item}-${index}`}>
                    <Text style={styles.chipText}>{item}</Text>
                </View>
            ))}
        </View>
    );
};

const PlantTypeDetailsSection = ({ title, items, containerColor }: SectionProps): JSX.Element => {
    if (items.length === 0) {
        return <View />;
    }
    const chipList = (<ChipList items={items} containerColor={containerColor}></ChipList>);
    return (
        <PlantDetailsSection title={title} children={chipList}></PlantDetailsSection>
    );
};

const styles = StyleSheet.create({
    chipContainer: {
        ...chipStyles.chip,
        justifyContent: 'center',
    },
    chipList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chipText: {
        fontSize: 16,
        color: appColors.grey,
    },
});

export default PlantTypeDetailsSection;