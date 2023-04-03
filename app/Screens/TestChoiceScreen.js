import {Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Screen from '../components/Screen';
import colors from '../config/colors';
import AppText from '../components/AppText';


export default function TestChoiceScreen({navigation,route}) {

    
  return (
    <Screen style={styles.container}>
        <Image 
        style={styles.logo}
        source={require("../assets/healthcare.png")}
        />
        <AppText>Welcome _user_ </AppText>
        <TouchableOpacity style={styles.redirect} onPress={() => navigation.navigate('balanceTestScreen')} >
            <AppText>Balance Test</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.redirect} onPress={() => navigation.navigate('TestChoiceScreen')} >
            <AppText>Questionnaire</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.redirect} onPress={() => navigation.navigate('TestChoiceScreen')} >
            <AppText>Test 2</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.redirect} onPress={() => navigation.navigate('TestChoiceScreen')} >
            <AppText>Test 3</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.redirect} onPress={() => navigation.navigate('TestChoiceScreen')} >
            <AppText>Test 4</AppText>
        </TouchableOpacity>


    </Screen>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.grey,
      alignItems: 'center',
      padding:10,
      justifyContent: 'center',
      borderWidth:4,
      borderColor:colors.grey
    },
    logo: {
      height: 150,
      width: 150,
      alignSelf:"center"
    },
  })