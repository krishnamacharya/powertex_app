import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, InputAccessoryView, TextInput, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GestureHandlerRootView from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";

const {height, width } = Dimensions.get("window");

const CustomHeader = () => {
    const navigation = useNavigation();
    const [number, onChangeNumber] = React.useState('');
console.log(height,'height',width,'width')

    return(
        <>
        {/* <LinearGradient colors={['#009b77', '#6dedcf']} style={{ paddingBottom: width * 0.001 }}> */}
        <View style={styles.headerContainer}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                
            <TextInput style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Search here"
          placeholderTextColor={'#5a9c8c'}
          ></TextInput>
            <Image
                source={require("../../assets/search.png")}
                style={styles.logoSearch}
            />
            </View>
            
            {/* <Text style={styles.headerText}>Powertex</Text> */}
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <View style={styles.logoc}>
                <Image
                    source={require("../../assets/empty-cart.png")}
                    style={styles.logo}
                />
                </View>
                <Text style={styles.cartcount}>98</Text>
            </TouchableOpacity>
        </View>
        {/* </LinearGradient> */}
        </>
    )
}
export default CustomHeader;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#e9f7f4",
        padding: 10,
    },
    logoSearch: {
        position: "absolute",
        marginLeft: width * .7,
        width: 30,
        height: 30,
        // backgroundColor: "#fff",
    },
    logo: {
        // position: "absolute",
        width: 35,
        height: 35,
        // borderRadius:50,
        // backgroundColor: "#5a9c8c",
    },
    logoc: {
        // position: "absolute",
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width: 48,
        height: 35,
        borderRadius:50,
        backgroundColor: "#5a9c8c",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    input:{
        
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        // marginLeft:5,
        color:'#5a9c8c',
        // backgroundColor:'#fff',
        width:width*.8,
        height:width*.12,
        borderWidth:1,
        borderColor:'#5a9c8c',
        // marginLeft:width*.05,
        borderRadius:50,
        paddingLeft:20,
    },
    cartcount:{
        flex:1,
        position:'absolute',
        marginLeft:16,
        marginTop:8,
        backgroundColor:'#5a9c8c',
        width:width*0.048,
        height:width*0.04,
        borderRadius:10,
        color:'#fff',
        textAlign:'center',
        fontSize:14,
        justifyContent:'center'
        // alignItems:'center'
    }
});
