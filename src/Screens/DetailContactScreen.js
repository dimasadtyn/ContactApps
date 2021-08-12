import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Modal, Image } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer';
import { Icon } from 'react-native-elements';

import Header from '../Components/Header'
import { TouchableOpacity } from 'react-native';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function DetailContactScreen({route, navigation}) {
  const [isImageViewVisible, setisImageViewVisible] = useState(false)
  return (
    <View style={styles.container}>
      <Header title='Detail Contact'/>
      {route.params.photo == 'N/A' ?
        <Icon name="user-circle-o" type="font-awesome" size={80} color="grey" style={styles.icon}/>
      :
        <TouchableOpacity style={styles.btnImage} onPress={() => setisImageViewVisible(true)}>
          <Image source={{uri : route.params.photo}} style={styles.image} />
        </TouchableOpacity>
      }
      <TouchableOpacity style={styles.btnEdit} onPress={() => {navigation.navigate("EditContact", route.params)}}>
        <Icon name="edit-3" type="feather" size={24} color="grey" style={styles.icon}/>
        <Text style={{fontSize : 16, marginLeft : 5, color : 'black'}}>
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
      <Modal visible={isImageViewVisible} transparent={true}>
        <ImageViewer
          imageUrls={[{
            url : route.params.photo
          }]}
          enableSwipeDown={true}
          onSwipeDown={() => setisImageViewVisible(false)}
        />
      </Modal>
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
  btnImage : {
    alignSelf : 'center'
  },
  text : {
    fontSize : 16,
    color : 'black'
  },
  inputContainer : {
    width : width * 0.9,
    // backgroundColor : 'grey',
    alignSelf : 'center',
    marginBottom : 5
  },
  textVal : {
    fontWeight : '700',
    fontSize : 20,
    color : 'black'
  },
  btnEdit : {
    alignSelf : 'center',
    marginTop : 10,
    flexDirection : 'row',
    justifyContent : 'center',
    borderRadius : 15,
  }
})