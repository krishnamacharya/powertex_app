// App.js
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Signup from '../../Screens/Signup/Signup';
import Home from '../../Screens/Home/Home';
import Category from '../../Screens/categoryPage/categoryPage';

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Profile Screen</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Settings Screen</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        lazy={true}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          labelStyle: { fontSize: 14 },
          style: { backgroundColor: '#f8f8f8' },
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home-outline';
            else if (route.name === 'Profile') iconName = 'person-outline';
            else if (route.name === 'Settings') iconName = 'settings-outline';
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Profile" component={Signup} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Category} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
