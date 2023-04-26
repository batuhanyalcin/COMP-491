import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../config/colors'
import * as Yup from "yup";
import useAuth from '../auth/useAuth'
import Constants  from 'expo-constants';
import ActivityIndicator from '../components/ActivityIndicator';
import { ErrorMessage, Form,FormField,SubmitButton,FormImagePicker } from '../components/Form';
import Screen from '../components/Screen';
import useApi from '../hooks/useApi';
import authApi from "../api/auth";


import axios from 'axios';
import Firebase, { createUserProfile } from '../config/firebase';

const validationSchema = Yup.object().shape({
  
  name:Yup.string().required().min(1).label("Name"),
  Phone_no:Yup.number().required().min(10).label("Phone no."),
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  images: Yup.array().min(1, "Please Select Atleast on Image"),
  password: Yup.string().required().min(4).label("Password")
})


export default function RegisterScreen({navigation}) {
  const auth = useAuth();
  const [error, setError] = useState();
  const [loading,setLoading] =useState(false);

  const HandleSubmit = async (email,password,name,Phone_no,images) => {
    console.warn("This is a test warning");
    console.log("hello");
    try{
      setLoading(true);
      const {user} = await Firebase.auth().createUserWithEmailAndPassword(email,password);
      console.log(user);
      await createUserProfile(user,images,{name,Phone_no});
      setLoading(false);
    } catch (error){

    };
      console.log(Constants.manifest.extra.API_URL);
   

  
}

  return (
   <>
    <ActivityIndicator visible={loading} /> 
    <Screen style={styles.container}>
        <ScrollView>
        <Image
          style={styles.logo}
          source={require("../assets/logo.png")}
        />
        <Form 
        initialValues={{
          name:"",
          Phone_no:"",
          email:"",
          images:[],
          password:""
        }}
          
          onSubmit={HandleSubmit}
        validationSchema={validationSchema}
        >
            <FormImagePicker name="images" style= {styles.image_picker} />
            
            <FormField maxLength={255} name="name" placeholder="Name" />
            <FormField maxLength={255} name="email" placeholder="Email" />
            <FormField
            keyboardType="numeric"
            maxLength={10}
            name="Phone_no"
            placeholder="Phone number"
          />
     
             <FormField 
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            />
            <SubmitButton title="Register"  onPress={HandleSubmit} />
            <ErrorMessage error={error} />
            </Form>
        </ScrollView>
      </Screen>
   </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    flex: 1,
    alignItems: 'center',
    padding:10,
    justifyContent: 'center',
    borderWidth:4,
    borderColor:colors.grey
  },
  logo: {
    marginTop: 25,
    height: 150,
    width: 150,
    alignSelf:"center"
  },
  image_picker: {
    marginBottom: 20
  }
})