import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import OldTests from '../Screens/OldTests';
import TestChoiceScreen from '../Screens/TestChoiceScreen';
import TestResult from '../Screens/TestResult';
import TestScreen from '../Screens/TestScreen';
import BalanceTestScreen from '../Screens/BalanceTestScreen';
import AboutUsScreen from '../Screens/AboutUsScreen';




const Stack = createStackNavigator();


export default function MainNavigator() {
  return (
   <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="OldTests" component={OldTests} />
        <Stack.Screen name="TestChoiceScreen" component={TestChoiceScreen} />
        <Stack.Screen name="BalanceTestScreen" component={BalanceTestScreen} />
        <Stack.Screen name="TestResult" component={TestResult} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
   </Stack.Navigator>
  )
}