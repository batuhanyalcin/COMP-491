import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import colors from '../config/colors'
import { LinearGradient } from 'expo-linear-gradient';

export default function TestSelectButton({title,onPress,imgSource}) {
  return (
    
   <TouchableOpacity style={[styles.button]}
   onPress={onPress}
   >
     <LinearGradient
        colors={['#36c9bb', '#2fc7dd']}
        useAngle={true}
        angle={60}
        angleCenter={{ x: 0, y: 1 }}
        start={[0, 0]}
        end={[1, 0]}
        style={[styles.button,{ borderRadius: 50 }]}
      >
        <Image 
        style={styles.figure}
        source={imgSource}
        />
        <Text style={styles.text}>{title}</Text>
        </LinearGradient>
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button : {
        justifyContent:'center',
        padding: 10,
        height: 160,
        width:"100%",
        marginVertical:10,
        flexDirection: 'row',
        alignItems: 'center',
    
    },
    figure:{
       marginLeft: -20,
        
    },
    text : {
        color :colors.white,
        fontSize:20,
        fontWeight:900
    }
})