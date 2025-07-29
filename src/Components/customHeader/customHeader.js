import React, { useState, useRef, useEffect } from "react";
import { View, Text, Animated, StyleSheet, Image, ScrollView, InputAccessoryView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GestureHandlerRootView from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";

const { height, width } = Dimensions.get("window");
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const COLLAPSED_WIDTH = SCREEN_WIDTH * 0.7;
const EXPANDED_WIDTH = SCREEN_WIDTH - 20;

const CustomHeader = () => {
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();
  const [recentSearches, setRecentSearches] = useState([]);
  const [number, onChangeNumber] = useState('');
  const inputRef = useRef(null);

  console.log(height, 'height', width, 'width')

  // const handleSearchSubmit = () => {
  //   setIsFocused(false);
  //   console.log('hiiiii')
  //   if (number.trim()) {
  //     // navigation.navigate("Menu", { query: number.trim() });
  //      navigation.navigate("SearchPage", { query: number.trim() });
  //   }
  //   onChangeNumber('');
  // };

  const handleUnfocus = () => {
    setIsFocused(false);
    inputRef.current?.blur();
  }

  const handleHome = () => {
    navigation.navigate("MainTabs")
  }
  const handleSearchSubmit = () => {
    setIsFocused(false);
    const trimmed = number.trim();
    if (trimmed) {
      setRecentSearches(prev => [trimmed, ...prev.filter(item => item !== trimmed)].slice(0, 5));
      navigation.navigate("SearchPage", { query: trimmed });
    }
    onChangeNumber('');
  };

  const animatedWidth = useRef(new Animated.Value(COLLAPSED_WIDTH)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: isFocused ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  return (
    <>
      {isFocused && (
        <TouchableWithoutFeedback onPress={handleUnfocus}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleHome}>
          <Image source={require('../../assets/powertex_logo.png')} style={isFocused ? { display: 'none' } : styles.power_logo} resizeMode="contain" />
        </TouchableOpacity>
        <View style={{ position: 'relative', zIndex: 2 }}>
          <Animated.View style={{ width: animatedWidth }}>
            <TextInput
              style={[styles.input, { borderColor: isFocused ? 'white' : '#5a9c8c', color: isFocused ? 'white' : '#5a9c8c' }]}
              value={number}
              ref={inputRef}
              onChangeText={onChangeNumber}
              placeholder="Search here"
              placeholderTextColor="gray"
              onFocus={() => setIsFocused(true)}
              onPress={() => setIsFocused(true)}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
            />
          </Animated.View>

          {isFocused && recentSearches.length > 0 && (
            <View style={{ marginTop: 10, backgroundColor: '#fff', padding: 10, borderRadius: 10 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Recent Searches</Text>
              {recentSearches.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => {
                  onChangeNumber(item);
                  navigation.navigate("SearchPage", { query: item });
                  setIsFocused(false);
                }}>
                  <Text style={{ paddingVertical: 5 }}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity onPress={handleSearchSubmit} style={styles.searchIcon}>
            <Image source={isFocused ? require("../../assets/search-white.png") : require("../../assets/search.png")} style={{ width: 25, height: 24 }} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <View style={!isFocused ? styles.logoc : styles.h_logoc}>
            <Icon name="notifications-outline" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default CustomHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#e9f7f4",
    padding: 10,
    zindex: 20,
    borderBottomWidth:0.5,
    borderColor:'#ccc'
  },
  logoSearch: {
    position: "absolute",
    marginLeft: width * .7,
    width: 30,
    height: 30,
    // backgroundColor: "#fff",
  },
  searchIcon: {
    position: 'absolute',
    right: 5,
    height: 40,
    width: 30,
    top: '25%',
    zIndex: 2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 35,
    borderRadius: 50,
    marginRight: -15
    // backgroundColor: "#5a9c8c",
  },
  h_logoc: {
    // position: "absolute",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 35,
    borderRadius: 0,
    // backgroundColor: "none",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  power_logo: {
    width: 70,
    height: 50,
    // marginLeft:-10
  },
  input: {

    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    color: '#5a9c8c',
    // backgroundColor:'#fff',
    // width: width * .8,
    height: width * .12,
    borderWidth: 1,
    // width:265,
    // marginLeft:-20,
    borderRadius: 15,
    paddingLeft: 20,

  },
  cartcount: {
    flex: 1,
    position: 'absolute',
    marginLeft: 16,
    marginTop: 8,
    backgroundColor: '#5a9c8c',
    width: width * 0.048,
    height: width * 0.04,
    borderRadius: 10,
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    justifyContent: 'center'
    // alignItems:'center'
  }
});
