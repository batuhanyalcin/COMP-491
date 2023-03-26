import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import ForgotPassword from '../Screens/ForgotPassword';


const Stack = createStackNavigator();


export default function AuthNavigator() {
  return (
   <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
   </Stack.Navigator>
  )
}

