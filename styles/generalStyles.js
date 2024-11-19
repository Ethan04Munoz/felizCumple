import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: "center",
        padding: 20,
        backgroundColor: '#1c1c1c'
    },
    textColor:{
        color: '#fff'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 40,
        fontWeight: "700",
        textAlign: "center"
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: "80%"
    },
    buttonDisabled:{
        backgroundColor: '#cbcbcb',
    },
    buttonEnabled:{
        backgroundColor: '#ff94ef',
    },
    buttonText: {
        marginLeft: 8,
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
    },
    input:{
        fontSize: 20
    },
});
