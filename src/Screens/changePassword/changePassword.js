import React, { useRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import { changePasswordRef } from "../../Services";
import { TouchableOpacity } from "react-native";


const ChangePassword = () => {
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const [isPasswordVisible, setPasswordVisible] = useState([]);


    const handleSubmit = async () => {
        const payload = {
            password:newPasswordRef.current,
            confirmPassword:confirmPasswordRef.current
        }
        console.log(payload)
        try {
            const response = await changePasswordRef();
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>ChangePassword</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.Input} onChangeText={(text)=>{newPasswordRef.current=text}} placeholder="Password"></TextInput>
                    <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
                        <Icon
                            name={isPasswordVisible ? 'eye-off' : 'eye'}
                            size={22}
                            color="#888"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.Input} onChangeText={(text)=>{confirmPasswordRef.current=text}} placeholder="Change Password"></TextInput>
                    <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
                        <Icon
                            name={isPasswordVisible ? 'eye-off' : 'eye'}
                            size={22}
                            color="#888"
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText} >Sign Up</Text>
                </TouchableOpacity>
            </View>
        </>
    )


}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e9f7f4",
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
    Input: {
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
        marginBottom: 15,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
})

export default ChangePassword;