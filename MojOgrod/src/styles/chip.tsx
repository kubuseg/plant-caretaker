import { StyleSheet } from 'react-native';

export const chipColors = {
    blue: '#d3e9ff',
    brown: '#F6DDCC',
    yellow: '#F9F3DB',
    green: '#DEEAD5',
    red: '#DADADA',
};

const chipStyles = StyleSheet.create({
    chip: {
        borderRadius: 20,
        paddingHorizontal: 13,
        paddingVertical: 6,
        marginVertical: 5,
        marginRight: 10,
    }
});

export default chipStyles;