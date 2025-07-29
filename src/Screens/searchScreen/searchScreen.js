import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { searchProduct } from "../../Services";
import { useRoute } from "@react-navigation/native";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
// import { useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get('window')

const SearchScreen = () => {
    const navigation=useNavigation();

    const route = useRoute();
    const [data, setData] = useState([]);
    const [sortedData,setSortedData] = useState([]);
    const [filteredData,setFilteredData] = useState([]);
    const { query } = route.params;

    useEffect(() => {
        const fetchSearchData = async () => {
            // console.log(query);
            try {
                const response = await searchProduct(query);
                setData(response);
                setFilteredData(response);
                console.log(response)
            } catch (err) {
                console.log(err);
            }
        }
        fetchSearchData();
    }, []
    )

    // const [showHeader, setShowHeader] = useState(true);
    const scrollOffset = useRef(0);
    const [showHeader, setShowHeader] = useState(true);
    const [showFilter, setFilter] = useState(false);
    const lastDirection = useRef(null); // Track last direction

    const handleScroll = (event) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const diff = currentOffset - scrollOffset.current;

        // Only react to scrolls > 15px
        if (Math.abs(diff) < 15) return;

        const direction = diff > 0 ? 'down' : 'up';

        // Avoid toggling if direction hasn't changed
        if (direction === lastDirection.current) return;

        if (direction === 'down') {
            setShowHeader(false);
        } else if (direction === 'up') {
            setShowHeader(true);
        }

        lastDirection.current = direction;
        scrollOffset.current = currentOffset;
    };

    const [isAsc, setIsAsc] = useState(true);

    const handleSort = () => {
        console.log(data);
        const sortedProduct = [...filteredData].sort((a, b) =>
            isAsc
                ? parseFloat(a.discounted_price.replace('₹', '')) -
                parseFloat(b.discounted_price.replace('₹', ''))
                : parseFloat(b.discounted_price.replace('₹', '')) -
                parseFloat(a.discounted_price.replace('₹', ''))
        );
        console.log(sortedProduct);

        // setData(sortedProduct);
        setFilteredData(sortedProduct);
        setIsAsc(!isAsc);
    };
    const uniqueBrands = data.filter(
        (item, index, self) =>
            self.findIndex(i => i.brand === item.brand) === index
    );
    const handleFilter = () => {
        setFilter(true);
    }
    const handleBrand = (brand) =>{
        const Brands=[...data].filter((item)=>item.brand==brand);
        
        setFilteredData(Brands);
        setFilter(false)
    }
    const handleWistlist = (item) => {
       
    }

    const handleProduct = (id) => {
console.log(id);
navigation.navigate("ProductDetail",{id:id})

    }

    const renderItem = ({ item }) => (
        <>
            <View style={styles.card}>
                <TouchableOpacity onPress={handleWistlist} style={styles.icon}>
                    <Icon name={'heart-outline'} size={25} color={'black'} />
                </TouchableOpacity>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View>
                        <TouchableOpacity onPress={()=>{handleProduct(item?.productid)}} style={styles.imgCard}>
                            <Image source={{ uri: item.high_image_1 }} style={styles.img} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 50, alignSelf: 'center' }}>
                        <Text style={styles.heading}>{item.subcategory}</Text>
                        <Text style={styles.subHeading}>{item.modelno}</Text>
                        <Text style={{ fontSize: 10 }}>{item.brand}</Text>
                        <Text style={styles.price}>{item.discounted_price} </Text>
                        <Text style={styles.price}>
                            <Text style={styles.strikeThrough}>₹{item.mrp}</Text>
                            <Text style={styles.discount}>  {item.discount_percent + '%'} OFF</Text>
                        </Text>
                        <View style={{ marginTop: 10 }}>
                            <Icon name={'star-outline'} size={15} />
                        </View>
                    </View>
                </View>
                {/* <Text>{item.mrp}</Text> */}
            </View>
        </>
    )


    return (
        <>
            <View style={{ backgroundColor: '#e9f7f4', height: height - 100 }}>
                {/* <Text>searchScreen</Text> */}

                {showHeader && (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', height: 25, marginBottom: 10 }}>
                        <TouchableOpacity onPress={handleSort}>
                            <Image source={require('../../assets/sort.png')} style={{ width: 25, height: 25 }} />
                        </TouchableOpacity>

                        <View style={{ borderRightWidth: 1 }} />
                        <TouchableOpacity onPress={handleFilter}>
                            <Image source={require('../../assets/filter.png')} style={{ width: 25, height: 25 }} />
                        </TouchableOpacity>
                    </View>
                )}
                <FlatList
                    data={filteredData}
                    numColumns={1}
                    renderItem={renderItem}
                    onScroll={handleScroll}
                    scrollEventThrottle={60}
                />
            </View>

            {showFilter && (
                <>
                    {/* Overlay */}
                    <TouchableOpacity
                        style={styles.overlay}
                        activeOpacity={1}
                        onPress={() => setFilter(false)} // Close on background tap
                    />

                    {/* Bottom Sheet */}
                    <View style={styles.bottomSheet}>
                        <Text style={styles.sheetTitle}>Brands:</Text>
                        {/* Your filter UI goes here */}
                        <View >
                        <FlatList
                            data={uniqueBrands}
                            keyExtractor={(item, index) => item.brand + index}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={()=>{handleBrand(item.brand)}} style={styles.filter}><Text>{item.brand}</Text></TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity onPress={()=>{setFilteredData(data)}} style={styles.filter}><Text style={{alignSelf:'center'}}>All</Text></TouchableOpacity>
                        </View>
                    </View>
                </>
            )}

        </>
    )
}



const styles = StyleSheet.create({
    card: {
        // flexDirection:'column',
        width: width - 10,
        height: height * .15,
        resizeMode: 'contain',
        padding: 5,
        // margin: 10,
        borderBottomWidth: 1,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 15
    },
    filter:{
        alignSelf:'center',
        padding:10,
        height:40,
        // width:200,
        // borderBottomWidth:1
    },

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 5,
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 'auto', // bottom half of screen
        maxHeight:'50%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        zIndex: 6,
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    img: {
        width: width * .32,
        height: height * .12,
        // padding: 20,
        alignSelf: 'flex-start'

    },
    imgCard: {
        width: width * .4 - 20,

        // borderRightWidth: 1,
        borderBlockColor: 'black'
    },
    heading: {
        fontSize: 14,
        color: '#009b77'
    },
    subHeading: {
        fontSize: 16
    },
    price: {
        fontSize: 16,
        color: 'black',
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

    icon: {
        position: 'absolute',
        marginHorizontal: 8,
        marginVertical: 10,
        zIndex: 10,
        alignSelf: 'flex-end'
    }
})

export default SearchScreen;