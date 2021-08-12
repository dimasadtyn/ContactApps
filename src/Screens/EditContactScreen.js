import React, {useEffect, useState} from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image'

import { editContact, deleteContact } from '../API';
import Header from '../Components/Header'
import Loading from '../Components/Loading';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function EditContactScreen({route, navigation}) {
  const [firstName, setFirstName] = useState(`${route.params.firstName}`)
  const [lastName, setLastName] = useState(`${route.params.lastName}`)
  const [age, setAge] = useState(`${JSON.stringify(route.params.age)}`)
  const [image, setImage] = useState(route.params.photo)
  const [wait, setWait] = useState(false)

  const openLibrary = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImage(response.assets[0])
      }
    });
  }

  const handleEditContact = () => {
    if(firstName == '' || lastName == '' || age == '') {
      Alert.alert(
        "Field Can't be Empty",
        "Please fill out the field",
        [
          {
            text : "OKE",
          }
        ]
      )
    } else if(firstName.length <= 2 || lastName.length <= 2 ) {
      Alert.alert(
        "First Name or Last Name too short",
        "Minimum 3 Characters",
        [
          {
            text : "OKE",
          }
        ]
      )
    } else if(firstName.indexOf(' ') >= 0 || lastName.indexOf(' ') >= 0 || age.indexOf(' ') >= 0) {
      Alert.alert(
        "Failed",
        "Must only contain alpha-numeric characters",
        [
          {
            text : "OKE",
          }
        ]
      )
    } else {
      setWait(true)

      // FOR UPLOAD IMAGE
      // let uriParts = image.uri.split('.')
      // let fileType = uriParts[uriParts.length - 1];
      // let formData = new FormData();
      // formData.append('photo', {
      //   uri: image.uri,
      //   type: `image/${fileType}`,
      //   name: `${new Date().getTime()}.${fileType}`
      // });
      // formData.append('firstName', firstName)
      // formData.append('lastName', lastName)
      // formData.append('age', age)
      
      let data = {
        firstName: firstName,
        lastName: lastName,
        age: age,
      }
      editContact(route.params.id, data)
      .then((res) => {
        setWait(false)
        // console.log(res.data);
        Alert.alert(
          "Success",
          "Data has been saved",
          [
            {
              text : "OKE",
              onPress: () => {navigation.navigate("Home")}
            }
          ]
        )
      })
      .catch((err) => {
        setWait(false)
        console.log(err);
        Alert.alert(
          "Error",
          "Something went wrong, please try again later",
          [
            {
              text : "OKE",
            }
          ]
        )
      })
    }
  }

  const alertDelete = () => {
    Alert.alert(
      "Delete",
      "Are you sure?",
      [
        {
          text : "Yes",
          onPress: () => {handleDeleteContact()}
        },
        {
          text : "No",
        }
      ]
    )
  }

  const handleDeleteContact = () => {
    setWait(true)
    deleteContact(route.params.id)
    .then((res) => {
      setWait(false)
      console.log(res);
      Alert.alert(
        "Success",
        "Delete contact success",
        [
          {
            text : "OKE",
            onPress: () => {navigation.navigate("Home")}
          }
        ]
      )
    })
    .catch((err) => {
      setWait(false)
      console.log(err);
      Alert.alert(
        "Error",
        "Something went wrong, please try again later",
        [
          {
            text : "OKE",
          }
        ]
      )
    })
  }

  const handleBack = () => {
    setFirstName('')
    setLastName('')
    setAge('')
    setImage(null)
    navigation.goBack()
  }

  return (
    wait == false ?
      <ScrollView style={styles.container}>
        <Header title="Edit Contact"/>
        {image == null || image == 'N/A' ?
          <Icon name="user-circle-o" type="font-awesome" size={80} color="grey" style={styles.icon}/>
        :
          <FastImage style={styles.image} 
            source={{
              uri : image.uri ? image.uri : route.params.photo, 
              priority: FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        }
        <TouchableOpacity style={styles.btnAddPhoto} onPress={openLibrary}>
          <Text style={{color : 'blue'}}>
            Change Photo
          </Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>
            First Name
          </Text>
          <TextInput placeholder='First Name' style={styles.inputField}
            onChangeText={(text) => setFirstName(text)}
            defaultValue ={route.params.firstName}
            editable={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>
            Last Name
          </Text>
          <TextInput placeholder='Last Name' style={styles.inputField}
            onChangeText={(text) => setLastName(text)}
            defaultValue={route.params.lastName}
            editable={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>
            Age
          </Text>
          <TextInput placeholder='Age' style={styles.inputField}
            onChangeText={(text) => setAge(text)}
            defaultValue ={JSON.stringify(route.params.age)}
          />
        </View>
        <TouchableOpacity style={styles.btnAddContact} activeOpacity={0.6} onPress={handleEditContact}>
          <LinearGradient colors={['#e98345', '#ed3eb8']} style={styles.gradient}>
            <Text style={styles.textAdd}>
              Save
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDelete} onPress={alertDelete}>
          <Text style={{color : 'red', fontWeight : '700'}}>
            Delete Contact
          </Text>
        </TouchableOpacity>
      </ScrollView>
    :
      <View style={[styles.container, {alignSelf : 'center', alignItems : 'center', justifyContent : 'center'}]}>
        <Loading/>
      </View>
  )
}

const styles = StyleSheet.create({
  container : {
   flex : 1,
   backgroundColor : 'white'
  },
  text : {
    fontWeight : '700',
    fontSize : 16,
    color : 'black'
  },
  inputContainer : {
    width : width * 0.9,
    // backgroundColor : 'grey',
    alignSelf : 'center',
    marginBottom : 5
  },
  inputField : {
    width : width * 0.85,
    borderBottomWidth : 1,
    alignSelf : 'center',
    borderColor : 'grey'
  },
  icon : {
    marginBottom : 5
  },
  image : {
    marginBottom : 5,
    width : 80,
    height : 80,
    alignSelf : 'center',
    borderRadius : 20
  },
  btnAddPhoto : {
    alignSelf : 'center',
    marginBottom : 10
  },
  btnAddContact : {
    alignSelf : 'center',
    marginTop : 20
  },
  gradient : {
    width : 150,
    backgroundColor : 'grey',
    alignItems : 'center',
    borderRadius : 15,
  },
  textAdd : {
    margin : 10,
    color : 'white',
    fontWeight : '700'
  },
  btnDelete : {
    alignSelf : 'center',
    marginTop : 10,
  }
})