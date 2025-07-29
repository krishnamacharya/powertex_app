import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { getAddress, postAddress } from "../../Services";
import { CardContext } from "../../Context/CardContext";

const { width, height } = Dimensions.get("window");

const EditProfile = () => {
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobile, setMobile] = useState("");
  const [state, setState] = useState("");
  const [type,setType]= useState('');
  const [city,setCity]= useState('');
  const [district,setDistrict]= useState('');
  const [contactName,setContactName]= useState('');
  const [email,setEmail] = useState('');
  const [businessName,setBusinessName] = useState('');
  const {userData}=useContext(CardContext);




//   formData = {
//   address_category: '',
//   contact_person: '',
//   default1: '',
//   email: '',
//   mobile: '',
//   address1: '',
//   address2: '',
//   address3: '',
//   address4: '',
//   city: '',
//   state: '',
//   district: '',
//   pin: '',
//   country: '',
//   business_name: '',
//   user_id:'',
// };



  useEffect(()=>{
   const fetchAddress = async() =>{
    try{
        const response = await getAddress(userData.userid);
        console.log(response);
    }catch(err){
        console.log(err);
    }
    }
    fetchAddress();
  },[])

  

  const handleSave = async() => {


   const formData = {
  address_category: type,
  contact_person: contactName,
  default1: '',
  email: email,
  mobile: mobile,
  address1: addressLine1,
  address2: addressLine2,
  address3: '',
  address4: '',
  city: '',
  state: state,
  district: '',
  pin: pincode,
  country: 'India',
  business_name: businessName,
  user_id:userData.userid,
};
console.log(formData)
    try{
      const response = await postAddress(formData);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Address</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Edit Address:</Text>

        <TextInput
          style={styles.input}
          placeholder="Address Line 1"
          value={addressLine1}
          onChangeText={setAddressLine1}
        />

        <TextInput
          style={styles.input}
          placeholder="Address Line 2"
          value={addressLine2}
          onChangeText={setAddressLine2}
        />
        <View style={{flexGrow:1,flexDirection:'row',justifyContent:'space-between'}}>
         <TextInput
          style={styles.inputd}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
         <TextInput
            style={styles.inputd}
            placeholder="District"
            value={district}
            onChangeText={setDistrict}
          />
        </View>
        <View style={{flexGrow:1,flexDirection:'row',justifyContent:'space-between'}}>
         
         <TextInput
          style={styles.inputd}
          placeholder="Pincode"
          value={pincode}
          onChangeText={setPincode}
        />
        <TextInput
          style={styles.inputd}
          placeholder="State"
          value={state}
          onChangeText={setState}
        />
        </View>
         <TextInput
          style={styles.input}
          placeholder="Mobile"
          value={mobile}
          onChangeText={setMobile}
        />
         <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.buttonText} onPress={handleSave}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e9f7f4",
    flexGrow: 1,
    padding: 20,
    justifyContent:'center',
  },

  titleContainer: {
    marginVertical:20,
    alignSelf:'center'
    // marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  inputd: {
    height: 45,
    width:width*.45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    // marginHorizontal:10,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#009b77",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditProfile;
