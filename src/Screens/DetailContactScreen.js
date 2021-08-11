import React from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';

import Header from '../Components/Header'
import { TouchableOpacity } from 'react-native';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function DetailContactScreen({route, navigation}) {
  return (
    <View style={styles.container}>
      <Header title='Detail Contact'/>
      {route.params.photo == 'N/A' ?
        <Icon name="user-circle-o" type="font-awesome" size={80} color="grey" style={styles.icon}/>
      :
        <Image source={{uri : route.params.photo}} style={styles.image} />
      }
      <TouchableOpacity style={styles.btnEdit} onPress={() => {navigation.navigate("EditContact", route.params)}}>
        <Icon name="edit-3" type="feather" size={24} color="grey" style={styles.icon}/>
        <Text style={{fontSize : 16, marginLeft : 5}}>
          Edit Contact
        </Text>
      </TouchableOpacity>
      <View style={styles.secondContainer}>
        <View style={[styles.inputContainer, {marginTop : 20}]}>
          <Text style={styles.text}>
            First Name
          </Text>
          <Text style={styles.textVal}>
          {route.params.firstName}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>
            Last Name
          </Text>
          <Text style={styles.textVal}>
          {route.params.lastName}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>
            Age
          </Text>
          <Text style={styles.textVal}>
          {route.params.age}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : '#e9e8ef'
  },
  secondContainer : {
    width : width,
    height : height * 0.8,
    backgroundColor : 'white',
    borderTopLeftRadius : 30,
    borderTopRightRadius : 30,
    marginTop : 20
  },
  icon : {
    // marginTop : -40
  },
  image : {
    width : 80, 
    height : 80,
    borderRadius : 20,
    alignSelf : 'center'
  },
  text : {
    fontSize : 16
  },
  inputContainer : {
    width : width * 0.9,
    // backgroundColor : 'grey',
    alignSelf : 'center',
    marginBottom : 5
  },
  textVal : {
    fontWeight : '700',
    fontSize : 20
  },
  btnEdit : {
    alignSelf : 'center',
    marginTop : 10,
    flexDirection : 'row',
    justifyContent : 'center',
    borderRadius : 15,
  }
})