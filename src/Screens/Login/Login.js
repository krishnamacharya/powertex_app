import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, Keyboard, Platform, TouchableWithoutFeedback, TextInput } from "react-native";
import { getBanners, signInRef } from "../../Services/index"; // Make sure this is defined and returns the correct format
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ loginRef, setIndex }) => {
    const [isPasswordVisible, setPasswordVisible] = useState(true);
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const error = {};

    const handleLogin = async () => {
        const payload = {
            email: username.trim(),
            password: password
        }
        try {
            const response = await signInRef(payload);
            const loginStatus = response;
            console.log(loginStatus);
            if (loginStatus == 'Invalid Password') {
                error.message = loginStatus;
            }
            else {
                setIndex(0);
                storeData(userData, loginStatus)
                // console.log(setIndex)
            }
        } catch (err) {
            error.message = "something went wrong"

        }
    }

    // ✅ Save data
    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error("Failed to save:", e);
        }
    };

    // ✅ Read data
    const getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value != null ? JSON.parse(value) : null;
        } catch (e) {
            console.error("Failed to load:", e);
        }
    };

    // ✅ Delete data
    const removeData = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            console.error("Failed to delete:", e);
        }
    };


    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        <View >
                            <Image source={require('../../assets/logo.png')} style={styles.logo} />
                        </View>
                        <Text style={styles.title}>Sign In</Text>
                        <Text style={{ alignContent: 'center', marginBottom: 10, color: '#5a9c8c' }}>Hi! ,Welcome Back</Text>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputp} placeholder="User Name" placeholderTextColor={"#888"} onChangeText={setUsername}></TextInput>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputp} placeholder="Password" placeholderTextColor={"#888"} secureTextEntry={isPasswordVisible} onChangeText={setPassword}></TextInput>
                            <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
                                <Icon
                                    name={isPasswordVisible ? 'eye-off' : 'eye'}
                                    size={22}
                                    color="#888"
                                />
                            </TouchableOpacity>
                            {/* {errors.password && <Text style={styles.errorText}>{errors.password}</Text>} */}
                            {error.message && <Text style={styles.errorText}>{error.message}</Text>}
                        </View>
                        <View>
                            <TouchableOpacity >
                                <TextInput style={[styles.link, { alignItems: 'right' }]}>
                                    Forgot Password?
                                </TextInput>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText} >Sign Up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => loginRef(false)}>
                            <Text style={styles.link} >New User ? Register</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e9f7f4",
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        marginLeft: 40,
        alignSelf: 'flex-start',
    },
    logo: {
        width: 180,
        height: 60,
        marginBottom: 20,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 50,
        paddingHorizontal: 20,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    inputp: {
        flex: 1,
        fontSize: 16,
        color: '#5a9c8c',
        paddingVertical: 12,
    },
    button: {
        width: '80%',
        borderRadius: 50,
        backgroundColor: "#009b77",
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 20,
        // fontSize:24,
        // borderRadius: 5,
        marginBottom: 15,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    link: {
        color: "#007BFF",
        fontSize: 16,
        textDecorationLine: 'underline'
    },
});

export default Login;