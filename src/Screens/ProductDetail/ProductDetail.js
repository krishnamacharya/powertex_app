import React, { useEffect } from "react";
import { View } from "react-native";
import { productDetailRef } from "../../Services";



const ProductDetail =()=>{
    useEffect(()=>{
        const fetchProductData= async ()=>{
            try{
                const response = await productDetailRef()
            }catch(err){
                console.log(err);
            }
        }
    });
}
