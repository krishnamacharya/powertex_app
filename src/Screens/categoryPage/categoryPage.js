import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useState } from "react";
import ProfCategory from "../ProfCategory/ProfCategory";
import BottomNavBar from "../../Components/bottomNavBar/BottomNavBar";
import MenuRef from "../../Components/Menu/Menu";


const CategoryPage = () => {
    const [cardsData,setCardsData]=useState([])

  return (
    <View style={styles.container}>
        {/* <ProfCategory/> */}
        <MenuRef />
      {/* <Text>Category</Text> */}
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
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
export default CategoryPage;
