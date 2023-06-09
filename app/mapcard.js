import React, { useState } from 'react'
import { View, Text ,TouchableOpacity,Image} from 'react-native'

import styles from './popularjobcard.style'

const MapCard = ({selected,setSelected,setGoal,item}) => {
  
  return (
    <TouchableOpacity
      
      style={styles.container(item,selected)}
      onPress={() => {setGoal(item); setSelected(item)}}
    >
      <TouchableOpacity style={styles.logoContainer(item,selected)}>
        <Image
          source={require('./romania.png')}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>{item}</Text>
      <TouchableOpacity style={styles.infoContainer}>
      <Text style={styles.jobName} numberOfLines={1}>Turn NOW </Text>
    </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default MapCard