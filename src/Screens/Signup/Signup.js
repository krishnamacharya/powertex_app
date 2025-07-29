import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput,KeyboardAvoidingView,Keyboard,Platform,TouchableWithoutFeedback, TouchableOpacity, ScrollView } from "react-native";
import { useEffect } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox } from "react-native-paper";
import { signUpRef } from "../../Services";
import Login from "../Login/Login";
import ChangePassword from "../changePassword/changePassword";
import { Dimensions } from "react-native";

const {width} = Dimensions.get('window')
const Signup = () => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [checked, setChecked] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(true);
  const [isConfirmVisible, setConfirmVisible] = useState(true);
  const [loginPage, setLoginPage] = useState(false);

  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is Required',
        valid = false;
    }
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!mobileRegex.test(mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
      valid = false;
    }
    const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegexp.test(email)) {
      newErrors.email = 'Enter a valid email';
      valid = false;
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be atleast 6 characters'
      valid = false;
    }
    if (confirmPassword != password) {
      newErrors.confirmPassword = 'Passwords do not match'
      valid = false;
    }
    if (!checked) {
      newErrors.terms = 'you must accept terms and conditions'
      valid = false;
    }
    setErrors(newErrors);
    console.log(name, email, password, confirmPassword);
    return valid;
  }

  const handleSubmit = async () => {
    if (validate()) {
      // console.log("validation success")
      const payload = {
        username: name,
        first_name: name,
        last_name: '',
        email: email,
        password: password,
        cnfPassword: confirmPassword,
        mobile: mobile,
        is_active: 1,
        module_assign: '0',
        usertype: 'Customer'
      };
        console.log(payload);
      try {
        const response =await signUpRef(payload);
        console.log(response);
        if(response.status=='201'){
          setLoginPage(true);
        }
        
      } catch (err) {
        console.log(err);
      }
      console.log(payload);
    } else {
      console.log('err');
    }
  }

  if (loginPage) {
    return <Login loginRef={setLoginPage}/>
    // return <ChangePassword />
  }

  return (
    <>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
        {/* <Image source={require("../../assets/people.png")} style={styles.logo} /> */}
        <View >
          <Image source={require('../../assets/logo.png')} style={styles.logo}/>
        </View>
        <Text style={styles.title}>Create an Account</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholderTextColor={"#888"} placeholder="Name" onChangeText={setName} style={styles.inputp} />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <TextInput placeholderTextColor={"#888"} placeholder="Email" onChangeText={setEmail} style={styles.inputp} keyboardType="email-address" />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <TextInput placeholderTextColor={"#888"} placeholder="Mobile" onChangeText={setMobile} style={styles.inputp} keyboardType="email-address" />
          {errors.Mobile && <Text style={styles.errorText}>{errors.Mobile}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Password'
            placeholderTextColor="#888"
            style={styles.inputp}
            secureTextEntry={isPasswordVisible}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
            <Icon
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={22}
              color="#888"
            />
          </TouchableOpacity>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Confirm Password'
            placeholderTextColor="#888"
            style={styles.inputp}
            secureTextEntry={isConfirmVisible}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setConfirmVisible(!isConfirmVisible)}>
            <Icon
              name={isConfirmVisible ? 'eye-off' : 'eye'}
              size={22}
              color="#888"
            />
          </TouchableOpacity>
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
          />
          <Text onPress={() => setChecked(!checked)}>I agree to the terms and conditions</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText} >Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLoginPage(true)}>
          <Text style={styles.link}>Already have an account? Sign In</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
 </TouchableWithoutFeedback>
</KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9f7f4",
    //  padding: 20,
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
    resizeMode:'contain'
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
  },
});


export default Signup;