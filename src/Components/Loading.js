import React from 'react'
import { View, Text, ActivityIndicator, Dimensions, StyleSheet } from 'react-native'

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='grey'/>
      <Text style={{color : 'grey'}}>
        Loading...
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    justifyContent : 'center',
    alignSelf : 'center', 
    width : width, 
    alignItems : 'center'
  }
})