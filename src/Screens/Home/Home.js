import React, { useEffect, useState } from 'react';
import {  FlatList,View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { getBanners } from '../../Services/index'; // Make sure this is defined and returns the correct format
import { Dimensions } from 'react-native';
import { StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AddToCartButton from '../../Components/AddToCart/addToCart';
import MenuRef from '../../Components/Menu/Menu';
import ItemRoundCard, { ItemCard } from '../../Components/ItemCard/ItemCard';
import CustomHeader from '../../Components/customHeader/customHeader';
// import SplashScreen from 'react-native-splash-screen';
// import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');
const Home = ({setIndex,index}) => {


  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await getBanners();
        setBannerData(response);
        console.log('Banner data:', response);
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchBannerData();
  }, []);


  return (
    <View style={{backgroundColor: '#e9f7f4',flexGrow:1}}>
      {/* <LinearGradient colors={['#009b77', '#e0f7f4']} style={{ paddingBottom: width * 0.02 }}> */}
      <CustomHeader />
      <View >
      <MenuRef setIndex={setIndex} index={index}/>
      </View>
      <View>
    <FlatList
    data={bannerData}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={true}
    keyExtractor={(item) => item.toString()}
    renderItem={({ item }) => (
      <View style={{ width, height: 85 }}>
        <Image
          source={{ uri: item }}
          style={{ width: width, height: '100%', resizeMode: 'contain' }}
        />
      </View>
    )}
  />
  </View>
  {/* </LinearGradient> */}
  {/* <View style={{ flex:1, justifyContent: 'center', alignItems: 'center',backgroundColor: '#e9f7f4'}}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width, flexWrap: 'wrap'}}> */}
    <ItemRoundCard setIndex={setIndex}/>
    {/* </View>
    </View> */}
    <View >
      {/* <ItemCard setIndex={setIndex}/> */}
    </View>
  </View>
  )
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  bannerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
    alignItems: 'center',
  },
  bannerImage: {
    width: width*.9,
    height: 200,
    borderRadius: 10,
  },
  bannerText: {
    // marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
