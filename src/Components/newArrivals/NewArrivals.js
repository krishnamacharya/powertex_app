import React, { useEffect } from "react";
import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { Dimensions } from "react-native";
import { newarrivals } from "../../Services";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";


const { width, height } = Dimensions.get('window');

const NewArrivals = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const [data, setData] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    //    const wishlist=[];

    var Page = 'Home'
    if (route.name == 'Menu') {
        Page = 'Menu'
    }

    useEffect(() => {
        const newarrivalsData = async () => {
            try {
                const response = await newarrivals();
                setData(response.Done);
                console.log(response.Done);
            } catch (err) {
                console.log(err);
            }

        }
        newarrivalsData();
    }, [])

    const handleWishlist = (productId) => {
        setWishlist((prev) => {
            if (prev.includes(productId)) {
                return prev.filter((id) => id !== productId);
            } else {
                return [...prev, productId];
            }
        });
    };

    return (
        <>
            {(Page == 'Menu') && (
                <>
                    <ScrollView style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
                        {data.map((item, index) => (
                            <TouchableOpacity key={index.toString()} onPress={() => { navigation.navigate("ProductDetail", { id: item.productid }) }} style={styles.card}>
                                <TouchableOpacity onPress={() => { handleWishlist(item.productid) }} style={styles.icon}>
                                    <Icon name={wishlist.includes(item.productid) ? 'heart' : 'heart-outline'} size={20} color={wishlist.includes(item.productid) ? 'red' : 'black'} style={{ alignSelf: 'center', padding: 2 }} />
                                </TouchableOpacity>
                                <View style={{
                                    width: width * 0.45,
                                    // height:width*0.45,
                                    backgroundColor: '#caede5',
                                    borderRadius: 25,
                                    // alignSelf:'center'
                                    padding: 5
                                }}>
                                    <Image source={{ uri: item.high_image_1 }} style={styles.img} resizeMode="contain" />
                                </View>
                                <Text style={styles.sub}>{item.modelno}</Text>
                                <Text style={styles.price}>
                                    {item.discounted_price}{' '}
                                    <Text style={styles.strikeThrough}>{item.mrp}</Text>
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </>
            )}


            {(Page == 'Home') && (
                <>
                    <View style={styles.subTitle}>
                        <Text style={styles.title}>New Arrivals :</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Menu', { query: 'newArrivals' })}>
                            <Text style={{
                                marginBottom: 10,
                                marginTop: 10,
                                marginLeft: 10,
                                marginRight: 10
                            }}>View More....</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.grid}>
                        {data.slice(0, 6).map((item, index) => (
                            <TouchableOpacity key={index.toString()} onPress={() => { navigation.navigate("ProductDetail", { id: item.productid }) }} style={styles.card}>
                                <TouchableOpacity onPress={() => { handleWishlist(item.productid) }} style={styles.icon}>
                                    <Icon name={wishlist.includes(item.productid) ? 'heart' : 'heart-outline'} size={20} color={wishlist.includes(item.productid) ? 'red' : 'black'} style={{ alignSelf: 'center', padding: 2 }} />
                                </TouchableOpacity>
                                <View style={{
                                    width: width * 0.45,
                                    // height:width*0.45,
                                    backgroundColor: '#caede5',
                                    borderRadius: 25,
                                    // alignSelf:'center'
                                    padding: 5
                                }}>
                                    <Image source={{ uri: item.high_image_1 }} style={styles.img} resizeMode="contain" />
                                </View>
                                <Text style={styles.sub}>{item.modelno}</Text>
                                <Text style={styles.price}>
                                    {item.discounted_price}{' '}
                                    <Text style={styles.strikeThrough}>₹{item.mrp}</Text>
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>)}
        </>
    )
}

const styles = StyleSheet.create({
    img: {
        width: width * .25,
        height: width * .3,
        alignSelf: 'center'
    },
    subTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignContent:'center'
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        //   padding:0
    },
    card: {
        // padding:10,
        width: width * .45,
        height: width * .45,
    },
    sub: {
        textAlign: 'center',
        padding: 2
    },
    subcat: {
        textAlign: 'center',
        padding: 2
    },
    mrp: {
        textAlign: 'center'
    },
    icon: {
        width: width * .08,
        height: width * .08,
        position: 'absolute',
        marginHorizontal: 8,
        marginVertical: 10,
        zIndex: 10,
        alignSelf: 'flex-end',
        backgroundColor: '#e9f7f4',
        borderRadius: 25,
        padding: 4
    },
    title:
    {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#009b77',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10
    },
    price: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center'
    },

    strikeThrough: {
        textDecorationLine: 'line-through',
        color: 'gray',
        fontSize: 12
    },

    discount: {
        color: 'red',
        fontWeight: 'bold',
    },


})

export default NewArrivals;