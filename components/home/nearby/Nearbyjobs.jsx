import React from 'react'
import { useState} from 'react'
import { View, Text,TouchableOpacity,FlatList,ActivityIndicator } from 'react-native'
import {useRouter } from 'expo-router'
import {COLORS, SIZES} from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'


const isloading = false;
const error = false;
import styles from './nearbyjobs.style'

const Nearbyjobs = ({setRootCity}) => {
  const setRoot = (item) =>{
    setRootCity(item);
  }

  const [selected,setSelected] = useState("Sibiu");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Where From?</Text>
        <TouchableOpacity><Text style={styles.headerBtn}>show all</Text></TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isloading ? (
          <ActivityIndicator size="large" colors={COLORS.primary}/>
        ) :error ? (
            <Text>Something Went Wrong</Text>
        ) : (
          <FlatList
            data={['Arad','Zerind','Oradea','Sibiu','Timisoara','Lugoj','Mehadia','Drobeta','Craiova','Rimnicu Vilcea',
            'Fagaras','Pitesti','Bucharest','Giurgiu','Urziceni','Hirsova','Eforie','Vaslui','Iasi','Neamt']}
            renderItem={({item}) =>{
              return(
                <NearbyJobCard
                  selected={selected}
                  setSelected={setSelected}
                  setRoot={setRoot}
                  item={item}
                  />
              )
            } }
            keyExtractor={item => item?.job_id}
            
            contentContainerStyle={{columnGap: SIZES.medium}}
          

          ></FlatList>
        )}
      </View>
    </View>
  )
}

export default Nearbyjobs