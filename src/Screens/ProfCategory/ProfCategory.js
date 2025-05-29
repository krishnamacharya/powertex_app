import React, { useContext, useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { CardContext } from "../../Context/CardContext";
import { shopByProf } from "../../Services";

const { width } = Dimensions.get("window");

const ProfCategory = () => {
  const [cardsData, setCardsData] = useState([]);
  const { cardData } = useContext(CardContext);
  const navigation=useNavigation();

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await shopByProf(cardData);
        setCardsData(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCardData();
  }, [cardData]);

  // Cleanup when screen is unfocused
  useFocusEffect(
    useCallback(() => {
      return () => {
        setCardsData([]);
      };
    }, [])
  );

  const handleNavigation = () =>{

  }


  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={ ()=> handleNavigation(item.productid)}>
      <Image source={{ uri: item.low_image_1 }} style={styles.img} />
      <Text style={styles.modelcl}>{item.modelno}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={cardsData}
      numColumns={2}                                            // Render items in two columns
      keyExtractor={(item) => item.productid}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />        
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    width: width * 0.5 - 10,
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  img: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  modelcl: {
    textAlign: 'center',
    backgroundColor: '#009b77',
    color: '#fff',
    paddingVertical: 6,
    fontWeight: '600',
  },
});

export default ProfCategory;
