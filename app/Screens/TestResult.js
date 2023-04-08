import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SpaghettiGraph from '../Models/SpaghettiGraph'
import * as pc from '../Models/ParameterCalculation'

export default function TestResult({navigation, route}) {
  const accX = route.params.accX
  const accZ = route.params.accZ
  const duration = route.params.duration
  const dt = route.params.dt

  


  return (
    <View style={styles.container}>
      <Text>TestResult</Text>
      <SpaghettiGraph x={accX} y={accZ}/>
      <Text>Metrics:</Text>
      <Text>Path Length: {pc.calculatePathLength(accX, accZ, dt)}</Text>
      <Text>Normalized Path Length: {duration / pc.calculatePathLength(accX, accZ, dt)}</Text>
      <Text>Jerk (m^2/s^5): {pc.calculateJerk(accX, accZ, dt).jerk}</Text>    
      <Text>Jerk (Coronal) (m^2/s^5): {pc.calculateJerk(accX, accZ, dt).jerkX}</Text>
      <Text>Jerk (Sagittal) (m^2/s^5): {pc.calculateJerk(accX, accZ, dt).jerkZ}</Text>
      <Text>Mean Velocity (m/s): {pc.calculateMeanVelocity(accX, accZ, dt).meanVel}</Text>
      <Text>Mean Velocity (Coronal) (m/s): {pc.calculateMeanVelocity(accX, accZ, dt).meanVelX}</Text>
      <Text>Mean Velocity (Sagittal) (m/s): {pc.calculateMeanVelocity(accX, accZ, dt).meanVelZ}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
