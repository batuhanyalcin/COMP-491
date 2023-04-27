import {Image, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native'
import React from 'react'
import Screen from '../components/Screen';
import colors from '../config/colors';
import AppText from '../components/AppText';
import { LinearGradient } from 'expo-linear-gradient';
import TestSelectButton from '../components/TestSelectButton';

export default function TestChoiceScreen({navigation,route}) {

    
  return (
    <Screen style={styles.container}>
        <View style = {styles.logo}>
         <LinearGradient
            colors={['#d1eeae', '#94bbe9']}
            style={[styles.centered, {borderRadius:60}]}
            useAngle={true}
            angle={60}
            start={{ x: 0, y: 0 }}
            end={{ x: 1.5, y: 1 }}
          >
          <AppText style= {styles.text}>Welcome </AppText>
          </LinearGradient>
        </View>

        <View style = {styles.header}>
          <AppText style= {styles.headerText}>Take a test </AppText>
        </View>
        <ScrollView vertical={true} style={{backgroundColor: 'rgb(250, 250, 250)', width: '100%', flex: 1, flexDirection:'column', borderRadius: 15}}>
        <TestSelectButton title="Balance Test"  style={styles.redirect} onPress={() => navigation.navigate('BalanceTestScreen')} imgSource = {require("../assets/balance_button_figure.png")}  />
        <TestSelectButton title="Questionnaire"  style={styles.redirect} onPress={() => navigation.navigate('TestChoiceScreen')} imgSource = {require("../assets/questionnaire_fig.png")}/>
        <TestSelectButton title="Test 3"  style={styles.redirect} onPress={() => navigation.navigate('TestChoiceScreen')}  />
        <TestSelectButton title="Test 4"  style={styles.redirect} onPress={() => navigation.navigate('TestChoiceScreen')}  />

        </ScrollView>

    </Screen>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.grey,
      alignItems: 'center',
      padding:10,
      borderWidth:4,
      borderColor:colors.grey
    },
    logo: {
      height: "30%",
      width: "90%",
      marginTop: 30,
    },
    centered: {
      flex: 1 ,
      justifyContent: 'center'
    },
    text:{
      marginLeft:20,
      fontWeight: 800,
      fontSize: 36,
      color:'white'
    },
    header:{
      height: "10%"
    },
    headerText:{
      //TODO fix
      marginLeft:-150,
      fontWeight: 700,
      color:'#4A4747',
      fontSize: 28,
      marginVertical: 20,
      justifyContent: 'center'
    },
 
  })