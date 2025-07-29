import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Login from "../Login/Login";
import { CardContext } from "../../Context/CardContext";

const { width, height } = Dimensions.get('window');
const ProfilePage = () => {
    const navigation = useNavigation();
    const {userData,setUserData}=useContext(CardContext)

    // const [userData, setUserData] = useState([]);


     const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData');
            return value != null ? JSON.parse(value) : null;
        } catch (e) {
            console.error("Failed to load:", e);
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const id = await getData();
            console.log(id);
            setUserData(id);
        }
        fetchProfile();
    }, [])

if (!userData || !userData.username) {
    return (
        <Login/>
    )
};


    return (
        <>
            <View style={styles.container}>
                <View style={styles.pageIcon}>
                    <Icon name={'person-circle-outline'} size={80} />
                    <Text style={{ fontSize: 20 }}>Hi! {userData.username}</Text>
                </View>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.contentTitle} onPress={()=>navigation.navigate('editAddress')}>
                        <Image source={require('../../assets/people1.png')} resizeMode="contain" style={styles.titleImage} />
                        <Text style={styles.cTitleText}>
                            Your Profile
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contentTitle}>
                        <Image source={require('../../assets/credit-card.png')} resizeMode="contain" style={styles.titleImage} />
                        <Text style={styles.cTitleText}>
                            Payment Methods
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contentTitle}>
                        <Image source={require('../../assets/order.png')} resizeMode="contain" style={styles.titleImage} />
                        <Text style={styles.cTitleText}>
                            My Orders
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contentTitle} onPress={() => { navigation.navigate('changePassword') }}>
                        <Image source={require('../../assets/settings.png')} resizeMode="contain" style={styles.titleImage} />
                        <Text style={styles.cTitleText}>
                            Settings
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contentTitle}>
                        <Image source={require('../../assets/credit-card.png')} resizeMode="contain" style={styles.titleImage} />
                        <Text style={styles.cTitleText}>
                            Help Center
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contentTitle}>
                        <Image source={require('../../assets/logout.png')} resizeMode="contain" style={styles.titleImage} />
                        <Text style={styles.cTitleText}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>

    )
}




const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'column',
        // marginHorizontal:0,
        backgroundColor: '#e9f7f4'
    },
    pageIcon: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 50

    },
    titleImage: {
        width: 30,
        height: 25
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 12,
        marginVertical: 15,
    },
    contentTitle: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
        padding: 5,
        borderBottomWidth: 0.8,
        borderColor: '#ccc',

    },
    cTitleText: {
        fontSize: 20,
        marginHorizontal: 10
    }

})


export default ProfilePage;