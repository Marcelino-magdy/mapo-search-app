import React from 'react'
import { View, Text ,TouchableOpacity,Image} from 'react-native'

import styles from './nearbyjobcard.style'

const NearbyJobCard = ({selected,setSelected,setRoot,item}) => {
  
  return (
    <TouchableOpacity
      style={styles.container(item,selected)}
      onPress={() => {setRoot(item); setSelected(item)}}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={require('./romania.png')}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.jobName} numberOfLines={1}>{item}</Text>
    </TouchableOpacity>
  )
}

export default NearbyJobCard