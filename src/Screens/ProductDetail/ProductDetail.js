import React, { useEffect, useState } from "react";
import { View ,Image ,Text, StyleSheet ,ScrollView} from "react-native";
import { productDetailRef } from "../../Services";
import { useRoute } from "@react-navigation/native";
import { Dimensions } from "react-native";
import BottomContainer from "../../Components/bottomNavBar/BottomNavBar";
// import { ScrollView } from "react-native-gesture-handler";


const {width,height} = Dimensions.get('window')


const ProductDetail =()=>{
    const route = useRoute();
    const id=route.params
    const [data,setData] = useState([]);



    useEffect(()=>{
        const fetchProductData= async ()=>{
            try{
                const response = await productDetailRef(id);
                setData(response.Done[0]);
                console.log(response.Done[0].high_image_1);
            }catch(err){
                console.log(err);
            }
        }
        fetchProductData();
    },[id]);


    return(
        <>
        <ScrollView style={{flex:1}}>
        <Image source={{ uri: data.high_image_1 }} style={{width:'100%' ,height:height*0.3}} resizeMode="contain"/>
        <Text style={styles.subText}>{data.subcategory}</Text>
        <Text style={styles.model}>{data.modelno}</Text>
        <Text style={styles.details}>Product Details : {data.long_name}</Text>
        </ScrollView>
          <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white', // set background to avoid transparency
        // padding: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
          borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
        <BottomContainer mrp={data.discounted_price} id={data.productid}/>
      </View>
        </>
    )

}


const styles=StyleSheet.create({
    subText:{
        fontSize:14,
        color:'grey',
        padding:5
    },
    model:{
        fontSize:16,
        padding:5
        // color:
    },
    details:{
        fontSize:18,
        fontWeight:'bold',
        padding:5
    }
})


export default ProductDetail;