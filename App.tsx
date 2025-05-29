import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions, Image, StatusBar, View } from 'react-native';
// import CustomHeader from './src/Components/customHeader/customHeader';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
import Cart from './src/Screens/Cart/Cart';
import LandingPage from './src/Screens/landingPage/landingPage';
import ProfCategory from './src/Screens/ProfCategory/ProfCategory';



const { width } = Dimensions.get('window');
const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    // Simulate a delay or wait for resources, then hide splash
    setTimeout(() => {
      SplashScreen.hide(); // 👈 Hide splash screen after load
    }, 1000);
  }, []);


   // ✅ Read data
      const getData = async (key:any) => {
          try {
              const value = await AsyncStorage.getItem(key);
              return value != null ? JSON.parse(value) : null;
          } catch (e) {
              console.error("Failed to load:", e);
          }
      };

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: StatusBar.currentHeight }}>
        <StatusBar barStyle="dark-content" translucent={false} backgroundColor="#fff" />
{/* <CustomHeader/> */}
        <NavigationContainer>
          <Stack.Navigator
              initialRouteName="Home"
            >
              <Stack.Screen
                name="Home"
                component={LandingPage }
                options={{ headerShown: false }} // optional
              />
              <Stack.Screen
                name="Cart"
                component={Cart }
                options={{ headerShown: false }} // optional
              />
              <Stack.Screen
                name="ProfCategory"
                component={ProfCategory }
                options={{ headerShown: false }} // optional
              />
              {/* <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: true }} // optional
              /> */}
              
            </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
};

export default App;
