import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../Button';
import { useFormikContext} from 'formik';
//import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

export default function SubmitButton({title}) {
    const {handleSubmit} = useFormikContext();
  return (
    
   <Button title={title} onPress={handleSubmit}>
   <LinearGradient
   colors={['#4c669f', '#3b5998', '#192f6a']}>
   
    </LinearGradient>
    </Button>
   
  
  )
}

const styles = StyleSheet.create({})