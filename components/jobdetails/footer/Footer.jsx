import React from 'react'
import { View, Text ,TouchableOpacity,Image,Linking} from 'react-native'
import { Stack, useRouter } from 'expo-router';
import styles from './footer.style'
import {icons} from '../../../constants'


const Footer = ({directionClick,callbackBtn}) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn}
      
      onPress={() => {router.back()}}
      >
        <Image
          source={icons.location}
          resizeMode='contain'
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => {
          if(directionClick == false){
            callbackBtn(true);
          }else{
            router.back();
          }
        }}
      >
        <Text style={styles.applyBtnText}>Get Directions</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer