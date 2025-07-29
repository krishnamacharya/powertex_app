import React, { useState } from "react";
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from "react-native"
import { Dimensions } from "react-native";

const {width,height} = Dimensions.get('window');

const BottomContainer = (item) => {
    const [addButton,setAddButton] = useState(true);
    console.log(item);


    handelAddToCart = (id) => {

    }

    return (
        <>
            <View style={styles.container}>
                {addButton && (
                    <>
                        {/* Overlay */}

                        <TouchableOpacity
                            style={styles.overlay}
                            activeOpacity={1}
                            onPress={() => setAddButton(false)} // Close on background tap
                        />
                        {/* Bottom Sheet */}

                        <View style={styles.bottomSheet}>
                            {/* <Text style={styles.sheetTitle}>Brands:</Text> */}
                            {/* Your filter UI goes here */}
                            <View style={styles.bottomElements}>
                                <View style={{alignSelf:'center'}}>
                             <Text style={{fontSize:14,color:'grey',textAlign:'center'}}>Mrp :</Text>
                             <Text style={styles.content}>{item.mrp}</Text>
                                </View>
                                <View style={{borderWidth:1, borderColor:'grey'}}/>
                             <TouchableOpacity onPress={()=>{handelAddToCart(item.id)}}>
                                <Text style={styles.button}>Add To Cart</Text>
                             </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )}
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'black',
        height: '50%'
    },
    button:{
        width:width*0.5,
        color:'#009b77',
        height:'auto',
        padding:18,
        textAlign:'center',
        backgroundColor:'#e9f7f4',
        // borderRadius:50,
        fontSize:20,
        fontWeight:'bold',
        // fontFamily:'san'
    },
    content:{
      width:width*0.48,
        height:'auto',
        // padding:10,
        textAlign:'center',
        // backgroundColor:'#e9f7f4',
        // borderRadius:50,
        fontSize:20,
        fontWeight:'bold'  
    },
    bottomElements:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
        
    },
    //   overlay: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     width,
    //     height,
    //     backgroundColor: 'rgba(0, 0, 0, 0.4)',
    //     zIndex: 5,
    // },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 'auto', // bottom half of screen
        // maxHeight:'50%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // padding: 10,
        zIndex: 6,
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        // marginBottom: 15,
    },
})


export default BottomContainer;