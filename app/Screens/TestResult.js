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
  

  function calculateDerivative(y, dx) {
    var dydx = Array(y.length)

    // Forward FD for left end node
    dydx[0] = (-y[2] + 4*y[1] - 3*y[0]) / (2 * dx)

    // Central FD for internal nodes
    var i
    for (i = 1; i < y.length - 1; i++) {
      dydx[i] = (y[i+1] - y[i-1]) / (2 * dx)
    }

    // Backward FD for right end node
    dydx[dydx.length - 1] = -(-y[i-2] + 4*y[i-1] - 3*y[i]) / (2 * dx)
    
    return dydx
  }


  function calculateIntegral(y, dx) {
    // Integrate using Simpson's 1/3 Rule
    var yI = y[0]

    for (i = 1; i < y.length - 1; i++) {
      yI += (i % 2 == 1 ? 4 * y[i] : 2 * y[i])
    }

    yI += y[y.length - 1]

    yI *= dx / 3
    return yI

  }


  function calculateJerk(x, z, dt) {
    // Calculate derivative of x and y
    var jerkX = calculateDerivative(x, dt)
    var jerkZ =  calculateDerivative(z, dt)

    // Take square of jerk
    var jerkX2 = jerkX.map(a => a**2)
    var jerkZ2 = jerkZ.map(a => a**2)
    
    // Integrate jerk
    var jerkXI = calculateIntegral(jerkX2, dt)
    var jerkZI = calculateIntegral(jerkZ2, dt)

    return (1 / 2) * (jerkXI + jerkZI)
 
  }


  return (
    <View style={styles.container}>
      <Text>TestResult</Text>
      <SpaghettiGraph x={accX} y={accZ}/>
      <Text>Metrics:</Text>
      <Text>Path Length: {calculatePathLength(accX, accZ)}</Text>
      <Text>Normalized Path Length: {duration / calculatePathLength(accX, accZ)}</Text>
      <Text>Jerk: {calculateJerk(accX, accZ, dt)}</Text>    
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
