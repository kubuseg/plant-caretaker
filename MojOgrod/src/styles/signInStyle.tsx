import { StyleSheet, Dimensions } from 'react-native';
import appColors from './appColors';

const signInStyle = StyleSheet.create({
    inputView:{
    width:"80%",
    backgroundColor: appColors.turquoise,
    borderRadius:25,
    height:50,
    marginTop: 20,
    paddingLeft: 30,
    },
    container:{
    alignItems: 'center',
    marginTop: 30,
    height: "67.6%"
    },
    loginButton:{
    width:"40%",
    backgroundColor: "#B3B6B7",
    borderRadius:25,
    height:50,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    },
    signupButton:{
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center"
        },
});

export default signInStyle;