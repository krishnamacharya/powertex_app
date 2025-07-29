import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions, StatusBar, View, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import Cart from './src/Screens/Cart/Cart';
// import LandingPage from './src/Screens/landingPage/landingPage';
import ProfCategory from './src/Screens/ProfCategory/ProfCategory';
import Signup from './src/Screens/Signup/Signup';
import SearchScreen from './src/Screens/searchScreen/searchScreen';
import Home from './src/Screens/Home/Home';
import CategoryPage from './src/Screens/categoryPage/categoryPage';
import { CardDataProvider } from './src/Context/CardContext';
import CustomHeader from './src/Components/customHeader/customHeader';
import Login from './src/Screens/Login/Login';
import SafeLayout from './src/Components/safeLayout/SafeLayout';
import { productDetailRef } from './src/Services';
import ProductDetail from './src/Screens/ProductDetail/ProductDetail';
import ChangePassword from './src/Screens/changePassword/changePassword';
import ProfilePage from './src/Screens/ProfilePage/ProfilePage';
import EditProfile from './src/Screens/EditProfile/EditProfile';

const { width, height } = Dimensions.get('window');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        header: () => route.name!=='Profile' && <CustomHeader />, // ✅ Custom header shown on each tab screen
        tabBarButton: (props: BottomTabBarButtonProps) => {
          const isSelected = props.accessibilityState?.selected;
          return (
            <TouchableOpacity
              {...props}
              
              style={{
                flex: 1,
                margin: 5,
                borderRadius: 50,
                backgroundColor: isSelected ? '#e9f7f4' : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {props.children}
            </TouchableOpacity>
          );
        },
        tabBarIcon: ({ color, size, focused }) => {


          let iconName: string;
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
            case 'Menu':
              iconName = 'grid-outline';
              break;
            case 'Cart':
              iconName = 'cart-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return (
            <View
              style={{
                borderRadius: 50,
                width: width * 0.15,
                height: height * 0.035,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: focused ? '#e9f7f4' : 'transparent',
              }}
            >
              <Icon name={iconName} size={size} color={focused ? color : 'gray'} />
            </View>
          );
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',


      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Menu" component={CategoryPage} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}


const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

    // getData()
  }, []);

 const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData');
            return value != null ? JSON.parse(value) : null;
        } catch (e) {
            console.error("Failed to load:", e);
        }
    };

  return (
    <SafeAreaProvider>
      {/* <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: StatusBar.currentHeight }}> */}
        <StatusBar barStyle="dark-content" translucent={false} backgroundColor="#fff" />
<SafeLayout>
        <CardDataProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="MainTabs" >
              <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
              <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
              <Stack.Screen name="ProfCategory" component={ProfCategory} options={{ headerShown: false }} />
              <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
              <Stack.Screen name="changePassword" component={ChangePassword} options={{ headerShown: false }} />
              <Stack.Screen name="editAddress" component={EditProfile} options={{ headerShown: false }} />
              <Stack.Screen name="SearchPage" component={SearchScreen} options={{header: () => <CustomHeader />}} />
              {/* <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </CardDataProvider>
</SafeLayout>
      {/* </View> */}
    </SafeAreaProvider>
  );
};

export default App;
