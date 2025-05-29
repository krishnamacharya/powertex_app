import React from "react";

import {
    View, Text, StyleSheet, KeyboardAvoidingView, Platform, Keyboard,
    TouchableWithoutFeedback, Image, ScrollView
} from "react-native";
import { useState } from "react";
import { BottomNavigation, PaperProvider } from 'react-native-paper';
import Home from "../Home/Home";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import { Dimensions } from "react-native";
import CustomHeader from "../../Components/customHeader/customHeader";
import LinearGradient from "react-native-linear-gradient";
import Category from "../categoryPage/categoryPage";
import { CardDataProvider } from "../../Context/CardContext";

const { width } = Dimensions.get('window');


const LandingPage = () => {
    const [index, setIndex] = React.useState(0);
    const [showProfCategory, setShowProfCategory] = React.useState(false);

    const [routes] = React.useState([
        {
            key: 'home',
            // title: 'Home',
            focusedIcon: () => (
                <Image
                    source={require('../../assets/home.png')}
                    resizeMode="contain"
                    style={{ width: 24, height: 20 }}
                />
            )
        },
        {
            key: 'Category',
            // title: 'Home',
            focusedIcon: () => (
                <Image
                    source={require('../../assets/menu.png')}
                    resizeMode="contain"
                    style={{ width: 24, height: 20 }}
                />
            )
        },
        {
            key: 'login',
            // title: 'Login',
            focusedIcon: () => (
                <Image
                    source={require('../../assets/wishlist.png')}
                    resizeMode="contain"
                    style={{ width: 24, height: 20 }}
                />
            )
        },
        {
            key: 'signUp',
            // title: 'Home',
            focusedIcon: () => (
                <Image
                    source={require('../../assets/people.png')}
                    resizeMode="contain"
                    style={{ width: 24, height: 20 }}
                />
            )
        },

    ]);
    const renderScene = BottomNavigation.SceneMap({
        home: () => <Home setIndex={setIndex} index={index}/>,
        login: Login,
        Category: ()=><Category index={index}/>,
        signUp: () => <Signup setIndex={setIndex} />,
    });
    return (
        <>
            <PaperProvider>
                {routes[index].key !== 'home' && routes[index].key !== 'signUp' && <CustomHeader />}
                <CardDataProvider>
                    
                            <BottomNavigation
                                navigationState={{ index, routes }}
                                lazy
                                onIndexChange={setIndex}
                                renderScene={renderScene}
                                activeIndicatorStyle={{
                                    backgroundColor: '#caede5',
                                    height: 40,
                                    borderRadius: 50,
                                }}
                                barStyle={{ backgroundColor: 'white', height: width * 0.14, }}
                            />
                      
                </CardDataProvider>
            </PaperProvider>

        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e9f7f4',
    },
    logo: {
        width: 100,
        height: 100,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        backgroundColor: '#009b77',
        paddingVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
});

export default LandingPage;