import { SafeAreaView, ActivityIndicator } from "react-native"
import appColors from "../styles/appColors"

const LoadingScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={80} color={appColors.turquoise} />
        </SafeAreaView>
    )
}

export default LoadingScreen;