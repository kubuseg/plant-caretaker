import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';

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

const screenHeight = Dimensions.get('screen').height;
const buttonScrRatio = 0.1;


const styles = StyleSheet.create({
    footerButton: {
        width: screenHeight * buttonScrRatio,
        height: screenHeight * buttonScrRatio,
        marginHorizontal: 10,
        resizeMode: 'contain',
    },
});

export default HomeFooterContents;