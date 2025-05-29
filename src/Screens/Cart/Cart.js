import React from "react";

import { View, Text, StyleSheet, Image, ScrollView } from "react-native";


const Cart = () => {
    return (
        <View style={styles.container}>
            <Text>Cart Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    logo: {
        width: 100,
        height: 100,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        backgroundColor: '#009b77',
        paddingVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
});



export default Cart;