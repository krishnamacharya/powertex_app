import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './src/Screens/Home/Home';
import Login from './src/Screens/Login/Login';
import { Dimensions, StatusBar } from 'react-native';
// import CustomHeader from './src/Components/customHeader/customHeader';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';


const { width } = Dimensions.get('window');
const Stack = createNativeStackNavigator();

const App = () => {

   useEffect(() => {
      // Simulate a delay or wait for resources, then hide splash
      setTimeout(() => {
        SplashScreen.hide(); // 👈 Hide splash screen after load
      }, 5000);
    }, []);

    
  return (
    <SafeAreaProvider >
      <StatusBar barStyle="dark-content" />
      <NavigationContainer >
        <Stack.Navigator 
        initialRouteName="Home"
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }} // optional
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: true }} // optional
          />
         
          {/* Add other screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
