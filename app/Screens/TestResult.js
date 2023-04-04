import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SpaghettiGraph from '../Models/SpaghettiGraph'

export default function TestResult({navigation, route}) {
  const accX = route.params.accX
  const accZ = route.params.accZ
  const duration = route.params.duration
  const dt = route.params.dt

  function calculatePathLength(x, y) {
    var pathLength = 0;
    for (var i = 1; i < x.length; i++) {
      pathLength += Math.sqrt(
        (x[i] - x[i-1]) ** 2 +
        (y[i] - y[i-1]) ** 2
      )
    }
    return pathLength
  }

  function calculateJerk(x, y) {
    // Calculate derivative of x and y
    jerkX = Array(x.length)
    // Forward FD for left end node
    jerkX[0] = (-x[2] + 4*x[1] - 3*x[0]) / (2 * dt)
    
    // Central FD for internal nodes
    var i
    for (i = 1; i < x.length - 1; i++) {
      jerkX[i] = (x[i+1] - x[i-1]) / (2 * dt)
    }

    // Backward FD for right end node
    jerkX[i] = (-x[i-2] + 4*x[i-1] - 3*x[i]) / (2 * dt)
    
    // Take square of jerk
    jerkX2 = jerkX.map(a => a**2)

    // Integrate with Simpson's 1/3 Rule
    var jerkI = 0
    jerkI = jerkX2[0]
    //console.log(jerkX2)
    //console.log(jerkX[jerkX.length-2])
    for (i = 1; i < x.length - 1; i++) {
      jerkI += (i % 2 == 1 ? 4 * jerkX2[0] : 2 * jerkX2[0])
    }
    
    jerkI += jerkX2[i]
    jerkI *= dt / 3
    return jerkI
  }

  return (
    <View style={styles.container}>
      <Text>TestResult</Text>
      <SpaghettiGraph x={accX} y={accZ}/>
      <Text>Metrics:</Text>
      <Text>Path Length: {calculatePathLength(accX, accZ)}</Text>
      <Text>Normalized Path Length: {duration / calculatePathLength(accX, accZ)}</Text>
      <Text>Jerk: {calculateJerk(accX, accZ)}</Text>
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
