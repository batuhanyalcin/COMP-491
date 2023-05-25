import { SafeAreaView, StyleSheet, Text, View, ScrollView, Button } from 'react-native'
import React from 'react'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component'
import SpaghettiGraph from '../Models/SpaghettiGraph'
import * as pc from '../Models/ParameterCalculation'
import ListItem from '../components/ListItem'
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import axios from 'axios';

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
  var csvString = "accX, accZ\n"
  for (let i = 0; i < accX.length; i++) {
    csvString = csvString.concat(`${accX[i]}, ${accZ[i]}\n`)
  }

  var listArr = []
  for (let i = 0; i < tableContent.tableData.length; i++) {
    listArr.push(
      <ListItem title={tableContent.tableTitle[i]} items={[tableContent.tableData[i]]} />
    )
  }
  
  const [fileUri, setFileUri] = React.useState(null);

  // create the file when the component mounts
  React.useEffect(() => {
    async function createFile() {
      const uri = `${FileSystem.documentDirectory}balanceResults.csv`;
      await FileSystem.writeAsStringAsync(uri, csvString, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      setFileUri(uri);
    }
    createFile();
  }, []);

  // handle the button press
  async function handleSharePress() {
    try {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: 'Share File',
        UTI: 'public.comma-separated-values-text',
      });
    } catch (error) {
      console.error('Error sharing file: ', error);
    }
  }

  async function handleDatabasePress() {
    const date = new Date();
    console.log(date);
    query = "INSERT INTO TESTRESULT (PathLength, PathLengthCor, PathLengthSag, NormalizedPathLength, Jerk, JerkCor, JerkSag, MeanVel, MeanVelCor, MeanVelSag, AccX, AccZ, PatientID) VALUES ('"+ tableContent.tableData[0] +"','"+ tableContent.tableData[1] +"','"+ tableContent.tableData[2] +"','"+ tableContent.tableData[3] +"','"+ tableContent.tableData[4] +"','"+ tableContent.tableData[5] +"','"+ tableContent.tableData[6] +"','"+ tableContent.tableData[7] +"','"+ tableContent.tableData[8] +"','"+ tableContent.tableData[9] +"','"+JSON.stringify(accX)+"', '"+JSON.stringify(accZ)+"', '1')";
    console.log(query);
    axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    axios
      .post("https://0da3-88-255-99-19.eu.ngrok.io", {query: query, action:"test_result_entry"})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  




  return (
    <SafeAreaView style={styles.container}>
      <ScrollView vertical={true} style={{backgroundColor: 'rgb(250, 250, 250)', width: '100%', flex: 1, flexDirection:'column', borderRadius: 15}}>
        <Text style={{height: 50, fontSize: 20, fontWeight: 'bold', alignSelf: 'baseline', paddingLeft: 30}}>Test Result</Text>
        <View style={{flex: 1, height:500, margin: 10, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0)'}}>
          <SpaghettiGraph x={accX} y={accZ} style={{margin: 10}}/>
        </View>
        <Button title='Save to files' onPress={handleSharePress} disabled={!fileUri}></Button>
        <Button title='Add to Database' onPress={handleDatabasePress} disabled={!fileUri}></Button>
        <Text style={{height: 50, fontSize: 20, fontWeight: 'bold', alignSelf: 'baseline', paddingLeft: 30}}>Metrics</Text>
        <View style={{flex: 1, flexDirection: 'column'}}>
          {listArr}
        </View>
      </ScrollView>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 100, backgroundColor: '#fff', alignItems: 'center' },
  head: { height: 40, backgroundColor: '#e8e8e8' },
  wrapper: { flexDirection: 'row'},
  title: { flex: 1, backgroundColor: 'white' },
  row: { height: 40 },
  titleText: { textAlign: 'left', paddingLeft: 15, fontWeight: 700 },
  text: { textAlign: 'left', paddingLeft: 15 },
  scrollView: {
    backgroundColor: 'rgb(245, 245, 245)',
    marginTop: -1,
    borderRadius: 15,

    
  },
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