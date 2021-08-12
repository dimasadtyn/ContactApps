import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Contact from '../Components/Contact'

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function HomeScreen({navigation}) {
  const [search, setSearch] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>
        Contacts
      </Text>
      <Contact/>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("AddContact")}>
        <LinearGradient colors={['#e98345', '#ed3eb8']} style={styles.buttonAdd}>
          <Icon name="plus" type="ant-design" size={24} color='white' />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : 'white'
  },
  textHeader : {
    marginTop : 20,
    fontSize : 28,
    fontWeight : '700',
    alignSelf : 'center',
    marginBottom : 15,
    color : 'black'
  },
  searchContainer : {
    width : width * 0.97,
    flexDirection : 'row',
    alignItems : 'center',
    borderRadius : 20,
    // borderWidth : 1,
    justifyContent : 'space-evenly',
    fontSize : 20,
    alignSelf : 'center',
    backgroundColor : '#f3f5f7'
  },
  inputContainer : {
    width : width * 0.7,
    fontSize : 18
  },
  buttonAdd : {
    width : 50,
    height : 50,
    borderRadius : 18,
    backgroundColor : 'grey',
    alignItems : 'center',
    justifyContent : 'center',
  },
  buttonContainer : {
    position : 'absolute',
    bottom : 20,
    right : 15
  }
})