import { Dimensions, SafeAreaView, StyleSheet, Text, Image, View, ScrollView, Button, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../config/colors';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import {Circle, Svg} from 'react-native-svg'
import Animated, {useAnimatedProps, useSharedValue, withTiming} from 'react-native-reanimated'
import { useEffect } from 'react/cjs/react.production.min';
import axios from 'axios';
import {setDbLink, getDbLink} from '../config/dblink'
import {getPatientID} from '../config/user'
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
      const query = "INSERT into SurveyResult (FunctionalScore, PhysicalScore, EmotionalScore, OverallScore, PatientID) VALUES ('"+functionalScore+"', '"+physicalScore+"', '"+emotionalScore+"', '"+overallScore+"', '"+getPatientID()+"');"
      
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

      
  
      const [fileUri, setFileUri] = React.useState(null);
  return (
    
    <Screen>
   
     
 
  <View style={{height: 90, flexDirection: 'row', paddingLeft: 15, paddingRight: 15, marginBottom: 15}}>
          <TouchableOpacity style={styles.buttonStyle} onPress={handleDatabasePress}> 
              <Text style={styles.buttonTextStyle}>Save Results</Text>
              <Image source={require('../assets/diskette.png')} style={{width: 30, height: 30, marginLeft: 'auto', marginRight: 'auto', marginBottom: 'auto'}}/>
          </TouchableOpacity>
        </View>

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
    
},

buttonStyle: {
  flex: 1,
  marginLeft: 10,
  marginRight: 10,
  borderRadius: 13,
  shadowColor: '#171717',
  shadowOffset: {width: 0, height: 4},
  shadowOpacity: 0.2,
  shadowRadius: 5,
  elevation: 8,
  backgroundColor: '#0e3363'
},
buttonTextStyle: {
  fontSize: 18,
  color: 'white',
  fontWeight: "bold",
  alignSelf: "center",
  marginTop: 'auto',
  marginBottom: 10,

}
  });


