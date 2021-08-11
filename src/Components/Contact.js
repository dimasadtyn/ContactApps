import React, {useEffect, useState} from 'react'
import { View, Text, Dimensions, StyleSheet, TextInput, TouchableOpacity, RefreshControl, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon';
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'

import {getContact} from '../API'
import Loading from '../Components/Loading'

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function Contact() {
  const navigation = useNavigation();
  const [contact, setContact] = useState(null)
  const [search, setSearch] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  useEffect(async () => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getAllContact()
    });
    return unsubscribe
  },[navigation])

  const getAllContact = async () => {
    await getContact()
    .then((res) => {
      // console.log(res.data.data);
      setContact(res.data.data)
    })
    .catch((err) => {
      // console.log(err);
    })
  }

  const handleSearch = text => {
    setSearch(text);
  };

  const onRefresh = () => {
    setRefreshing(true)
    getAllContact()
    setTimeout(() => {
      setRefreshing(false)
    },1000)
  }

  return(
    contact == null ?
      <Loading/>
    :
    <View style={{flex : 1}}>
      <Text style={styles.textMyContact}>
        My Contacts ({contact.length})
      </Text>
      <View style={styles.searchContainer}>
        <Icon name="search" type="evilicons" size={24} color="grey" />
        <TextInput
          style={styles.inputContainer}
          placeholder = "Search..."
          onChangeText={text => handleSearch(text)}
          autoCapitalize="none"
          autoCorrect={false}
          value={search}
        />
        <TouchableOpacity disabled={search == '' ? true : false} onPress={() => setSearch('')}>
          <Icon name="closecircle" type="ant-design" size={24} color={search == '' ? "#f3f5f7" : "grey"} />
        </TouchableOpacity>
      </View>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {contact.map((item) => {
          if((item.firstName.toLowerCase().indexOf(search.toLowerCase())>-1) || (item.lastName.toLowerCase().indexOf(search.toLowerCase())>-1)) {
            return (
              <TouchableOpacity style={styles.contactContainer} key={item.id} activeOpacity={0.6} 
                onPress={() => navigation.navigate("DetailContact", item)}
              >
                {item.photo == 'N/A' ?
                  <Icon name="user-circle-o" type="font-awesome" size={60} color="grey" style={styles.icon}/>
                :
                  <FastImage style={styles.contactImage} 
                    source={{
                      uri : item.photo, 
                      priority: FastImage.priority.high
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                }
                <Text style={[styles.textName, {fontWeight : '700', marginRight : 5}]}>
                  {item.firstName} 
                </Text>
                <Text style={styles.textName}>
                  {item.lastName} 
                </Text>
              </TouchableOpacity>
            )
          }
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  contactContainer : {
    flex : 1,
    flexDirection : 'row',
    alignItems : 'center',
    width : width,
  },
  contactImage : {
    width : 60,
    height : 60,
    margin : 5,
    marginLeft : 15,
    borderRadius : 16
  },
  icon : {
    margin : 5,
    marginLeft : 15,
  },
  textName : {
    color : 'black',
    fontSize : 20
  },
  textMyContact : {
    fontWeight : '700',
    fontSize : 18,
    marginTop : 15,
    marginLeft : 15,
    marginBottom : 10
  },
  searchContainer : {
    width : width * 0.97,
    flexDirection : 'row',
    alignItems : 'center',
    borderRadius : 20,
    justifyContent : 'space-evenly',
    fontSize : 20,
    alignSelf : 'center',
    backgroundColor : '#f3f5f7',
    marginBottom : 10
  },
  inputContainer : {
    width : width * 0.7,
    fontSize : 18
  },
})