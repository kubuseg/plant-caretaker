import { StyleSheet } from 'react-native';

export const chipColors = {
    blue: '#d3e9ff',
    brown: '#bc8c74',
    yellow: '#fff1c1',
    green: '#beed9c',
    red: '#ff664a',
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