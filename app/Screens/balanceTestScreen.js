import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import * as Speech from 'expo-speech'

import { DeviceMotion } from 'expo-sensors';
import SpaghettiGraph from '../Models/SpaghettiGraph';

export default function BalanceTestScreen({navigation,route}) {
  const [data, setData] = useState({});
  const accX = [];
  const accY = [];
  const accZ = [];
  //const [graphComp, setGraphComp] = useState(<View></View>)
  //const [subscription, setSubscription] = useState(null);
  const dt = 0.01 // seconds
  const totalTime = 30 // seconds
  const numOfIterations = Math.floor(totalTime / dt)
  var i = 0
  var isRemainingTimeSpeaking = false

  const [time, setTime] = useState(3)
  const timerRef = useRef(time)
  DeviceMotion.setUpdateInterval(dt * 1000)

  const [testEnded, setTestEnded] = useState(false)

  const _subscribe = () => {
    DeviceMotion.addListener((devicemotionData) => {
      setData(devicemotionData.acceleration);
      let remainingTime = totalTime - Math.floor(i * dt)
      if (remainingTime == 5 && !isRemainingTimeSpeaking) {
        isRemainingTimeSpeaking = true
        Speech.speak("5 seconds remaining.", {language: 'en'})
      }
      setTime(remainingTime.toString())
      if (i == numOfIterations) {
        _unsubscribe();
        Speech.speak("The test has ended", {language: 'en'})
        console.log(`Length of accX is: ${accX.length}`)
        //setGraphComp(<SpaghettiGraph x={accX} y={accZ}/>)
        setTestEnded(true)
        navigation.replace('TestResult', {accX: accX, accZ: accZ, duration: totalTime, dt: dt})
        return
      }
      i++
      accX.push(devicemotionData.acceleration.x)
      accY.push(devicemotionData.acceleration.y)
      accZ.push(devicemotionData.acceleration.z)
    });
    DeviceMotion.setUpdateInterval(dt * 1000)
  };
  
  function startTest() {
    setTime(3)
    timerRef.current = 3
    
    Speech.speak("Starting the test. Please stay still.", 
    { language: 'en', 
      onDone: () => {
        Speech.speak(timerRef.current.toString(), {language: 'en'})
        const timerId = setInterval(() => {
          timerRef.current -= 1;
          if (timerRef.current < 0) {
            clearInterval(timerId);
          }
          else {
            if (timerRef.current != 0) {
              Speech.speak(timerRef.current.toString(), {language: 'en'})
            }
            else {
              Speech.speak("The test has started.", {language: 'en'})
              i = 0;
              _subscribe();

            }
            setTime(timerRef.current);
          }
          return () => clearInterval(timerId);
        }, 1000)
        
        
      }
    })
  }

  const _unsubscribe = () => {
    DeviceMotion.removeAllListeners();
  };
  /*
  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);
  */



  return (
    <View style={styles.container}>
      <Text>Time: {time}</Text>
      <Button title='Start Test' onPress={startTest}></Button>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
