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
        colors={['rgba(0, 255, 255, 0.2)', 'rgba(0, 186, 255, 0.5)']}
        useAngle={true}
        angle={60}
        angleCenter={{ x: 0, y: 1 }}
        start={[0, 0]}
        end={[1, 0]}
        style={[styles.button,{ borderRadius: 20 }]}
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
        height: 150,
        width:"100%",
        marginVertical:10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    figure:{
       marginRight: 15
    },
    text : {
        color :colors.white,
        fontSize:28,
        fontWeight:900
    }
})