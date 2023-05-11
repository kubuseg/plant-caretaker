import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import sizes from '../styles/sizes';

function HomeFooterContents(): JSX.Element {
    return (
        < View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
                <Image
                    source={require('../../assets/icon.png')}
                    style={styles.footerButton}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image
                    source={require('../../assets/icon.png')}
                    style={styles.footerButton}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image
                    source={require('../../assets/icon.png')}
                    style={styles.footerButton}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View >);
}


const styles = StyleSheet.create({
    footerButton: {
        width: sizes.homeFooterButtonW,
        height: sizes.homeFooterButtonH,
        marginHorizontal: 10,
        resizeMode: 'contain',
    },
});

export default HomeFooterContents;