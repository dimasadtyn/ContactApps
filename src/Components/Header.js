import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

import BackButton from './BackButton'

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function Header({...props}) {
  return (
    <View style={styles.container}>
      <BackButton/>
      <Text style={styles.text}>
        {props.title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'flex-start',
    width : width,
    // backgroundColor : 'grey'
  },
  text : {
    fontSize : 24,
    fontWeight : '700',
    color : 'black'
  }
})