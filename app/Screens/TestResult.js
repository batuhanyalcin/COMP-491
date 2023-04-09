import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component'
import SpaghettiGraph from '../Models/SpaghettiGraph'
import * as pc from '../Models/ParameterCalculation'

export default function TestResult({navigation, route}) {
  const accX = route.params.accX
  const accZ = route.params.accZ
  const duration = route.params.duration
  const dt = route.params.dt

  
  const tableContent = {
    tableHead: ['Unilateral', 'Result'],
    tableTitle: ['Path Length (m/s^2)', 'Path Length (Coronal) (m/s^2)', 'Path Length (Sagittal) (m/s^2)', 'Normalized Path Length (s^3/m)', 'Jerk (m^2/s^5)' ,'Jerk (Coronal) (m^2/s^5)',
  'Jerk (Sagittal) (m^2/s^5)', 'Mean Velocity (m/s)', 'Mean Velocity (Coronal) (m/s)', 'Mean Velocity (Sagittal) (m/s)'],
    tableData: [
      [pc.calculatePathLength(accX, accZ, dt).pl.toFixed(2)], 
      [pc.calculatePathLength(accX, accZ, dt).plx.toFixed(2)], 
      [pc.calculatePathLength(accX, accZ, dt).plz.toFixed(2)], 
      [(duration / pc.calculatePathLength(accX, accZ, dt).pl).toFixed(2)],
      [pc.calculateJerk(accX, accZ, dt).jerk.toFixed(2)],
      [pc.calculateJerk(accX, accZ, dt).jerkX.toFixed(2)],
      [pc.calculateJerk(accX, accZ, dt).jerkZ.toFixed(2)],
      [pc.calculateMeanVelocity(accX, accZ, dt).meanVel.toFixed(4)],
      [pc.calculateMeanVelocity(accX, accZ, dt).meanVelX.toFixed(4)],
      [pc.calculateMeanVelocity(accX, accZ, dt).meanVelZ.toFixed(4)]
    ]
  }




  return (
    <View style={styles.container}>
      <Text style={{height: 50, fontSize: 20, fontWeight: 'bold', alignSelf: 'baseline', paddingLeft: 30}}>Test Result</Text>
      <SpaghettiGraph x={accX} y={accZ}/>
      <Text style={{height: 50, fontSize: 20, fontWeight: 'bold', alignSelf: 'baseline', paddingLeft: 30}}>Metrics</Text>
      <Table borderStyle={{borderWidth: 1}} style={{width: "95%"}}>
        <Row 
          data={tableContent.tableHead}
          style={styles.head}
          textStyle={styles.titleText}
          flexArr={[1,1]}
        />
        <TableWrapper style={styles.wrapper}>
          <Col 
            data={tableContent.tableTitle}
            style={styles.title}
            textStyle={styles.titleText}
          />
          <Rows
            data={tableContent.tableData}
            style={styles.row}
            textStyle={styles.text}
            flexArr={[1]}
          />
        </TableWrapper>
      </Table>
      
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 100, backgroundColor: '#fff', alignItems: 'center' },
  head: { height: 40, backgroundColor: '#e8e8e8' },
  wrapper: { flexDirection: 'row'},
  title: { flex: 1, backgroundColor: 'white' },
  row: { height: 33 },
  titleText: { textAlign: 'left', paddingLeft: 15, fontWeight: 700 },
  text: { textAlign: 'left', paddingLeft: 15 },
});
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: { height: 40, backgroundColor: 'orange' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#2ecc71' },
  row: { height: 28 },
  text: { textAlign: 'center' },

});
*/