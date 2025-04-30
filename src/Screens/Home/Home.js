import React, { useEffect, useState } from 'react';
import {  FlatList,View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { getBanners } from '../../Services/index'; // Make sure this is defined and returns the correct format
import { Dimensions } from 'react-native';
import { StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AddToCartButton from '../../Components/AddToCart/addToCart';
import ItemCard from '../../Components/ItemCard/ItemCard';
// import SplashScreen from 'react-native-splash-screen';
// import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');
const Home = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await getBanners();
        setBannerData(response.Banner);
        console.log('Banner data:', response.Banner);
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchBannerData();
  }, []);


  return (
    <ScrollView>
      <LinearGradient colors={['#009b77', '#ffffff']} style={{ paddingBottom: 10}}>
    <FlatList
    data={bannerData}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={true}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <View style={{ width, height: 200 }}>
        <Image
          source={{ uri: item.imageurl }}
          style={{ width: width, height: '100%', resizeMode: 'contain' }}
        />
      </View>
    )}
  />
  </LinearGradient>
  <View style={{ flex:1, justifyContent: 'center', alignItems: 'center',backgroundColor: '#f5f5f5', marginTop: 10 }}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width*.9, marginTop: 10,flexWrap: 'wrap'}}>
    <ItemCard />
    </View>
    </View>
  </ScrollView>
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
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
