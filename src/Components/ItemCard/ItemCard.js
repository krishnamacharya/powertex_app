import React, { use } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { cardDetails } from "../../Services";
import { useEffect, useState } from "react";
import AddToCartButton from "../AddToCart/addToCart";
import { Dimensions } from "react-native";


const { width } = Dimensions.get("window");


const ItemCard = () => {
const [cardRef,setcardRef]=useState([]);

    useEffect(() => {
        // Any side effects can be handled here
       const fetchCardData = async () => {
            try {
                const response = await cardDetails();
                setcardRef(response.data);
                console.log('Card data:', response.data);
            } catch (error) {
                console.error('Error fetching card data:', error);
            }
        }
        fetchCardData();
    }, []);
    return (
       cardRef.map((item) => (
            <View style={styles.card} key={item.id}>
                <Image source={{ uri: item.image1||item.imageurl||item.exploreimage }} style={styles.image} />
                <Text numberOfLines ={1} ellipsizeMode="tail" style={styles.title}>{item.modelno}</Text>
                <Text style={styles.price}>${item.mrp}</Text>
                <View style={{marginTop: 10}}>
                <AddToCartButton item={item} />
                </View>
            </View>
        ))
    );
}   

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: 150,
        alignItems: "center",
    },
    // image: {
    //     width: "100%",
    //     height: width*.3,
    //     borderRadius: 10,
    // },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50, // half of width/height for perfect circle
        borderWidth: 2,
        borderColor: "#ccc",
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
       
        fontWeight: "bold",
        marginVertical: 5,
    },
    price: {
        fontSize: 14,
        color: "#888",
    },
});

export default ItemCard;
