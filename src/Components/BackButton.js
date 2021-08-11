import React from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function AddContactScreen() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
      <Icon name="arrowleft" type="ant-design" size={24} color='black'/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container : {
   flex : 1
  },
  btnBack : {
    borderRadius : 25,
    width : 50,
    height : 50,
    justifyContent : 'center',
    alignItems : 'center',
    margin : 15,
    // backgroundColor : '#f3f5f7'
  }
})