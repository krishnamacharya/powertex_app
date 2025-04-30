import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";

const AddtoCartButton = ({item}) => {

    const handleaddToCart = () =>{
        console.log("Add to Cart button pressed");
    }

    return(
        <TouchableOpacity style={styles.button} onPress={handleaddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>     
    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#007BFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 15,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AddtoCartButton;

