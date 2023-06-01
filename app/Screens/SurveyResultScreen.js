import { Dimensions, SafeAreaView, StyleSheet, Text, View, ScrollView, Button, FlatList } from 'react-native'
import React from 'react'
import colors from '../config/colors';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import {Circle, Svg} from 'react-native-svg'
import Animated, {useAnimatedProps, useSharedValue, withTiming} from 'react-native-reanimated'
import { useEffect } from 'react/cjs/react.production.min';
export default function SurveyResultScreen({navigation, route}) {
    const overallScore = (100 - route.params.result.toString()) * 0.01;
    const emotionalScore = 1 - (route.params.emotion.toString()/36);
    const functionalScore = 1 - (route.params.func.toString()/ 36);
    const physicalScore = 1 - (route.params.phys.toString() / 28);

    const {width, height} = Dimensions.get('window');
    const CIRCLE_LENGTH = 1000;
    const RADIUS = CIRCLE_LENGTH / (2*Math.PI);
    const resultS = overallScore + "%";
    async function handleDatabasePress() {
      const query = "INSERT into SurveyResult (FunctionalScore, PhysicalScore, EmotionalScore, OverallScore, PatientID) VALUES ('10', '10', '10', '10', '1');"
        
      axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
        axios
          .post(getDbLink(), {query: query, action:"survey_result_entry"})
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
      strokeDashoffset={CIRCLE_LENGTH * overallScore}
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


