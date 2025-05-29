import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { menuItems } from "../../Services";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CardContext } from "../../Context/CardContext";
import { transparent } from "react-native-paper/lib/typescript/styles/themes/v2/colors";


const { width ,height} = Dimensions.get('window');

const MenuRef = ({ setIndex, index }) => {
    const [menuRef, setMenuRef] = useState([]);
    const [subCat, setSubCat] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation();
    const { setCategory, category } = useContext(CardContext);

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await menuItems();
                setMenuRef(response.data);
                console.log(response.data);
                setLoading(false);

                if(!category?.category){
                    setCategory(response.data[0])
                    console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiii')
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchMenuData();
    }, [])

    const handlePress = (item) => {
        // navigation.navigate('')
        if (index != 1) {
            setIndex(1);
        }
        setCategory(item);
        console.log(item);
        // setSubCat(item)
    }
    if (index == 1) {
        console.log(category);
        return (
            <>
                {loading ? (
                    <View >
                        <ActivityIndicator animating size="large" color="#009b7" />
                    </View>
                ) : (
                    <View style={styles.containerWrapper}>
                        <View style={{ width: 105, backgroundColor:'#e9f7f4'}}>
                            <FlatList
                                data={menuRef}
                                keyExtractor={(item) => item?.category}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handlePress(item)}>
                                        <View style={styles.containerhr}>
                                            <View style={styles.category}>
                                                <View style={[
                                                    styles.cardBackActive,
                                                    category?.category !== item?.category && styles.cardBack
                                                ]}>
                                                    <Image
                                                        source={{ uri: "https://powertextools.com/pptsparesimages/Category/powertools_c.png" }}
                                                        style={{ width: width * .15, height: height * 0.05 }}
                                                        resizeMode="contain"
                                                    />
                                                    <Text style={[styles.textc,{color:'#737573'}]}>{item?.category}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                        <View style={{flex:1 , backgroundColor:'white'}}>
                        <FlatList
                            data={category.subcategory}
                            numColumns={3}
                            keyExtractor={(item, index) => index.toString()}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            renderItem={({ item }) => (
                                <View style={{ padding: 5,backgroundColor:'white' }}>
                                    <Image
                                        source={{ uri: "https://powertextools.com/pptsparesimages/Category/powertools_c.png" }}
                                        style={{ width: width * .2, height: width * .2 }}
                                        resizeMode="contain"
                                    />
                                    <Text style={[styles.text,{color:'#737573'}]}>{item?.subcategory}</Text>
                                </View>
                            )}
                        />
                        </View>
                    </View>
                )}
            </>

        )
    }

    return (
        <>
            {/* <ScrollView style={styles.container}> */}
            <FlatList
                data={menuRef}
                horizontal
                pagingEnabled
                // showsHorizontalScrollIndicator={true}
                keyExtractor={(item) => item.category}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => { handlePress(item) }}>
                        <View style={{ padding: 2, marginHorizontal: 5, alignItems: 'center', marginVertical: 10 }}>
                            <View style={styles.card}>
                                <Image
                                    source={{ uri: "https://powertextools.com/pptsparesimages/Category/powertools_c.png" }}
                                    style={{ width: width * .5, height: '100%' }}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.text}>{item?.category}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            {/* </ScrollView> */}
            {/* <Text>MenuPage</Text> */}
        </>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: '#f5f5f5',
    },
    containerhr: {
        // width: width,
        // paddingRight:0,
        flexDirection: 'row',
        alignSelf:'center',
        borderRightWidth: 1,
        borderColor: '#ccc',
        // backgroundColor:'#ccc',
        // borderRadius:20
    },
    cardBack: {
        width:120,
        backgroundColor: 'transparent',
        borderRadius: 0,
        alignItems:'center',
    },
    containerWrapper:{ 
        width: width,
        flexDirection: 'row' ,
    },
    cardBackActive: {
        width:120,
        alignItems:'center',
        backgroundColor: 'white', // 'none' is not valid
        borderRadius: 0,
        // borderBottomWidth:1
    },
    card: {
        marginHorizontal: 5,
        height: width * .2,
        width: width * .2,
        padding: 10,
        backgroundColor: '#caede5',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textc: {
        // backgroundColor: '#caede5',
        // height:width*.15,
        // width:width*.2
        color: '#5a9c8c',
        fontSize:10,
        width: width * .2,
        textAlign:"center",
        fontWeight: 'bold',
        paddingVertical:5,
        borderBottomWidth:1,
        borderColor:'#ccc'
    },
    text: {
        // backgroundColor: '#caede5',
        // height:width*.15,
        // width:width*.2
        color: '#5a9c8c',
        fontSize:10,
        width: width * .2,
        textAlign:"center",
        fontWeight: 'bold',
        paddingVertical:5,
        // borderBottomWidth:1
    },
    category: {
        // backgroundColor:'pink',
        padding: 10
    }

})


export default MenuRef;