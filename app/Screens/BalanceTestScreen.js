import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import * as Speech from 'expo-speech'
import { DeviceMotion } from 'expo-sensors';
import { CountdownCircleTimer, useCountdown } from 'react-native-countdown-circle-timer';
import Svg, { Path, LinearGradient, Stop, Defs } from 'react-native-svg';
//import Button from '../components/Button'
const accX = [];
const accY = [];
const accZ = [];
const milliseconds = [];
export default function BalanceTestScreen({navigation,route}) {
  const [data, setData] = useState({});

  //const [graphComp, setGraphComp] = useState(<View></View>)
  //const [subscription, setSubscription] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dt = 0.01 // seconds
  const totalTime = 10 // seconds
  const numOfIterations = Math.floor(totalTime / dt)
  var i = 0
  const [isRemainingTimeSpeaking, setIsRemainingTimeSpeaking] = useState(false)

  const [time, setTime] = useState(3)
  const timerRef = useRef(time)
  DeviceMotion.setUpdateInterval(dt * 1000)

  const [testEnded, setTestEnded] = useState(false)
  
  const _subscribe = () => {
    DeviceMotion.addListener((devicemotionData) => {
      setData(devicemotionData.acceleration);
      accX.push(devicemotionData.acceleration.x)
      accY.push(devicemotionData.acceleration.y)
      accZ.push(devicemotionData.acceleration.z)
      milliseconds.push(Date.now())
    });
    DeviceMotion.setUpdateInterval(dt * 1000)
  };
  
  function startTest() {
    setButtonDisabled(true)
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
              setIsPlaying(true);
              _subscribe();

            }
            setTime(timerRef.current);
          }
          return () => clearInterval(timerId);
        }, 1000)
        
        
      }
    })
  }

  function onTestEnded() {
    _unsubscribe();
    
    Speech.speak("The test has ended", {language: 'en'})
    console.log("Printed accX")
    console.log(`Length of accX is: ${accX.length}`)
    //setGraphComp(<SpaghettiGraph x={accX} y={accZ}/>)
    setTestEnded(true)

    navigation.replace('TestResult', {accX: accX, accZ: accZ, duration: totalTime, milliseconds: milliseconds})
  }

  const _unsubscribe = () => {
    DeviceMotion.removeAllListeners();
  };

  useEffect(() => {
    return () => {
      DeviceMotion.removeAllListeners();
    }
  }, []
    
  )


  const [isPlaying, setIsPlaying] = React.useState(false)
  const duration = totalTime
  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    size,
    strokeWidth,
  } = useCountdown({ isPlaying: isPlaying, duration, colors: 'url(#your-unique-id)' })
  
  return (
    <View style={styles.container}>
      <View style={{ width: size, height: size, position: 'relative' }}>
        <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={totalTime}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        onComplete={onTestEnded}
    >
      {({ remainingTime, color }) => {
        if (remainingTime == 5 && !isRemainingTimeSpeaking) {
          console.log(isRemainingTimeSpeaking)
          setIsRemainingTimeSpeaking(true)
          console.log(isRemainingTimeSpeaking)
          Speech.speak("5 seconds remaining.", {language: 'en'})
        }
        return (
        <Text style={{ color, fontSize: 40 }}>
          {remainingTime}
        </Text>
        )
      }
    }
    </CountdownCircleTimer>
      </View>
      <Button title='Start Test' style={styles.button} onPress={startTest} disabled={buttonDisabled}></Button>
    </View>
  );
}

/*
<View style={{flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', alignItems: 'center'}}>
        <DonutChart />
        
      </View>
*/

/*<CountdownCircleTimer
        isPlaying={isPlaying}
        duration={totalTime}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        onComplete={() => {}}
    >
      {({ remainingTime, color }) => (
        <Text style={{ color, fontSize: 40, fontWeight: 700 }}>
          {remainingTime}
        </Text>
      )}
    </CountdownCircleTimer>*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  },
  button: {
    borderRadius: 20

  }
});
