import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import sizes from '../styles/sizes';
import eventEmitter from '../services/eventEmitter';
import { homeSVTypes } from '../screens/HomeScreen';

const selectList = (selectedList: number) => {
    eventEmitter.emit('HomeScrollViewType', selectedList)
}

function HomeFooterContents(): JSX.Element {
    return (
        < View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => selectList(homeSVTypes.plantTypes)}>
                <Image
                    source={require('../../assets/icon.png')}
                    style={localStyles.footerButton}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectList(homeSVTypes.userPlants)}>
                <Image
                    source={require('../../assets/icon.png')}
                    style={localStyles.footerButton}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image
                    source={require('../../assets/icon.png')}
                    style={localStyles.footerButton}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View >);
}


const localStyles = StyleSheet.create({
    footerButton: {
        width: sizes.homeFooterButtonW,
        height: sizes.homeFooterButtonH,
        marginHorizontal: 10,
        resizeMode: 'contain',
    },
});

export default HomeFooterContents;