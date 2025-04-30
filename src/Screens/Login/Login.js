import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { getBanners } from "../../Services/index"; // Make sure this is defined and returns the correct format
import { useEffect, useState } from "react";

const Login = () => {
    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
        </View>
    );
}

export default Login;