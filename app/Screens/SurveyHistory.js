import { SafeAreaView, StyleSheet, Text, View, ScrollView, Button, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component'
import SpaghettiGraph from '../Models/SpaghettiGraph'
import * as pc from '../Models/ParameterCalculation'
import ListItem from '../components/ListItem'
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import axios from 'axios';
import {setDbLink, getDbLink} from '../config/dblink'
import {getOptions, getEmotionalScore, getFunctionalScore, getOverallScore, getPhysicalScore, getSurveyQueryResult, setEmotionalScore, setFunctionalScore, setOverallScore, setPhysicalScore, getSurveyOptions} from '../config/user'
import SelectDropdown from 'react-native-select-dropdown'


export default function ResultHistory({navigation, route}) {
  if(getSurveyQueryResult().length > 0){


    const [surveyResult, setSurveyResult] = useState({
      overall: getOverallScore(),
      physical: getPhysicalScore(),
      functional : getFunctionalScore(),
      emotional: getEmotionalScore()
    })

    useEffect(() => {

    }, [surveyResult]); 

    function handleOptionChange(e) {
      var surveyQueryResult = getSurveyQueryResult()

      setOverallScore(surveyQueryResult[e].OverallScore);
      setFunctionalScore(surveyQueryResult[e].FunctionalScore);
      setPhysicalScore(surveyQueryResult[e].PhysicalScore);
      setEmotionalScore(surveyQueryResult[e].EmotionalScore)
      setSurveyResult({
        ...surveyResult,
        
        overall: getOverallScore(),
        physical: getPhysicalScore(),
        functional : getFunctionalScore(),
        emotional: getEmotionalScore()
      });
    }

    return (
      <SafeAreaView style={styles.container} >
        <ScrollView overScrollMode='never' vertical={true} style={{backgroundColor: 'rgb(250, 250, 250)', width: '100%', flex: 1, flexDirection:'column', borderRadius: 15}}>
          <SelectDropdown
              data={getSurveyOptions()}
              defaultValueByIndex = {0}
              onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                  handleOptionChange(index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item
              }}
          />
        </ScrollView>
        
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container} >
        <ScrollView overScrollMode='never' vertical={true} style={{backgroundColor: 'rgb(250, 250, 250)', width: '100%', flex: 1, flexDirection:'column', borderRadius: 15}}>
          <Text style={{height: 50, fontSize: 20, fontWeight: 'bold', alignSelf: 'baseline', paddingLeft: 30}}>No Result to Show! Do a Survey</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
  listContainer: {
    height: 65,
    backgroundColor: 'white', 
    margin: 10,
    marginTop: 5,
    marginBottom: 5, 
    flex: 1, 
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  listText: {flex: 1, fontSize: 13, alignSelf: 'center', textAlign: 'right', paddingRight: 15},
  listTitle: {flex: 2, fontSize: 14, fontWeight: 'bold', alignSelf: 'center'}
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