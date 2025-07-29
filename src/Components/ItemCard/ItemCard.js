import React, {useContext} from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { cardDetails, shopByCategory } from "../../Services";
import { useEffect, useState } from "react";
import AddToCartButton from "../AddToCart/addToCart";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CardContext } from "../../Context/CardContext";


const { width } = Dimensions.get("window");
// const navigation = useNavigation();


const ItemRoundCard = () => {
  const [cardRef, setcardRef] = useState([]);
 const {setCardData} = useContext(CardContext);
  const handleProfCategory = (item) => {
    setCardData(item.shotform);
    console.log(item.shotform);
    // navigation.navigate('Menu');
    // setIndex(1);

  }

  useEffect(() => {
    // Any side effects can be handled here
    const fetchCardData = async () => {
      try {
        const response = await cardDetails();
        setcardRef(response);
        console.log('Card data:', response);
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    }
    fetchCardData();
  }, []);
  return (
    <>
    <Text style={{ fontSize: 18, fontWeight: 'bold',color:'#009b77', marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
      Shop By Profession
    </Text>
    <View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
      {cardRef.map((item) => (
        <TouchableOpacity onPress={() => handleProfCategory(item)} key={item.shotform}>
        <View style={styles.itemContainer} key={item.shotform}>
          <Image
            source={{ uri: item.image }}
            style={styles.circularImage}
          />
          <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.name,{ textTransform: 'capitalize' } ]}>
            {item.profession.toLowerCase() }
          </Text>
        </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
    </View>
    </>
  );
}


const ItemCard = () => {
  const [cardRef, setcardRef] = useState([]);

   const handleProfCategory = () => {
    // navigation.navigate('Menu');
    //  setIndex(1);
    }
        
  useEffect(() => {
    // Any side effects can be handled here
    const fetchCardData = async () => {
      try {
        const response = await shopByCategory();
        setcardRef(response);
        console.log('Card data:', response);
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    }
    fetchCardData();
  }, []);
  return (
    <View >
      <Text style={{ fontSize: 18, fontWeight: 'bold',color:'#009b77', marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
        Shop By Category
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap', // <- required for grid wrap
          justifyContent: 'space-around',
          width: width,
          paddingHorizontal: 10,
          // marginTop: 10,
        }}
      >

        {cardRef.slice(0, 6).map((item) => (
          <TouchableOpacity onPress={handleProfCategory} key={item.productid}>
          <View style={styles.Container} key={item.productid}>
            <Image
              source={{ uri: item.cat }}
              style={styles.Image}
            />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
              {item.Category}
            </Text>
            {/* <AddToCartButton item={item} /> */}
          </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );


}



const styles = StyleSheet.create({
  scrollContainer: {
    marginVertical: 10,
  },
  itemContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: (width * 0.9 - 20) / 3,
    height: width * .35,
    marginVertical: 10,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  Image: {
    width: '100%',
    height: width * 0.25,
    resizeMode: 'contain',
  },
  circularImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  name: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    
    width: 80,
  },

});

export { ItemCard };
export default ItemRoundCard;