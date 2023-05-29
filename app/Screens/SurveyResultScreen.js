import { Dimensions, SafeAreaView, StyleSheet, Text, View, ScrollView, Button, FlatList } from 'react-native'
import React from 'react'
import colors from '../config/colors';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import {Circle, Svg} from 'react-native-svg'
import Animated, {useAnimatedProps, useSharedValue, withTiming} from 'react-native-reanimated'
import { useEffect } from 'react/cjs/react.production.min';
export default function SurveyResultScreen({navigation, route}) {
    const result = route.params.result.toString();
    const {width, height} = Dimensions.get('window');
    const CIRCLE_LENGTH = 1000;
    const RADIUS = CIRCLE_LENGTH / (2*Math.PI);
    const resultS = result + "%";
    //const answers = this.props.navigation.getParam('surveyAnswers', defaultAnswers);
    //console.log(result);
  /*
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const circleProgress = useSharedValue(1);
React.useEffect(()=>{
    circleProgress.value = withTiming(0, {duration:2000});
}, []);
const animatedProps = useAnimatedProps(()=> ({
    strokeDashoffset: CIRCLE_LENGTH * circleProgress.value
}))*/
  return (
    
    <Screen>
   
     
  <Svg>
    <Circle 
      cx={width/2}
      cy={height/2}
      r={RADIUS}
      fill="transparent"
      stroke="#404258"
      strokeWidth={30}
    />
   <View style= {styles.container}><Text style= {styles.text}>{resultS} </Text></View>
    <Circle 
      cx={width/2}
      cy={height/2}
      r={RADIUS}
      stroke="rgb(145, 154, 255)"
      strokeWidth={15}
      strokeDasharray={CIRCLE_LENGTH}
      strokeDashoffset={CIRCLE_LENGTH * (100 - result) * 0.01}
    />
    
  </Svg>
  


    </Screen>
    
  )


}

const styles = StyleSheet.create({
container: {
        
       //verticalAlign: 'middle',
        alignItems: 'center',
        justifyContent:'center',
        marginTop: 350,
       
  
       
    },
text:{
   
    alignSelf: 'center',
    textAlignVertical: 'center',
    fontSize: 100,
    //marginTop: 350,
    //marginLeft: 100
    
}
  });


